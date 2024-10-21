import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  isAdmin: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    if (authService.isAdmin()) {
      this.isAdmin = true;
    }
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.closeDrawer();
      }
    });
  }

  openDrawer() {
    const drawer = document.getElementById('drawer-navigation');
    const backdrop = document.getElementById('drawer-backdrop');

    if (drawer && backdrop) {
      drawer.classList.remove('-translate-x-full');
      backdrop.classList.remove('hidden');
    }
  }

  closeDrawer() {
    const drawer = document.getElementById('drawer-navigation');
    const backdrop = document.getElementById('drawer-backdrop');

    if (drawer && backdrop) {
      drawer.classList.add('-translate-x-full');
      backdrop.classList.add('hidden');
    }
  }
}
