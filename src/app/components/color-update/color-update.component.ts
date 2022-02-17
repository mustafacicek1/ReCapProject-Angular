import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,FormBuilder,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  colorUpdateForm:FormGroup;
  color:Color;
  constructor(private colorService:ColorService,private toastrService:ToastrService,private formBuilder:FormBuilder,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getColor(params["colorId"])
    })
    this.createColorUpdateForm();
  }

  createColorUpdateForm(){
    this.colorUpdateForm=this.formBuilder.group({
      colorName:["",Validators.required]
    })
  }

  getColor(colorId:number){
    this.colorService.getById(colorId).subscribe(response=>{
      this.color=response.data;
      this.colorUpdateForm.controls["colorName"].setValue(this.color.colorName)
    })
  }

  update(){
    let colorModel:Color=Object.assign({colorId:this.color.colorId},this.colorUpdateForm.value)
    if (this.colorUpdateForm.valid) {
      this.colorService.update(colorModel).subscribe((response) => {
        this.toastrService.success(response.message,"Başarılı")
      },responseError=>{
            this.toastrService.error(responseError.error.message,"Hata")                 
      })
    }else{
      this.toastrService.error("Formunuz Eksik","Dikkat")
    }
  }
}
