import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  apiUrl="https://localhost:44376/api/";
  constructor(private httpClient:HttpClient) { }

  pay(creditCard:CreditCard):Observable<ResponseModel>{
    let newPath=this.apiUrl+"/payments/pay";
    return this.httpClient.post<ResponseModel>(newPath,creditCard);
  }
}
