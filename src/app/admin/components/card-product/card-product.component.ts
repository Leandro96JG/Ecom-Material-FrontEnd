import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Product } from '../../interfaces/product-response';
import { AdminService } from '../../services/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'card-product-component',
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css'
})
export class CardProductComponent {

  private adminService = inject(AdminService);
  private snackBar = inject(MatSnackBar);

  @Input()
  product!:Product;


  @Output()
  idProduct = new EventEmitter<number>()

  onClick(){
    this.idProduct.emit(this.product.id);
  }


}
