import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Product } from '../../interfaces/product-response';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'search-product-card',
  templateUrl: './search-product-card.component.html',
  styleUrl: './search-product-card.component.css'
})
export class SearchProductCardComponent {

  private adminService = inject(AdminService);
  private fb =inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  public products:Product[]=[];
  public searchForm:FormGroup = this.fb.group({
    searchProduct:['',[Validators.required]]
  })

  @Output()
  productsEmit = new EventEmitter<Product[]>();


  submitForm(){
    const {searchProduct} = this.searchForm.value;
    this.adminService.getProductsByName(searchProduct).pipe(
    ).subscribe({
      next:(products =>{
        this.products=[];
        products.forEach(element => {
          element.img = "data:image/jpeg;base64,"+element.byteImg;
          this.products?.push(element);
          this.productsEmit.emit(this.products);
      });
      }),
      error:()=>{
          this.snackBar.open("Error en la peticion del componente","Close",{duration:3000})
      }
    })
  }
 

}
