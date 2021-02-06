import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Transfer } from 'src/entities/Transfer';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  
  public constructor( public http: HttpClient ) { }

  public async sendTransfer( transfer: Transfer ): Promise<any>
  {
    try
    {
        return await this.http.post<any>( "", transfer ).toPromise();
    }
    catch ( e )
    {

    }
  }

}
