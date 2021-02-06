import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TransferQrComponent } from './transfer-qr.component';

describe('TransferQrComponent', () => {
  let component: TransferQrComponent;
  let fixture: ComponentFixture<TransferQrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferQrComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TransferQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
