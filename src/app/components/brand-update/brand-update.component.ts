import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  constructor(private brandService:BrandService,private toastrService:ToastrService,private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute) { }

  brandUpdateForm:FormGroup;
  brand:Brand;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getBrand(params["brandId"])
    })
    this.createBrandUpdateForm();
  }

  createBrandUpdateForm(){
    this.brandUpdateForm=this.formBuilder.group({
      brandName:["",Validators.required]
    })
  }

  getBrand(brandId:number){
    this.brandService.getById(brandId).subscribe(response=>{
      this.brand=response.data;
      this.brandUpdateForm.controls["brandName"].setValue(this.brand.brandName)
    });
  }

  update(){
    let brandModel:Brand=Object.assign({brandId:this.brand.brandId},this.brandUpdateForm.value)
    if (this.brandUpdateForm.valid) {
      this.brandService.update(brandModel).subscribe((response) => {
        this.toastrService.success(response.message,"Başarılı")
      },responseError=>{
            this.toastrService.error(responseError.error.message,"Hata")                 
      })
    }else{
      this.toastrService.error("Formunuz Eksik","Dikkat")
    }
  }
}
