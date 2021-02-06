import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

import { AccountDetailComponent } from 'src/components/account-detail/account-detail.component';
import { HomeComponent } from 'src/components/home/home.component';
import { TransferComponent } from 'src/components/transfer/transfer.component';
import { TransferQrComponent } from 'src/components/transfer-qr/transfer-qr.component';
import { WeatherComponent } from 'src/components/weather/weather.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu/home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MenuPage,
    children : [
      {
        path: 'account-detail',
        component: AccountDetailComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'transfer',
        component: TransferComponent
      },
      {
        path: 'transfer-qr',
        component: TransferQrComponent
      },
      {
        path: 'weather',
        component: WeatherComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}

