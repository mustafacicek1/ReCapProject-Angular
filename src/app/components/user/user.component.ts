import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  isAuthenticated:boolean=false;
  userName:string|null;
  constructor(private authService:AuthService,private localStorageService:LocalStorageService) { }

  ngOnInit(): void {
    this.isAuth()
    this.setUserName()
  }

  isAuth(){
    this.isAuthenticated=this.authService.isAuthenticated()
  }

  setUserName(){
    if(this.isAuthenticated===true){
      this.userName=this.localStorageService.getItem("userName")
    }
  }

  logOut(){
    this.localStorageService.remove("token");
    this.localStorageService.remove("email");
    this.localStorageService.remove("userName");
    window.location.reload()
  }
}
