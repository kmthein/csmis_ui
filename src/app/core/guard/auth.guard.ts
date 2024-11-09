import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      const user = this.authService.getUser();
      const hasDefaultPassword = user?.hasDefaultPassword;
      if(hasDefaultPassword) {
        this.router.navigate(['/force-password/change']);
        return false;
      }
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
