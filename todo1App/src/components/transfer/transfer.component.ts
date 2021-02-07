import { Component, OnInit, Injector } from '@angular/core';
import { Storage } from "@ionic/storage";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { BaseComponent } from '../base/base.component';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { TransferService } from 'src/services/transfer/transfer.service';
import { Transfer } from 'src/entities/Transfer';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { Key } from 'src/const/key';
import { Transaction } from 'src/entities/Transaction';
import { Currencies } from 'src/const/currency';
import { UserService } from 'src/services/user/user.service';
import { User } from 'src/entities/User';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss'],
})
export class TransferComponent extends BaseComponent implements OnInit {

  public formBuilder: FormBuilder = this.injector.get(FormBuilder);

  public storage: Storage = this.injector.get( Storage );
  
  public transferService: TransferService = this.injector.get( TransferService );

  public barcodeScanner: BarcodeScanner = this.injector.get( BarcodeScanner );

  public base64ToGallery: Base64ToGallery = this.injector.get( Base64ToGallery );

  public androidPermissions: AndroidPermissions = this.injector.get( AndroidPermissions );
  
  public toastCtrl: ToastController = this.injector.get( ToastController );
  
  public translateService: TranslateService = this.injector.get( TranslateService );

  public userService: UserService = this.injector.get( UserService );

  public formAccountOField = this.formBuilder.control('', [Validators.required]);

  public formNameDField = this.formBuilder.control('', [Validators.required]);

  public formEmailDField = this.formBuilder.control('', [Validators.required, Validators.email]);

  public formPhoneDField = this.formBuilder.control('', [Validators.required]);

  public formAccountDField = this.formBuilder.control('', [Validators.required]);

  public formCurrencyField = this.formBuilder.control('', [Validators.required]);

  public formAmountField = this.formBuilder.control('', [Validators.required]);

  public formDescriptionField = this.formBuilder.control('', [Validators.required]);

  public transferForm: FormGroup;

  public tranfer: Transfer;

  public elementType = 'canvas';

  public stringQR = '';

  public showQRSection: boolean = false;

  public amount: number;

  public currencies: any = Currencies;

  public user: User;
  
  constructor(
    public injector: Injector,
  ) 
  { 
    super(injector);
    this.user = new User();
    this.tranfer = new Transfer();
  }

  ngOnInit() 
  {
    
    this.androidPermissions.requestPermissions([
      this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE, 
      this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
    ]);

    this.getUserInfo();
    
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
    try
    { 
      this.transferForm.reset();

      this.showQRSection = false;
    }
    catch ( e )
    {
      this.presentGenericErrorAlert();
    }
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
      this.presentGenericErrorAlert();
    }
  }

  async scanCode() {
    try
    { 
      let options = { prompt : ' ' }

      let res = await this.barcodeScanner.scan( options );

      let tranfer = new Transfer( JSON.parse( res.text ) );

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
      this.presentGenericErrorAlert();
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

      this.showQRSection = true;
    }
    catch ( e )
    {
      this.presentGenericErrorAlert();
    }
  }

  async saveQR()
  {
    try
    { 
      await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE);

      await this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE);

      const canvas = document.querySelector( 'canvas' ) as HTMLCanvasElement;

      const base64Data = canvas.toDataURL( 'image/jpeg' ).toString();

      let imageToSave = base64Data.split(',')[1];

      await this.base64ToGallery.base64ToGallery( imageToSave, { prefix: '_img', mediaScanner: true } );

      this.presentToastSuccess();
    }
    catch ( e )
    {
      this.presentGenericErrorAlert();
      
      this.androidPermissions.requestPermissions([
        this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE, 
        this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
      ]);
    }
  }

  async cleanData()
  {
    try
    { 
      this.transferForm.reset();

      this.showQRSection = false;
    }
    catch ( e )
    {
      this.presentGenericErrorAlert();
    }
  }

  async convertCurrency()
  {
    try
    { 
      let res = await this.transferService.getCurrency();

      if (this.formCurrencyField.value == 'USD')
      {
        this.amount = this.formAccountOField.value - Math.abs( this.formAmountField.value );
      }
      else 
      {
        this.amount = this.formAccountOField.value - Math.abs( this.formAmountField.value / res.USD_COP );
      }

      this.addTransaction();
    }
    catch ( e )
    {
      this.presentGenericErrorAlert();
    }
  }

  async addTransaction()
  {
    try
    { 
      let userID = await this.storage.get( Key.USER_ID );

      let userToken = await this.storage.get( Key.TOKEN );

      let transaction = new Transaction();

      transaction.$transactionValue = this.formAmountField.value;

      transaction.$transactionDate = new Date();

      transaction.$transactionType = "subtraction"

      transaction.$transactionDescription = this.formDescriptionField.value;

      let res = await this.transferService.addTransaction( userID, userToken, transaction );

      this.updateAccountValue();
    }
    catch ( e )
    {
      this.presentGenericErrorAlert();
    }
  }

  async updateAccountValue()
  {
    try
    { 
      let userID = await this.storage.get( Key.USER_ID );

      let userToken = await this.storage.get( Key.TOKEN );

      let res = await this.transferService.updateAccountValue( userID, userToken, this.amount );
    }
    catch ( e )
    {
      this.presentGenericErrorAlert();
    }
  }

  processTransaction() {
    try
    { 
      this.convertCurrency();
    }
    catch ( e )
    {
      this.presentGenericErrorAlert();
    }
  }

  async getUserInfo()
  {
    try
    { 
      let userID = await this.storage.get( Key.USER_ID );

      let userToken = await this.storage.get( Key.TOKEN );

      let res = await this.userService.consultUserInformation( userID, userToken );

      this.user = new User( res );
    }
    catch ( e )
    {
      this.presentGenericErrorAlert();
    }
  }

  async presentToastSuccess() {

    let translation = this.translateService.instant('success_gallery');

    const toast = await this.toastCtrl.create({
      message: translation,
      duration: 3000,
      color: 'primary',
    });

    toast.present();

  }
}
