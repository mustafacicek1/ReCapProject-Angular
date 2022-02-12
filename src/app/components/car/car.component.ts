import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:Car[]=[];

  currentCar:Car;
  constructor(private carService:CarService,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getByBrandId(params["brandId"]);
      }
      else if(params["colorId"]){
        this.getByColorId(params["colorId"]);
      
      }
      else{
        this.getCarList();
      }
    })
  }

  getCarList(){
    this.carService.getCarList().subscribe(response=>{
      this.cars=response.data;
    })
  }

  getByBrandId(brandId:number){
    this.carService.getByBrandId(brandId).subscribe(response=>{
      this.cars=response.data;
    })
  }

  getByColorId(colorId:number){
    this.carService.getByColorId(colorId).subscribe(response=>{
      this.cars=response.data;
    })
  }
 
  
  setCurrentCar(car:Car){
    this.currentCar=car;
  }
}
