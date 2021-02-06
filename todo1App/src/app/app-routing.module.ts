import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/services/authguard/auth-guard.service';

import { LoginComponent } from 'src/components/login/login.component';
import { ForgotPasswordComponent } from 'src/components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from 'src/components/change-password/change-password.component';
import { ProfileComponent } from 'src/components/profile/profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivateChild:[AuthGuardService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivateChild:[AuthGuardService]
  },
  {
    path: 'menu',
    loadChildren: () => import('src/pages/menu/menu.module').then( m => m.MenuPageModule),
    canActivateChild:[AuthGuardService]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
