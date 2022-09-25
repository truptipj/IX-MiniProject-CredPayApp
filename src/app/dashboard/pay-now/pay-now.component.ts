import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CardService } from 'src/app/core/service/card.service';
import { environment } from 'src/environments/environment';
import { CardInfo } from '../CardInfo';

@Component({
  selector: 'app-pay-now',
  templateUrl: './pay-now.component.html',
  styleUrls: ['./pay-now.component.css'],
})
export class PayNowComponent implements OnInit {
  creditCards: CardInfo[] = [];
  itemInfo: any;
  payForm: any = FormGroup;
  maxPayAmount: any;
  isUpdate: boolean = false;
  minAccBal: boolean = false;
  cardBalance: any;
  selectedId: any;
  payResponce: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cardService: CardService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    let product: any = localStorage.getItem('selectetItem');
    this.getAllCards();
    this.itemInfo = JSON.parse(product);
    console.log(this.itemInfo);
    this.payForm = this.fb.group({
      productName: [this.itemInfo.productName, [Validators.required]],
      category: [this.itemInfo.category, [Validators.required]],
      price: [this.itemInfo.price, [Validators.required]],
      amountPaid: ['', [Validators.required]],
      minDue: ['', [Validators.required]],
      cardDetailId: ['', [Validators.required]],
      isActive: [true],
    });

    if (this.itemInfo.cardDetailId) {
      this.isUpdate = true;
      console.log(this.itemInfo.cardDetailId);
      this.maxPayAmount = this.itemInfo.minDue;
      this.cardBalance = this.itemInfo.balance;
      this.selectedId = parseInt(this.itemInfo.cardDetailId);
      this.payForm.controls.cardDetailId.setValue(this.selectedId);
    } else {
      this.maxPayAmount = this.itemInfo.price;
    }
  }
  get payControls() {
    return this.payForm.controls;
  }

  checkMinDue(e: any) {
    if (this.cardBalance && this.cardBalance < this.payForm.value.amountPaid) {
      this.minAccBal = true;
    } else {
      this.minAccBal = false;
    }

    if (this.payForm.value.amountPaid > this.maxPayAmount || this.minAccBal) {
      this.payForm.controls['amountPaid'].reset();
      this.payForm.controls['minDue'].reset();
    } else {
      this.payForm.controls.minDue.setValue(
        this.maxPayAmount - this.payForm.value.amountPaid
      );
    }
  }

  changeType() {
    let seleObj: any;
    seleObj = this.creditCards.find(
      (x) => x.cardDetailId == this.payForm.value.cardDetailId
    );
    if (seleObj) {
      this.cardBalance = seleObj.balance;
      if (this.payForm.value.amountPaid > seleObj?.balance) {
        this.payForm.controls['amountPaid'].reset();
        this.payForm.controls['minDue'].reset();
        this.minAccBal = true;
      } else {
        this.minAccBal = false;
      }
    }
  }

  payNow() {
    this.payForm.value.status = true;

    if (!this.isUpdate) {
      this.cardService.payBill(this.payForm.value).subscribe(
        (res) => {
          console.log(res);
          if (res) {
            this.updateCard();
            this.payResponce = res.result;
            this.toastr.success('Payment Successful..!');
          }
        },
        (err: any) => {
          this.toastr.error('Payment Not Done..!');
        }
      );
    } else {
      this.cardService
        .updateBill(this.itemInfo.payId, this.payForm.value)
        .subscribe(
          (res) => {
            console.log(res);
            if (res) {
              this.updateCard();
              this.payResponce = res;
              this.toastr.success('Payment Successful..!');
            }
          },
          (err: any) => {
            this.toastr.error('Payment Not Done..!');
          }
        );
    }
  }

  updateCard() {
    let card: any;
    card = this.creditCards.find((x: any) => {
      if (x.cardDetailId == this.payForm.value.cardDetailId) {
        return x.cardDetailId == this.payForm.value.cardDetailId;
      } else {
        return null;
      }
    });

    if (card) {
      console.log(card);
      card.balance = card.balance - this.payForm.value.amountPaid;

      this.cardService.updateCard(card.cardDetailId, card).subscribe((res) => {
        if (res) {
          let selectetItem = JSON.stringify({
            productName: this.payForm.value.productName,
            category: this.payForm.value.category,
            minDue: this.payForm.value.minDue,
            cardDetailId: this.payForm.value.cardDetailId,
            balance: card.balance,
            price: this.payForm.value.price,
            amountPaid: this.payForm.value.amountPaid,
            bank: card.bank,
            cardNumber: card.cardNumber,
            cardOwnerName: card.bank,
            payId: this.payResponce.payId,
            status: this.payResponce.status,
            userId: this.payResponce.userId,
          });
          localStorage.setItem('selectetItem', selectetItem);
          console.log(selectetItem);
          this.router.navigate(['/user/paymentDetails']);
        }
      });
    }
  }

  getAllCards() {
    this.cardService.getCard().subscribe((res) => {
      if (res) {
        this.creditCards = res;
      }
    });
  }
}
