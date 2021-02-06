import { Injectable, Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WSPath, ServicePath } from 'src/const/path';
import { UserLogin } from 'src/entities/UserLogin';
import { BaseComponent } from 'src/components/base/base.component';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseComponent {

  public http: HttpClient = this.injector.get( HttpClient );
  
  public constructor( 
    public injector: Injector
  ) 
  { 
    super(injector);
  }
  
  public async authenticateUser( user: UserLogin ): Promise<any>
  {
    try
    {
        return await this.http.post<any>( WSPath.URL, user ).toPromise();
    }
    catch ( e )
    {
      this.presentGenericErrorAlert();
    }
  }

  public async consultUserInformation( userID: string, userToken: string  ): Promise<any>
  {
    try
    {
        return await this.http.get<any>( `${ServicePath.USER}${userID}${ServicePath.JSON}${ServicePath.AUTH}${userToken}` ).toPromise();
    }
    catch ( e )
    {
      this.presentGenericErrorAlert();
    }
  }

}
