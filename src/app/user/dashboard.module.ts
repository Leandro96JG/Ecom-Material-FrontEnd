import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from '../material-angular/material.module';
import { RouterOutlet } from '@angular/router';
import { NotPageFoundComponent } from './pages/not-page-found/not-page-found.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';


@NgModule({
  declarations: [
    LayoutComponent,
    NotPageFoundComponent,
    DashboardComponent,
    ProductPageComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    RouterOutlet
  ]
})
export class DashboardModule { }
