import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { CardsComponent } from './cards/cards.component';
import { DashboardNavComponent } from './dashboard-nav/dashboard-nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PayNowComponent } from './pay-now/pay-now.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { ShopComponent } from './shop/shop.component';
import { TransactComponent } from './transact/transact.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardNavComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'account', component: AccountComponent },
      { path: 'cards', component: CardsComponent },
      { path: 'paynow', component: PayNowComponent },
      { path: 'paymentDetails', component: PaymentDetailsComponent },
      { path: 'transact', component: TransactComponent },
      { path: 'shop', component: ShopComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
