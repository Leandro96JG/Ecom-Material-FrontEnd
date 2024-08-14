import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const token = authService.getToken();
  const router = inject(Router);
  const snackBar = inject(MatSnackBar)

  if(token){
    req = req.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`
      }
    })
  }
  return next(req).pipe(
    catchError((err)=>{

      snackBar.open("La sesion expiró","Close",{duration:4000})
      router.navigateByUrl("/auth");
      authService.logout();
      return throwError(()=>err)
    })
);
};
