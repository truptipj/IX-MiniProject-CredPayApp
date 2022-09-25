import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {

  constructor(private http: HttpClient) {}

  registerPostData(data: any): Observable<any> {
    let url = environment.baseUrl + 'Authenticate/register';
    return this.http.post(url, data);
  }
}
