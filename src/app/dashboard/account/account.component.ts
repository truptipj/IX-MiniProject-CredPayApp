import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CardService } from 'src/app/core/service/card.service';
import { CardInfo } from '../CardInfo';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit, OnDestroy {
  allCards: CardInfo[] = [];

  bankList = ['SBI', 'AXIS', 'KOTAK'];

  addCardsForm: any = FormGroup;
  public minDate: any;
  editCreditCard: any;
  isUpdate = false;
  title = 'Add';
  isDuplicateCardNo: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private cardService: CardService,
    private toastr: ToastrService
  ) {
    this.minDate = new Date();
  }

  ngOnInit(): void {
    let editCreditCard: any = localStorage.getItem('editCardInfo');
    this.editCreditCard = JSON.parse(editCreditCard);
    console.log(this.editCreditCard);

    this.addCardsForm = this.fb.group({
      cardNumber: [
        (this.editCreditCard && this.editCreditCard.cardNumber) || '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{16}$')],
      ],
      cardOwnerName: [
        (this.editCreditCard && this.editCreditCard.cardOwnerName) || '',
        [Validators.required],
      ],
      expirationDate: [
        (this.editCreditCard &&
          this.editCreditCard.expirationDate.substring(0, 10)) ||
          '',
        [Validators.required],
      ],
      cvv: [
        (this.editCreditCard && this.editCreditCard.cvv) || '',
        [Validators.required, Validators.pattern('^((\\+91-?)|0)?[0-9]{3}$')],
      ],
      bank: [
        (this.editCreditCard && this.editCreditCard.bank) || '',
        [Validators.required],
      ],
      balance: [
        (this.editCreditCard && this.editCreditCard.balance) || '',
        [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')],
      ],
      isActive: [true],
    });

    if (this.editCreditCard) {
      this.isUpdate = true;
      this.title = 'Update';
    } else {
      this.getAllCards();
    }
  }

  getAllCards() {
    this.cardService.getCard().subscribe((res) => {
      if (res) {
        this.allCards = res;
      }
    });
  }

  get addCardsControl() {
    return this.addCardsForm.controls;
  }

  addUpdateCard() {
    if (!this.isUpdate) {
      this.cardService.addCard(this.addCardsForm.value).subscribe(
        (res) => {
          if (res.result) {
            this.router.navigate(['/user/cards']);
            this.toastr.success('Card Added Successful..!');
          }
        },
        (err: any) => {
          this.toastr.error('Card Not Added..!');
        }
      );
    } else {
      let cardReq = this.addCardsForm.value;
      cardReq.cardDetailId = this.editCreditCard.cardDetailId;
      this.cardService
        .updateCard(this.editCreditCard.cardDetailId, cardReq)
        .subscribe(
          (res) => {
            if (res) {
              this.toastr.success('Card Updted Successful..!');
              this.router.navigate(['/user/cards']);
            }
          },
          (err: any) => {
            this.toastr.error('Card Not Updated..!');
          }
        );
    }
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0];
  }

  ngOnDestroy() {
    localStorage.removeItem('editCardInfo');
    this.editCreditCard = null;
    this.isUpdate = false;
  }

  uniqueCardNumber() {
    console.log(this.addCardsForm.value.cardNumber);
    this.isDuplicateCardNo = this.allCards.some(
      (item) => item.cardNumber === this.addCardsForm.value.cardNumber
    );
    if (this.isDuplicateCardNo) {
      this.addCardsForm.controls['cardNumber'].reset();
    }
  }
}
