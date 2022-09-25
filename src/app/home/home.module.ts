import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HomePageNavComponent } from './home-page-nav/home-page-nav.component';

@NgModule({
  declarations: [
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    HomePageNavComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
  ],
})
export class HomeModule {}
