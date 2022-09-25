import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor(private httpClient: HttpClient) {}

  addCard(cardReq: any): Observable<any> {
    let url = environment.baseUrl + 'CardDetails';
    return this.httpClient.post(url, cardReq);
  }
  getCard(): Observable<any> {
    let url = environment.baseUrl + 'CardDetails';
    return this.httpClient.get(url);
  }
  updateCard(id: number, cardReq: any): Observable<any> {
    let url = environment.baseUrl + 'CardDetails?id=' + id;
    return this.httpClient.put(url, cardReq);
  }
  payBill(obj: any): Observable<any> {
    let url = environment.baseUrl + 'Pay';
    return this.httpClient.post(url, obj);
  }
  updateBill(id: any, obj: any): Observable<any> {
    let url = environment.baseUrl + 'Pay?id=' + id;
    return this.httpClient.put(url, obj);
  }
  getPaymentDetail(url: any): Observable<any> {
    return this.httpClient.get(url);
  }
  getTransactions(): Observable<any> {
    let url = environment.baseUrl + 'Pay';
    return this.httpClient.get(url);
  }
  deleteCard(id: any): Observable<any> {
    let url = environment.baseUrl + 'CardDetails?id=' + id;
    return this.httpClient.delete(url);
  }
}
