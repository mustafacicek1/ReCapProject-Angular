import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService {
  
  apiUrl="https://localhost:44376/api/";
  constructor(private httpClient:HttpClient) { }

  getCarImageById(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath=this.apiUrl+"carimages/getbycarid?id="+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  getCarImages():Observable<ListResponseModel<CarImage>>{
    let newPath=this.apiUrl+"carimages/getall";
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  add(carId:number,file:File):Observable<ResponseModel>{
    const formData:FormData=new FormData();
    formData.append('CarId',carId.toString())
    formData.append('file',file)
    let newPath=this.apiUrl+"carimages/add";
    return this.httpClient.post<ResponseModel>(newPath,formData,{
      reportProgress:true,
      responseType:'json',
    });
  }

  delete(carImage:CarImage):Observable<ResponseModel>{
    let newPath=this.apiUrl+"carimages/delete";
    return this.httpClient.post<ResponseModel>(newPath,carImage);
  }
}
