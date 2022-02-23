import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { RentalService } from 'src/app/services/rental.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { Customer } from 'src/app/models/customer';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';
import { BehaviorSubject } from 'rxjs';
import { CreditCard } from 'src/app/models/creditCard';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  authenticatedUser:User
  carId!:number
  customer:Customer
  returnDate?:Date;
  creditCardForm:FormGroup;
  rental:Rental;
  constructor(private customerService:CustomerService,private toastrService:ToastrService,localStorageService:LocalStorageService,
    private formBuilder:FormBuilder,private rentalService:RentalService,private creditCardService:CreditCardService,
    private userService:UserService,private carService:CarService,private actvatedRoute:ActivatedRoute,private paymentService:PaymentService) { }

  ngOnInit(): void {
    this.getAuthenticatedUser()
    this.createCreditCardForm()
  }

  createCreditCardForm(){
    this.creditCardForm=this.formBuilder.group({
      customerId:["",Validators.required],
      nameOnTheCard:["",Validators.required],
      cardNumber:["",Validators.required],
      expirationDate:["",Validators.required],
      cvv:["",Validators.required]
    })
  }

  getAuthenticatedUser(){
    let result=localStorage.getItem("email");
    let email=result?result:""
    this.userService.getByMail(email).subscribe(response=>{
      this.authenticatedUser=response.data
      this.getCustomerByUserId()
    });
  }

  addCustomer(){
    let customerModel:Customer=Object.assign({userId:this.authenticatedUser.id,companyName:" "})
    this.customerService.add(customerModel).subscribe(response=>{
      this.getCustomerByUserId()
    })
  }

  getCustomerByUserId(){
    this.customerService.getByUserId(this.authenticatedUser?.id).subscribe(response=>{
      if(response.data===null){
        this.addCustomer()
       
      }else{
        this.customer=response.data
        this.creditCardForm.controls["customerId"].setValue(this.customer.id)
      }
    })
  }
  setRental(){
   this.actvatedRoute.params.subscribe(params=>{
      if(params["carId"]) this.carId=params["carId"]
    });
    this.rental=Object.assign({carId:this.carId,customerId:this.customer.id,returnDate:this.returnDate})
    console.log(this.rental)
  }

  pay(){
    console.log(this.creditCardForm.value)
    if(this.creditCardForm.valid){
      this.setRental()
      let creditCardModel=Object.assign({},this.creditCardForm.value)
      this.rentalService.addRental(this.rental).subscribe(response=>{
        this.toastrService.success(response.message)
        this.paymentService.pay(creditCardModel).subscribe(response=>{
          this.toastrService.success(response.message)
          this.saveCard(creditCardModel)
        })
      },responseError=>{
        if(responseError.error.message){
          this.toastrService.error(responseError.error.message);
        }else{
          this.toastrService.error(responseError.error.Message);
        }
      })
    }else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }

  saveCard(creditCard:CreditCard){
    if(this.isChecked$.value===true){
      this.creditCardService.saveCard(creditCard).subscribe(response=>{
        this.toastrService.success(response.message)
      })
    }
  }

  public isChecked$ = new BehaviorSubject(false);
toggleChecked() {
  this.isChecked$.next(!this.isChecked$.value)
console.log(this.isChecked$)
}
}
