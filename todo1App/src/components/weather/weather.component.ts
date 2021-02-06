import { Component, OnInit, Injector } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { BaseComponent } from '../base/base.component';
import { WeatherService } from 'src/services/weather/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent extends BaseComponent implements OnInit {

  public geolocation: Geolocation = this.injector.get( Geolocation );

  public weatherService: WeatherService = this.injector.get( WeatherService );

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

  ngOnInit() {
    this.getCurrentPosition();
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

}
