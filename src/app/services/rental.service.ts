import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDetail } from '../models/rentalDetail';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl="https://localhost:44349/api/";
  constructor(private httpClient:HttpClient) { }
  
  getRentalDetailList():Observable<ListResponseModel<RentalDetail>>{
    let newPath=this.apiUrl+"rentals/getallrentaldetails";
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }
}
