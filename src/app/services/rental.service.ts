import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalDetail } from '../models/rentalDetail';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl="https://localhost:44376/api/";
  constructor(private httpClient:HttpClient) { }
  
  getRentalDetailList():Observable<ListResponseModel<RentalDetail>>{
    let newPath=this.apiUrl+"rentals/getallrentaldetails";
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }
  addRental(rental:Rental):Observable<ResponseModel>{
    let newPath =this.apiUrl+"rentals/add";
    return this.httpClient.post<ResponseModel>(newPath,rental)
  }
}
