import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces/auth/auth-status.enum';

export const isNotAuthtenticatedGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  // if(authService.getRole()?.includes("ROLE_ADMIN")){

  //       if(authService.authStatus() === AuthStatus.authenticated){
  //         router.navigateByUrl("/admin");
  //         return false;
  //       }
  //       return true;
  //     }

  //         if(authService.authStatus() === AuthStatus.authenticated){
  //           router.navigateByUrl("/dashboard");
  //           return false;
  //         }
  //         return true;



  //! Metodo sin el admin

  if(authService.authStatus() === AuthStatus.authenticated){
    router.navigateByUrl("/dashboard");
    return false;
  }
  return true;
};





