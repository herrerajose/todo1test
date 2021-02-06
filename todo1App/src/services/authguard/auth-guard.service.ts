import { Injectable, Injector } from '@angular/core';
import { CanActivateChild } from '@angular/router';
import { Key } from 'src/const/key';
import { Storage } from "@ionic/storage";
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivateChild {

  public storage: Storage = this.injector.get( Storage );

  public navCtrl: NavController = this.injector.get( NavController );

  constructor (
    public injector: Injector,
  ) { }

  async canActivateChild() 
  {
    let result = false;
    let tokenTemp = await this.storage.get( Key.TOKEN );

    if ( tokenTemp ) 
    {
      result = true;
    }
    else 
    {
      if ( !result )
      this.navCtrl.navigateRoot('/');
    }
    
    return result;
  }

}
