import { Injectable, Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WSPath, Keys } from 'src/const/path';
import { BaseComponent } from 'src/components/base/base.component';

@Injectable({
  providedIn: 'root'
})
export class WeatherService extends BaseComponent {

  public http: HttpClient = this.injector.get( HttpClient );
  
  public constructor( 
    public injector: Injector
  ) 
  { 
    super(injector);
  }

  public async currentWeather( latitude: number, longitude: number ): Promise<any>
  {
    try
    {
        return await this.http.get<any>( `${WSPath.URL_WEATHER}${WSPath.URL_WEATHER_LAT}${latitude}${WSPath.URL_WEATHER_LOT}${longitude}${WSPath.URL_WEATHER_UNITS}${WSPath.URL_WEATHER_API}${Keys.WEATHER_KEY}` ).toPromise();
    }
    catch ( e )
    {
      this.presentGenericErrorAlert();
    }
  }

}
