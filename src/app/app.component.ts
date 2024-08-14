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
  private readonly _admin:string = "ROLE_ADMIN";

  //Para el loading page
  public finishCheck = computed<boolean>(()=>{
    if(this.authService.authStatus() === AuthStatus.checking){
      return false;
    }
    return true;
  });

  constructor(){
  }

// necesito que cambie en caso de que sea admin o user
  public authStatusChangedEffect = effect(()=>{
    if(this.authService.getRole()?.includes(this._admin)){

      switch(this.authService.authStatus()){
        case AuthStatus.checking:
          this.router.navigateByUrl('/auth')
          return;
        case AuthStatus.authenticated:
            this.router.navigateByUrl("/admin");
          return;
        case AuthStatus.notAuthenticated:
          this.router.navigateByUrl('/auth');
          return;
      }
    }
      switch(this.authService.authStatus()){
        case AuthStatus.checking:
          this.router.navigateByUrl('/auth')
          return;
        case AuthStatus.authenticated:
            this.router.navigateByUrl("/dashboard");
          return;
        case AuthStatus.notAuthenticated:
          this.router.navigateByUrl('/auth');
          return;
      }
  })
}
