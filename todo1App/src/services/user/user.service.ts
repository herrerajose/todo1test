import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { WSPath, ServicePath } from 'src/const/path';
import { UserLogin } from 'src/entities/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public constructor( public http: HttpClient ) { }

  public async authenticateUser( user: UserLogin ): Promise<any>
  {
    try
    {
        return await this.http.post<any>( WSPath.URL, user ).toPromise();
    }
    catch ( e )
    {

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

    }
  }

}
