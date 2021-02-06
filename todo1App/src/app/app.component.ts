import { Component, Injector } from '@angular/core';
import { Platform, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Router } from '@angular/router'
import { APP_CONFIG } from 'src/const/values';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  
  public timedOut = false;

  public idle: Idle = this.injector.get( Idle );

  public router: Router = this.injector.get( Router );

  public alertCtrl: AlertController = this.injector.get( AlertController );

  public platform: Platform = this.injector.get( Platform );

  public translateService: TranslateService = this.injector.get( TranslateService );
  
  constructor (
    public injector: Injector, 
  ) 
  {
    this.initializeApp();
  }

  async initializeApp() 
  {
    try
    { 
      await this.platform.ready();

      this.translateService.setDefaultLang('en');
      this.translateService.use('en');
      this.startIdleService();

    }
    catch ( e )
    {

    }
  }

  startIdleService() 
  {
    try
    { 
      this.idle.setIdle( 1 );

      this.idle.setTimeout( APP_CONFIG.maxUserIdleTime );

      this.idle.setInterrupts( DEFAULT_INTERRUPTSOURCES );
  
      this.idle.onTimeout.subscribe(() => 
      {
        this.timedOut = true;
        this.presentTimeAlert();
      });
    }
    catch ( e )
    {

    }
  }

  async presentTimeAlert() 
  {
    try
    { 
      const alert = await this.alertCtrl.create({
        header: 'Sesión expirada',
        message: 'Ha estado más de 8 minutos sin actividad, desea extender su sesión?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            handler: async () => {
              clearInterval(interval);  
              this.idle.stop();
              this.router.navigateByUrl('/');  
            }
          }, 
          {
            text: 'Extender',
            handler: () => {
              clearInterval(interval);  
              this.reset();
            }
          }
        ]
      });
  
      await alert.present();
  
      let interval = setInterval(() => {
          clearInterval(interval); 
          alert.dismiss();
          this.router.navigateByUrl('/');  
        },
        APP_CONFIG.maxUserIdleTimeModalAnswer
      );
    }
    catch ( e )
    {

    }
  }

  reset() 
  {
    try
    { 
      this.idle.watch();
      this.timedOut = false;
    }
    catch ( e )
    {

    }
  }

}
