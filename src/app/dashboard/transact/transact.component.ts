import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardService } from 'src/app/core/service/card.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-transact',
  templateUrl: './transact.component.html',
  styleUrls: ['./transact.component.css'],
})
export class TransactComponent implements OnInit {
  transactions: any = [];
  cards: any = [];
  p: number = 1;
  filterTerm!: string;

  constructor(private cardService: CardService, private router: Router) {}

  ngOnInit(): void {
    this.getAllCards();
  }

  getPaymentDetail() {
    this.cardService.getTransactions().subscribe((res) => {
      if (res) {
        this.transactions = res;
        this.manageTransactions();
      }
    });
  }

  getAllCards() {
    this.cardService.getCard().subscribe((res) => {
      if (res) {
        this.cards = res;
        this.getPaymentDetail();
      }
    });
  }

  manageTransactions() {
    if (this.cards.length > 0 && this.transactions.length > 0) {
      this.transactions.forEach((element: any) => {
        let card: any;
        card = this.cards.find((x: any) => {
          if (x.cardDetailId == element.cardDetailId) {
            return x.cardDetailId == element.cardDetailId;
          } else {
            return null;
          }
        });

        element.cardNumber = card && card.cardNumber ? card.cardNumber : '';
        element.bank = card && card.bank ? card.bank : '';
        element.cardOwnerName =
          card && card.cardOwnerName ? card.cardOwnerName : '';
        element.balance = card && card.balance ? card.balance : '';
      });
    }
  }

  view(item: any, isUpdate: boolean) {
    let selectetItem = JSON.stringify({
      productName: item.productName,
      category: item.category,
      minDue: item.minDue,
      cardDetailId: item.cardDetailId,
      balance: item.balance,
      price: item.price,

      amountPaid: item.amountPaid,
      bank: item.bank,
      cardNumber: item.cardNumber,
      cardOwnerName: item.cardOwnerName,
      payId: item.payId,
      status: item.status,
      userId: item.userId,
    });

    localStorage.setItem('selectetItem', selectetItem);
    if (isUpdate) {
      this.router.navigate(['/user/paynow']);
    }
  }
}
