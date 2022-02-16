import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  apiUrl="https://localhost:44349/api/";
  constructor(private httpClient:HttpClient) { }

  saveCard(creditCard:CreditCard):Observable<ResponseModel>{
    let newPath=this.apiUrl+"creditcards/save"
    return this.httpClient.post<ResponseModel>(newPath,creditCard);
  }

  getCards():Observable<ListResponseModel<CreditCard>>{
    let newPath=this.apiUrl+"creditcards/getCards"
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }
}
