import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const roleAdminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const role = authService.getRole();


  if (role?.includes('ROLE_ADMIN')) {
    router.navigate(['/admin']);
    return false;
  } else if (role?.includes('ROLE_USER')) {
    router.navigate(['/dashboard']);
    return false;
  } else {
    router.navigate(['/auth']);
    return false;
  }


};
