import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  cars:Car[]=[];
  carImages:CarImage[];
  currentCar:Car;
  brands:Brand[]=[];
  colors:Color[]=[];
  brandId:number=0;
  colorId:number=0;
  filterBrandId:number;
  filterColorId:number;
  constructor(private carService:CarService,private activatedRoute:ActivatedRoute,
    private brandService:BrandService,private carImageService:CarImageService,
    private colorService:ColorService) { }

    ngOnInit(): void {
      this.activatedRoute.params.subscribe((params) => {
        if (params['brandId']) {
          this.getByBrandId(params['brandId']);
        } else if (params['colorId']) {
          this.getByColorId(params['colorId']);
        } else {
          this.getCarList();
        }
      });
      this.getBrands();
      this.getColors();
      this.getCarImages();
    }

    filter() {
      this.getCarsByBrandAndColorId(this.brandId, this.colorId);
    }

  getCarList(){
    this.carService.getCarList().subscribe(response=>{
      this.cars=response.data;
    })
  }
  getBrands(){
    this.brandService.getBrandList().subscribe(response=>{
      this.brands=response.data
    })
  }
  getColors(){
    this.colorService.getColorList().subscribe(response=>{
      this.colors=response.data
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
  getCarsByBrandAndColorId(brandId: number, colorId: number) {
    if (brandId == 0 && colorId == 0) {
      this.getCarList();
      return;
    }
    if (brandId == 0) {
      this.getByColorId(colorId);
      return;
    }
    if (colorId == 0) {
      this.getByBrandId(brandId);
      return;
    }
    this.carService
      .getFilteredList(brandId, colorId)
      .subscribe((response) => {
        this.cars = response.data;
      });
  }
  
  setCurrentCar(car:Car){
    this.currentCar=car;
  }
  
  getCarImages(){
    this.carImageService.getCarImages().subscribe(response=>{
      this.carImages=response.data;
    })
  }

  getImageSource(carId:number):string{
      let carImage=this.carImages?.find(c=>c.carId===carId)
      if(carImage){
        let url:string="https://localhost:44376/"+carImage.imagePath;
        return url;
      }else{
        let defaultImageUrl="https://localhost:44376/Uploads/Images/DefaultImage.jpg"
        return defaultImageUrl;
      }
  }
}
