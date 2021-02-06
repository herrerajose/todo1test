import { Component, OnInit, Injector } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { trigger, style, animate, transition, query, stagger } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { BankAccount } from 'src/entities/BankAccount';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss'],
  animations: [
    trigger('staggerIn', [
      transition('* => *', [
        query(':enter', style({ opacity: 0, transform: `translate3d(100px,0,0)` }), { optional: true }),
        query(':enter', stagger('200ms', [animate('400ms', style({ opacity: 1, transform: `translate3d(0,0,0)` }))]), { optional: true })
      ])
    ])
  ]
})
export class AccountDetailComponent extends BaseComponent implements OnInit {

  public route: ActivatedRoute = this.injector.get( ActivatedRoute );

  public router: Router = this.injector.get( Router );

  public bankAccount: BankAccount;

  constructor(
    public injector: Injector,
  ) { 
    super(injector);
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.bankAccount = this.router.getCurrentNavigation().extras.state.bankAccount;
      }
    })
  }

  ngOnInit() {}

}
