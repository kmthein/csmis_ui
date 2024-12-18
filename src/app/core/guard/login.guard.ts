import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      const user = this.authService.getUser();
      const hasDefaultPassword = user?.hasDefaultPassword;
      if(hasDefaultPassword) {
        this.router.navigate(['/force-password/change']);
        return false;
      }
      const isAdmin = this.authService.isAdmin();
      if (isAdmin) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/']);
      }
      return false;
    } else {
      return true;
    }
  }
}
