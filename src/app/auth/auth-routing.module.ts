import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path:'auth',
    component:LayoutComponent,
    children:[

      {
        path:'login',
        component:LoginComponent,
      },
      {
        path:'register',
        component:RegisterComponent,
      },
      {
        path:'',
        redirectTo:'login',
        pathMatch:'full',
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
