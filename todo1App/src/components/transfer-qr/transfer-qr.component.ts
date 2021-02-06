import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-transfer-qr',
  templateUrl: './transfer-qr.component.html',
  styleUrls: ['./transfer-qr.component.scss'],
})
export class TransferQrComponent extends BaseComponent implements OnInit {

  constructor(
    public injector: Injector,
  ) { 
    super(injector);
  }

  ngOnInit() {}

}
