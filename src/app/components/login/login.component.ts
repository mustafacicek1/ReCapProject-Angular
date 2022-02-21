import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  constructor(private authService:AuthService,private toastrService:ToastrService,
    private formBuilder:FormBuilder,private localStorageService:LocalStorageService,
    private userService:UserService) { }

  ngOnInit(): void {
    this.createLoginForm()
  }

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      let loginModel=Object.assign({},this.loginForm.value)

      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.info("Giriş yapıldı","İşlem Başarılı")
        this.localStorageService.add("token",response.data.token)
        this.userService.getByMail(loginModel.email).subscribe(response=>{
          this.localStorageService.add("userName",response.data.firstName+" "+response.data.lastName)
          this.localStorageService.add("email",response.data.email)
          window.location.reload()
        })

      },responseError=>{
        this.toastrService.error(responseError.error)
      })
    }else{
      this.toastrService.error("Formunuz eksik","Hata")
    }
  }

}
