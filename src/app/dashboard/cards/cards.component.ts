import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CardService } from 'src/app/core/service/card.service';
import { environment } from 'src/environments/environment';
import { CardInfo } from '../CardInfo';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  transactions: any = [];
  allCards: CardInfo[] = [];
  p: number = 1;
  filterTerm!: string;
  public selectedViewCard: any;

  constructor(
    private cardService: CardService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllCards();
    this.getPaymentDetail();
  }

  getAllCards() {
    this.cardService.getCard().subscribe((res) => {
      if (res) {
        this.allCards = res;
      }
    });
  }

  editCard(card: any) {
    localStorage.setItem('editCardInfo', JSON.stringify(card));
  }

  deleteCard(card: any) {
    console.log(card.cardDetailId);
    let cardTransaction = this.transactions.find((x: any) => {
      if (x.cardDetailId == card.cardDetailId) {
        return x.cardDetailId == card.cardDetailId;
      } else {
        return null;
      }
    });

    console.log(cardTransaction);
    if (cardTransaction && cardTransaction.minDue !== 0) {
      this.toastr.warning('You Cannot Delete Card Without Paying Min Due..!');
    } else {
      this.cardService.deleteCard(card.cardDetailId).subscribe(
        (res) => {
          if (res) {
            this.toastr.success('Card Deleted Successfully..!');
            this.getAllCards();
          }
        },
        (err: any) => {
          this.toastr.error('Card Not Deleted..!');
        }
      );
    }
  }

  viewCardDetails(card: any) {
    this.selectedViewCard = card;
  }

  getPaymentDetail() {
    this.cardService.getTransactions().subscribe((res) => {
      if (res) {
        this.transactions = res;
      }
    });
  }
}
