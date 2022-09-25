import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-rounting.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { AccountComponent } from './account/account.component';
import { CardsComponent } from './cards/cards.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PayNowComponent } from './pay-now/pay-now.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { ShopComponent } from './shop/shop.component';
import { TransactComponent } from './transact/transact.component';
import { MaskPipe } from './Pipes/mask/mask.pipe';
import { DashboardNavComponent } from './dashboard-nav/dashboard-nav.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AccountComponent,
    CardsComponent,
    PayNowComponent,
    PaymentDetailsComponent,
    TransactComponent,
    ShopComponent,
    MaskPipe,
    DashboardNavComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    Ng2SearchPipeModule,
  ],
})
export class DashboardModule {}
