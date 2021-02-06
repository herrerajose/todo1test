import { Component, OnInit, Injector } from '@angular/core';
import { Storage } from "@ionic/storage";
import { UserService } from 'src/services/user/user.service';
import { Key } from 'src/const/key';
import { User } from 'src/entities/User';
import { BaseComponent } from '../base/base.component';
import { trigger, style, animate, transition, query, stagger } from '@angular/animations';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { BankAccount } from 'src/entities/BankAccount';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(100px,0,0)` }), { optional: true }),
        query(':enter', stagger('200ms', [animate('400ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ]
})
export class HomeComponent extends BaseComponent implements OnInit {

  public userService: UserService = this.injector.get( UserService );

  public storage: Storage = this.injector.get( Storage );

  public navCtrl: NavController = this.injector.get( NavController );

  public user: User;

  constructor(
    public injector: Injector,
  ) { 
    super(injector);
    this.user = new User();
  }

  ngOnInit() {
    this.getUserInfo();
  }

  async getUserInfo()
  {
    try
    { 

      let userID = await this.storage.get( Key.USER_ID );

      let userToken = await this.storage.get( Key.TOKEN );

      let res = await this.userService.consultUserInformation( userID, userToken );

      this.user = new User( res );

    }
    catch ( e )
    {
      this.presentGenericErrorAlert();
    }
  }

  consultBankAccountInformation( bankAccount: BankAccount ) {
    let navigationExtras: NavigationExtras = {
      state: {
        bankAccount: bankAccount
      }
    }
    this.navCtrl.navigateRoot(['/menu/account-detail'], navigationExtras);
  }

  async doRefresh(event) {
    try
    {   
      this.getUserInfo();

      event.target.complete();
    }
    catch ( e )
    {
      event.target.complete();  
    }
  }

}
