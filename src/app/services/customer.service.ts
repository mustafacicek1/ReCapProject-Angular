import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiUrl="https://localhost:44376/api/";
  constructor(private httpClient:HttpClient) { }

  add(customer:Customer):Observable<ResponseModel>{
    let newPath=this.apiUrl+"customers/add"
    return this.httpClient.post<ResponseModel>(newPath,customer);
  }

  getByUserId(userId:number):Observable<SingleResponseModel<Customer>>{
    let newPath=this.apiUrl+"customers/getbyuserid?userId="+userId;
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath);
  }
}
