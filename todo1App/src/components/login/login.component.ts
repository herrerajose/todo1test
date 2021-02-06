import { Component, OnInit, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from "@ionic/storage";
import { UserService } from 'src/services/user/user.service';
import { Key } from 'src/const/key';
import { UserLogin } from 'src/entities/UserLogin';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit {

  public formBuilder: FormBuilder = this.injector.get(FormBuilder);
  
  public userService: UserService = this.injector.get( UserService );

  public storage: Storage = this.injector.get( Storage );

  public navCtrl: NavController = this.injector.get( NavController );

  public formUserField = this.formBuilder.control('', [Validators.required, Validators.email]);

  public formPasswordField = this.formBuilder.control('', [Validators.required]);

  public loginForm: FormGroup;

  public userLogin: UserLogin;
  
  constructor(
    public injector: Injector,
  ) 
  { 
    super(injector);
    this.userLogin = new UserLogin();
  }

  ngOnInit() 
  {
    this.loginForm = new FormGroup({
      user: this.formUserField,
      password: this.formPasswordField
    });
  }

  async ionViewWillEnter() 
  {
    this.loginForm.reset();

    await this.storage.remove(Key.TOKEN);
    
    await this.storage.remove(Key.USER_ID);
  }

  async signIn()
  {
    try
    { 
      let userLogin = new UserLogin();

      userLogin.$email = this.formUserField.value;

      userLogin.$password = this.formPasswordField.value;

      userLogin.$returnSecureToken = true;

      let res = await this.userService.authenticateUser( userLogin );

      await this.storage.set( Key.USER_ID, res.localId );

      await this.storage.set( Key.TOKEN, res.idToken );

      this.navCtrl.navigateRoot('/menu/home');
    }
    catch ( e )
    {
      this.presentGenericErrorAlert();
    }
  }

}
