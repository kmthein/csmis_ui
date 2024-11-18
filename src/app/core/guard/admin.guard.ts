import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      const isAdmin = this.authService.isAdmin();
      if (isAdmin) {
        return true;
      }
    }
    
    const user = this.authService.getUser();
    console.log(user);

    this.router.navigate(['/login']);
    return false;
  }
}
