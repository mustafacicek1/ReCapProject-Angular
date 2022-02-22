import { Component, OnInit } from '@angular/core';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css']
})
export class CarImageComponent implements OnInit {

  carId:number;
  carIdForImages:number;
  selectedFile:File;
  carImages:CarImage[]=[];
  constructor(private carImageService:CarImageService,private toastrService:ToastrService) { }

  ngOnInit(): void {
  }
  
  selectFile(event:any):void{
    this.selectedFile=event.target.files[0]
  }

  onUpload(){
    if(!this.selectedFile || !this.carId) return this.toastrService.error("Dosya ya da araç ıd eksik","Dikkat");

    return this.carImageService.add(this.carId,this.selectedFile).subscribe(response=>{
      this.toastrService.success("Resim eklendi","İşlem Başarılı")
    },responseError=>{
      console.log(responseError);
    })
  }

  getCarImagesById(carId:number){
    this.carImageService.getCarImageById(carId).subscribe(response=>{
      this.carImages=response.data;
    })
  }

  delete(carImage:CarImage){
    if (window.confirm('Araba resmini silmek istediğinize emin misiniz?')){
    this.isDefaultCarImage(carImage);
    if(carImage.id!==0){
      
        this.carImageService.delete(carImage).subscribe(response=>{
          this.toastrService.success("Resim silindi","İşlem başarılı")
          this.getCarImagesById(carImage.id)
        },responseError=>{
          console.log(responseError)
        }) 
    }else{
      this.toastrService.error("Default resmi silemezsiniz","Hata")
    }
  }
  }

  isDefaultCarImage(carImage: CarImage) {
    let defaultImageUrl="https://localhost:44376/Uploads/Images/DefaultImage.jpg"
    if(this.carImages[0].imagePath===defaultImageUrl){
      return carImage.id === 0;
    }
    return;
  }

  getImageSource(carImage:CarImage):string{
    let url:string="https://localhost:44376/"+ carImage.imagePath;
    return url
  }

}
