import { ApplicationRef, ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  user: User | undefined | null;
  today: string = "";
  day: string = "";
  dropdownOpen: boolean = false;
  isAdmin: boolean = false;
  permanentOperator: boolean = false;

  constructor(private authService: AuthService, private router: Router, private cdRef: ChangeDetectorRef, private ngZone: NgZone) {
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
    if (this.authService.isAdmin()) {
      this.isAdmin = true;
      this.permanentOperator = false;
    } 
    if (this.authService.isPermanentOperator()) {
      this.permanentOperator = true;
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  switchUserPanel(isAdmin: boolean) {
    const user = JSON.parse(localStorage.getItem('user')!);
    const newUser = { ...user, role: isAdmin ? 'OPERATOR' : 'ADMIN' };
    if(isAdmin) {
      this.isAdmin = false;
    } else {
      this.isAdmin = true;
    }
    localStorage.setItem('user', JSON.stringify(newUser));
    this.user = newUser;
    this.permanentOperator = false;

    // Navigate and ensure Angular detects changes after navigation
    this.router.navigate([isAdmin ? '/' : '/admin']).then(() => {
        this.ngZone.run(() => {
            this.dropdownOpen = false;
            this.cdRef.detectChanges(); // Trigger change detection after navigation in NgZone
        });
    });
    console.log(this.user);
    console.log(this.permanentOperator);
}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
