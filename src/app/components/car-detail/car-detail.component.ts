import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carDetails:CarDetail[];
  carImages:CarImage[];
  constructor(private carService:CarService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetailById(params["carId"]);
        this.getCarImageById(params["carId"]);
      }
    })
  }

  getCarDetailById(carId:number){
    this.carService.getCarDetailById(carId).subscribe(response=>{
      this.carDetails=response.data;
    })
  }

  getCarImageById(carId:number){
    this.carService.getCarImageById(carId).subscribe(response=>{
      this.carImages=response.data;
    })
  }

  getImageSource(carImage:CarImage):string{
    let url:string="https://localhost:44349/"+ carImage.imagePath;
    return url
  }

}
