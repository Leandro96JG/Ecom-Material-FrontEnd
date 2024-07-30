import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { MaterialModule } from '../material/material.module';
import { RouterOutlet } from '@angular/router';
import { NotPageFoundComponent } from './pages/not-page-found/not-page-found.component';


@NgModule({
  declarations: [
    LayoutComponent,
    NotPageFoundComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    RouterOutlet
  ]
})
export class DashboardModule { }
