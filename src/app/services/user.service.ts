import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';
import { UserUpdateModel } from '../models/userUpdateModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl="https://localhost:44376/api/";
  constructor(private httpClient:HttpClient) { }

  getByMail(mail:string):Observable<SingleResponseModel<User>>{
    let newPath=this.apiUrl+"users/getbymail?mail="+mail;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  update(userUpdateModel:UserUpdateModel):Observable<ResponseModel>{
     let newPath=this.apiUrl+"users/update";
     return this.httpClient.post<ResponseModel>(newPath,userUpdateModel);
  }
}
