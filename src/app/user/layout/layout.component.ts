import { Component, computed, inject, WritableSignal } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  private authService = inject(AuthService);

  public user = computed(()=>this.authService.currentUser())

  logout(){
    this.authService.logout();
  }


}
