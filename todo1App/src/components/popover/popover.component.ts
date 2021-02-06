import { Component, OnInit, Injector } from '@angular/core';
import { Storage } from "@ionic/storage";
import { NavController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { Key } from 'src/const/key';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent implements OnInit {

  public storage: Storage = this.injector.get( Storage );

  public popoverCtrl: PopoverController = this.injector.get( PopoverController );

  public navCtrl: NavController = this.injector.get( NavController );

  constructor(
    public injector: Injector ) 
  { }

  ngOnInit() {
  }

  async logOut() {
    this.popoverCtrl.dismiss();
    await this.storage.remove(Key.TOKEN);
    await this.storage.remove(Key.USER_ID);
    this.navCtrl.navigateRoot('/login');
  }
}
