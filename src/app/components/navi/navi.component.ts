import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

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
    if(this.isAuthenticated===true && this.localStorageService.getItem("userName")){
      this.userName=this.localStorageService.getItem("userName")
    }
  }
}
