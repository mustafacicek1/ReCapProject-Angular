import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  authenticatedUser:User;
  isAuth:boolean=false;
  userUpdateForm:FormGroup;
  constructor(private userService:UserService,private toastrService:ToastrService,private localStorageService:LocalStorageService,
    private formBuilder:FormBuilder,private authService:AuthService) { }

  ngOnInit(): void {
    this.isAuthenticated()
    this.getAuthenticatedUser()
    this.createPasswordUpdateForm()
  }

  createPasswordUpdateForm(){
    this.userUpdateForm=this.formBuilder.group({
      firstName:["",Validators.required],
      lastName:["",Validators.required],
      oldPassword:["",Validators.required],
      newPassword:["",Validators.required]
    })
  }

  isAuthenticated(){
    this.isAuth=this.authService.isAuthenticated()
  }

  getAuthenticatedUser(){
    if(this.isAuth===true){
      let result=this.localStorageService.getItem("email")
      let email=result?result:""
      this.userService.getByMail(email).subscribe(response=>{
        this.authenticatedUser=response.data
        this.userUpdateForm.controls["firstName"].setValue(response.data.firstName)
        this.userUpdateForm.controls["lastName"].setValue(response.data.lastName)
      })
    }
  }

  update(){
    let userUpdateModel=Object.assign({id:this.authenticatedUser?.id},this.userUpdateForm.value)
    if(this.userUpdateForm.valid){
      this.userService.update(userUpdateModel).subscribe(response=>{
        this.toastrService.success("Bilgiler güncellendi","Başarılı")
        this.localStorageService.add("userName",userUpdateModel.firstName+" "+userUpdateModel.lastName)
      },responseError=>{
        if(responseError.error.message){
          this.toastrService.error(responseError.error.message);
        }else{
          this.toastrService.error(responseError.error.Message);
        }
      })
    }else{
      this.toastrService.error("Formunuz Eksik","Dikkat")
    }
  }
}
