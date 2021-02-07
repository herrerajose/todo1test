import { Component, OnInit, Injector } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BaseComponent } from '../base/base.component';
import { WeatherService } from 'src/services/weather/weather.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent extends BaseComponent implements OnInit {

  public geolocation: Geolocation = this.injector.get( Geolocation );

  public weatherService: WeatherService = this.injector.get( WeatherService );

  public translateService: TranslateService = this.injector.get( TranslateService );

  public toastCtrl: ToastController = this.injector.get( ToastController );

  public latitude: number;

  public longitude: number;

  public urlImage: string;

  public temp: number;

  public description: string;

  public temp_max: string;

  public temp_min: string;

  public humidity: string;

  public pressure: string;

  public apiResponse;

  constructor(
    public injector: Injector,
  ) { 
    super(injector);
  }

  ngOnInit() 
  {
    try
    { 
      this.getCurrentPosition();
    }
    catch ( e )
    {
      this.presentGenericErrorAlert();
    }
  }

  ionViewWillEnter() 
  {
    try
    { 
      this.presentToastWarning();
    }
    catch ( e )
    {
      this.presentGenericErrorAlert();
    }
  }

  async getCurrentPosition() {
    try
    { 
      let res = await this.geolocation.getCurrentPosition();

      this.latitude = res.coords.latitude;

      this.longitude = res.coords.longitude;

      this.getCurrentWeather();
    }
    catch ( e )
    {
      this.presentGenericErrorAlert();
    }
  }

  async getCurrentWeather() {
    try
    { 
      this.apiResponse = await this.weatherService.currentWeather( this.latitude, this.longitude );

      this.temp = Math.trunc(this.apiResponse.main.temp);

      this.description = this.apiResponse.weather[0].description;

      this.temp_max = this.apiResponse.main.temp_max;

      this.temp_min = this.apiResponse.main.temp_min;

      this.humidity = this.apiResponse.main.humidity;

      this.pressure = this.apiResponse.main.pressure;
      
      this.backgroundImage( this.apiResponse.weather[0].main );
    }
    catch ( e )
    {
      this.presentGenericErrorAlert();
    }
  }

  async backgroundImage( weatherText: string) {
    try
    { 
      if( weatherText == "Rain" )
      {
        this.urlImage = './assets/img/rain.jpg';
      }
      if( weatherText == "Clear" )
      {
        this.urlImage = './assets/img/clear.jpg';
      }
      if( weatherText == "Clouds" )
      {
        this.urlImage = './assets/img/clouds.jpg';
      } 
      if( weatherText == "Drizzle" )
      {
        this.urlImage = './assets/img/drizzle.jpg';
      } 
      if( weatherText == "Snow" )
      {
        this.urlImage = './assets/img/snow.jpg';
      } 
      if( weatherText == "ThunderStorm" )
      {
        this.urlImage = './assets/img/thunder.jpg';
      } 
    }
    catch ( e )
    {
      this.presentGenericErrorAlert();
    }
  }

  async doRefresh(event) {
    try
    { 
      this.getCurrentPosition();

      event.target.complete();
    }
    catch ( e )
    {
      event.target.complete();  
    }
  }

  async presentToastWarning() {

    let translation = this.translateService.instant('error_weather');

    const toast = await this.toastCtrl.create({
      message: translation,
      duration: 5000,
      color: 'primary',
    });

    toast.present();

  }

}
