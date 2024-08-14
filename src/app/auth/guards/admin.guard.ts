import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces/auth/auth-status.enum';

export const adminGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if(authService.authStatus() === AuthStatus.checking){
    router.navigateByUrl('/auth')
    return false;
  }
  if(authService.authStatus()=== AuthStatus.notAuthenticated){
    router.navigateByUrl('/auth')
    return false;
  }

  return true;
};
