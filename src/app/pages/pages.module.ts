import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { NotpagefoundComponent } from './notpagefound/notpagefound.component';
import { MaterialModule } from '../material/material.module';
import { RouterOutlet } from '@angular/router';


@NgModule({
  declarations: [
    PagesComponent,
    NotpagefoundComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    RouterOutlet
  ]
})
export class PagesModule { }
