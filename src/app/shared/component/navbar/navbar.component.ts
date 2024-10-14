import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  user: User | undefined | null;
  today: string = "";
  day: string = "";

  constructor(private authService: AuthService, private router: Router) {
    const date = new Date();
    const today = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    });
    this.today = today;
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    this.day = dayOfWeek;
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
