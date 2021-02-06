import { Injectable, Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Transfer } from 'src/entities/Transfer';
import { Transaction } from 'src/entities/Transaction';
import { WSPath } from 'src/const/path';
import { BaseComponent } from 'src/components/base/base.component';

@Injectable({
  providedIn: 'root'
})
export class TransferService extends BaseComponent {

  public http: HttpClient = this.injector.get( HttpClient );
  
  public constructor( 
    public injector: Injector
  ) 
  { 
    super(injector);
  }

  public async sendTransfer( transfer: Transfer ): Promise<any>
  {
    try
    {
        return await this.http.post<any>( "", transfer ).toPromise();
    }
    catch ( e )
    {
      this.presentGenericErrorAlert();
    }
  }

  public async getCurrency( ): Promise<any>
  {
    try
    {
        return await this.http.get<any>( WSPath.URL_CURRENCY ).toPromise();
    }
    catch ( e )
    {
      this.presentGenericErrorAlert();
    }
  }

  public async updateAccountValue( userID: string, userToken: string, amount: number ): Promise<any>
  {
    try
    {
        return await this.http.patch<any>( "", amount ).toPromise();
    }
    catch ( e )
    {
      this.presentGenericErrorAlert();
    }
  }

  public async addTransaction( userID: string, userToken: string, transaction: Transaction ): Promise<any>
  {
    try
    {
        return await this.http.post<any>( "", transaction ).toPromise();
    }
    catch ( e )
    {
      this.presentGenericErrorAlert();
    }
  }

}
