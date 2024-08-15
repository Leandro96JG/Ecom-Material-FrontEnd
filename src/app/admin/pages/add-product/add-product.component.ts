import { AdminService } from './../../services/admin.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Category } from '../../interfaces/category.interface';
import { CategoryResponse } from '../../interfaces/category-response.interface';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{

  private fb = inject(FormBuilder);
  private adminService = inject(AdminService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);


  listCategory:CategoryResponse[]=[];
  selectedFile?:File|null;
  imagePreview?:string|ArrayBuffer|null;

  public formProduct:FormGroup = this.fb.group({
    categoryId:[null,[Validators.required]],
    name:['',[Validators.required,Validators.minLength(4)]],
    price:['',[Validators.required]],
    description:['',[Validators.required]]
  })


  ngOnInit(): void {
    this.getAllCategory();
  }

  onFileSelected(event:Event){
    const fileInput = event.target as HTMLInputElement;
    this.selectedFile = fileInput.files?.[0];
    this.previewImage();
  }

  previewImage(){
    //Es para guardar archivos en este caso el input file seleccionado
    const reader = new FileReader();
    reader.onload = ()=>{
      this.imagePreview = reader.result;
    }
    if(!this.selectedFile){
      this.snackBar.open("No existe archivo seleccionado","Close",{duration:3000})
      return
    };
    reader.readAsDataURL(this.selectedFile);

  }
  getAllCategory(){
    this.adminService.getCategories().pipe(
    ).subscribe(
      value => this.listCategory=value
    )
  }

  addProduct(){
    if(this.formProduct.valid){
      if(!this.selectedFile){
        this.formProduct.setErrors({"Not Img":true});
        this.snackBar.open("Porfavor Ingrese Img","Close",{duration:3000})
        return;
      }
      const formData:FormData = new FormData();
      formData.append('img',this.selectedFile);
      formData.append('categoryId',this.formProduct.get('categoryId')?.value);
      formData.append('name',this.formProduct.get('name')?.value);
      formData.append('description',this.formProduct.get('description')?.value);
      formData.append('price',this.formProduct.get('price')?.value);

      this.adminService.addProduct(formData).subscribe((res)=>{
        if(res.id != null){
          this.snackBar.open("Product post successfully","Close",{duration:3000})
          this.router.navigateByUrl("/admin/dashboard");
        }else{
          this.snackBar.open(res.message,"ERROR",{duration:3000})
        }
      });


    }else{
      for(const i in this.formProduct.controls){
        this.formProduct.controls[i].markAsDirty();
        this.formProduct.controls[i].updateValueAndValidity();
      }
    }
  }

}
