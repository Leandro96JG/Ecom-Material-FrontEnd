import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { DashboardRoutingModule } from './dashboard/dashboard-routing.module';
import { NotPageFoundComponent } from './dashboard/pages/not-page-found/not-page-found.component';

const routes: Routes = [
  {
    path:'auth',
    loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule),
  },
  {
    path:'dashboard',
    loadChildren:()=>import('./dashboard/dashboard.module').then(m=>m.DashboardModule),
  },
  {
    path:'',
    redirectTo:'/auth',
    pathMatch:'full',
  },
  {
    path:'**',
    component:NotPageFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            DashboardRoutingModule,
            AuthRoutingModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
