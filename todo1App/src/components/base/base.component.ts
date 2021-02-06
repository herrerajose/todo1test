import { Component, OnInit, Injector } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { PopoverController, AlertController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState( control: FormControl | null, form: FormGroupDirective | NgForm | null ): boolean {
    const isSubmitted = form && form.submitted;
    return !!( control && control.invalid && ( control.dirty || control.touched || isSubmitted ) );
  }
}

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export class BaseComponent implements OnInit {

  public popoverCtrl: PopoverController = this.injector.get( PopoverController );

  public alertCtrl: AlertController = this.injector.get( AlertController );

  matcher = new MyErrorStateMatcher();

  constructor(
    public injector: Injector,
  ) { }

  ngOnInit() {}

  async openPopover(ev) {
    const popover = await this.popoverCtrl.create({
      component: PopoverComponent,
      event: ev
    });
    await popover.present();
  }

  async presentAlert( title, msg ) 
  {
    const alert = await this.alertCtrl.create({
      header: title,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

}
