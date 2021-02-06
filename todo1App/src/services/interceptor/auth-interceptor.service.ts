import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Storage } from '@ionic/storage'
import { Observable, throwError, from} from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { Key } from 'src/const/key';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  public storage: Storage = this.injector.get( Storage );

  public navCtrl: NavController = this.injector.get( NavController );

  public alertCtrl: AlertController = this.injector.get( AlertController );

  constructor(
    public injector: Injector,
  ) { }

  intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> 
  {
    return from( this.storage.get( "TOKEN" ) ).pipe( switchMap( token => {
        return next.handle( request ).pipe( 
          map( ( event: HttpEvent<any> ) => {return event;} ),
          catchError( ( error: HttpErrorResponse ) => {
            if( error.error.error.message ) {
              this.presentAlert( error.error.error.message );
            }
            else {
              if( error.error.error && error.status == 401) {
                this.presentAlert( error.error.error );
                this.navCtrl.navigateRoot('/login');
              }
              else{
                if( error.error.error && error.status != 401) {
                  this.presentAlert( error.error.error );
                }
                else{
                  this.presentAlert( "Please Try Again" );
                }
              }
            }
            return throwError( error );
          } )
        );
      })
    );
  }

  async presentAlert( msg ) 
  {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

}
