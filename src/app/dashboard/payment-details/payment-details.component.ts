import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css'],
})
export class PaymentDetailsComponent implements OnInit {
  paymentDetail: any;

  constructor() {}

  ngOnInit(): void {
    let payment: any = localStorage.getItem('selectetItem');
    this.paymentDetail = JSON.parse(payment);
    console.log(this.paymentDetail);
  }
}
