import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';
import { AuthStatus } from './auth/interfaces/auth/auth-status.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolio';

  private authService = inject(AuthService);
  private router = inject(Router);

  public finishCheck = computed<boolean>(()=>{
    if(this.authService.authStatus() === AuthStatus.checking){
      return false;
    }
    return true;
  });

  constructor(){

  }

//necesito que cambie en caso de que sea admin o user
  public authStatusChangedEffect = effect(()=>{
      switch(this.authService.authStatus()){
        case AuthStatus.checking:
          return;
        case AuthStatus.authenticated:
            this.router.navigateByUrl("/dashboard");
          return;
        case AuthStatus.notAuthenticated:
          this.router.navigateByUrl('/login');
          return;
      }
  })
}
