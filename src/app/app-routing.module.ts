import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { DashboardRoutingModule } from './user/dashboard-routing.module';
import { NotPageFoundComponent } from './user/pages/not-page-found/not-page-found.component';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';
import { isNotAuthtenticatedGuard } from './auth/guards/is-not-authenticated.guard';
import { roleAdminGuard } from './auth/guards/role-admin.guard';

const routes: Routes = [
  {
    canActivate:[isNotAuthtenticatedGuard,roleAdminGuard],
    path:'auth',
    loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule),
  },
  {
    canActivate:[isAuthenticatedGuard,roleAdminGuard],
    path:'admin',
    loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule),
  },
  {
    canActivate:[isAuthenticatedGuard,roleAdminGuard],
    path:'dashboard',
    loadChildren:()=>import('./user/dashboard.module').then(m=>m.DashboardModule),
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
