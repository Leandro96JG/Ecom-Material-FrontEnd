import { Product } from './../../interfaces/product-response';
import { Component, inject, OnInit, signal } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  private adminService = inject(AdminService);
  private snackBar = inject(MatSnackBar);


  public products:Product[]=[];
  public deletedId:number=0;

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
     this.adminService.getProducts().subscribe({
      next:(products)=>{
        this.products=[];
        products.forEach(element => {
          element.img = "data:image/jpeg;base64,"+element.byteImg;
          this.products?.push(element);
        });
      },
      error:()=>{this.snackBar.open("Bad Request","Close",{duration:3000})}
    })
  }
  searchProduct(products:Product[]){
    this.products = products;
  }

  deletedProduct(event:number){
    this.adminService.deletedProduct(event).subscribe({
      next: ()=>{
          this.snackBar.open("Product Deleted","Close",{duration:3000})
          this.getAllProducts();
      },
      error: (err)=>{
        console.log(err)
        this.snackBar.open(err.status,"Close",{duration:3000})
      }
    })
  }

}
