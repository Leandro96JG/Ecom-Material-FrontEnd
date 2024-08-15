import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from '../material-angular/material.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductComponent } from './pages/product/product.component';
import { CategoryComponent } from './pages/category/category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './pages/add-product/add-product.component';
import { CardProductComponent } from './components/card-product/card-product.component';
import { SearchProductCardComponent } from './components/search-product-card/search-product-card.component';


@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    ProductComponent,
    CategoryComponent,
    AddProductComponent,
    CardProductComponent,
    SearchProductCardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
