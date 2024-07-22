import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';
import { NotpagefoundComponent } from './pages/notpagefound/notpagefound.component';

const routes: Routes = [
  {
    path:'auth',
    loadChildren:()=>import('./auth/auth.module').then(m=>m.AuthModule),
  },
  {
    path:'dashboard',
    loadChildren:()=>import('./pages/pages.module').then(m=>m.PagesModule),
  },
  {
    path:'',
    redirectTo:'/auth',
    pathMatch:'full',
  },
  {
    path:'**',
    component:NotpagefoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            PagesRoutingModule,
            AuthRoutingModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
