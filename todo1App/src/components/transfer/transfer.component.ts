import { Component, OnInit, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BaseComponent } from '../base/base.component';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { TransferService } from 'src/services/transfer/transfer.service';
import { Transfer } from 'src/entities/Transfer';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
})
export class TransferComponent extends BaseComponent implements OnInit {

  public formBuilder: FormBuilder = this.injector.get(FormBuilder);
  
  public transferService: TransferService = this.injector.get( TransferService );

  public barcodeScanner: BarcodeScanner = this.injector.get( BarcodeScanner );

  public base64ToGallery: Base64ToGallery = this.injector.get( Base64ToGallery );

  public formAccountOField = this.formBuilder.control('', [Validators.required]);

  public formNameDField = this.formBuilder.control('', [Validators.required]);

  public formEmailDField = this.formBuilder.control('', [Validators.required]);

  public formPhoneDField = this.formBuilder.control('', [Validators.required]);

  public formAccountDField = this.formBuilder.control('', [Validators.required]);

  public formCurrencyField = this.formBuilder.control('', [Validators.required]);

  public formAmountField = this.formBuilder.control('', [Validators.required]);

  public formDescriptionField = this.formBuilder.control('', [Validators.required]);

  public transferForm: FormGroup;

  public tranfer: Transfer;

  public elementType = 'canvas';

  public stringQR = '';
  
  constructor(
    public injector: Injector,
  ) 
  { 
    super(injector);
    this.tranfer = new Transfer();
  }

  ngOnInit() 
  {
    this.transferForm = new FormGroup({
      accountO: this.formAccountOField,
      nameD: this.formNameDField,
      emailD: this.formEmailDField,
      phoneD: this.formPhoneDField,
      accountD: this.formAccountDField,
      currency: this.formCurrencyField,
      amount: this.formAmountField,
      description: this.formDescriptionField,
    });
  }

  ionViewWillEnter() 
  {
    this.transferForm.reset();
  }

  async sendTransfer()
  {
    try
    { 
      let tranfer = new Transfer();

      tranfer.$originAccount = this.formAccountOField.value;

      tranfer.$destinyName = this.formNameDField.value;

      tranfer.$destinyEmail = this.formEmailDField.value;

      tranfer.$destinyPhone = this.formPhoneDField.value;

      tranfer.$destinyAccount = this.formAccountDField.value;

      tranfer.$currency = this.formCurrencyField.value;

      tranfer.$amount = this.formAmountField.value;

      tranfer.$description = this.formDescriptionField.value;

      let res = await this.transferService.sendTransfer( tranfer );
    }
    catch ( e )
    {
     
    }
  }

  async scanCode() {
    try
    { 
      let options = { prompt : ' ' }

      let res = await this.barcodeScanner.scan( options );

      let tranfer = new Transfer(res);

      this.formNameDField.setValue( tranfer.$destinyName );

      this.formEmailDField.setValue( tranfer.$destinyEmail );

      this.formPhoneDField.setValue( tranfer.$destinyPhone );

      this.formAccountDField.setValue( tranfer.$destinyAccount );

      this.formCurrencyField.setValue( tranfer.$currency );

      this.formAmountField.setValue( tranfer.$amount );

      this.formDescriptionField.setValue( tranfer.$description );
    }
    catch ( e )
    {
     
    }
  }

  async generateQR()
  {
    try
    { 
      let tranfer = new Transfer();

      tranfer.$destinyName = this.formNameDField.value;

      tranfer.$destinyEmail = this.formEmailDField.value;

      tranfer.$destinyPhone = this.formPhoneDField.value;

      tranfer.$destinyAccount = this.formAccountDField.value;

      tranfer.$currency = this.formCurrencyField.value;

      tranfer.$amount = this.formAmountField.value;

      tranfer.$description = this.formDescriptionField.value;

      this.stringQR = JSON.stringify( tranfer );
    }
    catch ( e )
    {
     
    }
  }

  async saveQR()
  {
    try
    { 
      const canvas = document.querySelector( 'canvas' ) as HTMLCanvasElement;

      const base64Data = canvas.toDataURL( 'image/jpeg' ).toString();

      await this.base64ToGallery.base64ToGallery( base64Data.split(',')[1], { prefix: '_img', mediaScanner: true } );

      this.presentAlert( 'Success', 'QR code saved')
    }
    catch ( e )
    {
     
    }
  }

}
