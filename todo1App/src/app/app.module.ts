import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { NgxUiLoaderModule, NgxUiLoaderRouterModule, NgxUiLoaderHttpModule } from 'ngx-ui-loader';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';

import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http'

import { AuthInterceptorService } from 'src/services/interceptor/auth-interceptor.service';

import { IonicStorageModule } from '@ionic/storage';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccountDetailComponent } from 'src/components/account-detail/account-detail.component';
import { BaseComponent } from 'src/components/base/base.component';
import { ChangePasswordComponent } from 'src/components/change-password/change-password.component';
import { ForgotPasswordComponent } from 'src/components/forgot-password/forgot-password.component';
import { HomeComponent } from 'src/components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { PopoverComponent } from 'src/components/popover/popover.component';
import { ProfileComponent } from 'src/components/profile/profile.component';
import { TransferComponent } from 'src/components/transfer/transfer.component';
import { TransferQrComponent } from 'src/components/transfer-qr/transfer-qr.component';
import { WeatherComponent } from 'src/components/weather/weather.component';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'; 
import { far } from '@fortawesome/free-regular-svg-icons'; 
import { fab } from '@fortawesome/free-brands-svg-icons'; 

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { Geolocation } from '@ionic-native/geolocation/ngx';

export function HttpLoaderFactory( http: HttpClient )
{
  return new TranslateHttpLoader( http, './assets/i18n/', '.json' );
}

@NgModule({
  declarations: [
    AppComponent,
    AccountDetailComponent,
    BaseComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    HomeComponent,
    LoginComponent,
    PopoverComponent,
    ProfileComponent,
    TransferComponent,
    TransferQrComponent,
    WeatherComponent,
  ],
  entryComponents: [

  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,
    NgxUiLoaderHttpModule.forRoot({ 
      showForeground: true 
    }),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    NgIdleKeepaliveModule.forRoot(),
    IonicStorageModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    NgxQRCodeModule
  ],
  providers: [
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    { 
      provide: ErrorStateMatcher, 
      useClass: ShowOnDirtyErrorStateMatcher,
    },
    Base64ToGallery,
    BarcodeScanner,
    Geolocation
  ],
  bootstrap: [
    AppComponent
  ],
})

export class AppModule {
  constructor( library: FaIconLibrary ) {
    library.addIconPacks( fas, far, fab );
  }
}
