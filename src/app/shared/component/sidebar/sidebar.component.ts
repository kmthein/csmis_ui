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

  isManagementSubMenuOpen = false;
  isReportSubMenuOpen = false;

  toggleManagementSubMenu(): void {
    this.isManagementSubMenuOpen = !this.isManagementSubMenuOpen;
  }

  toggleReportSubMenu(): void {
    this.isReportSubMenuOpen = !this.isReportSubMenuOpen;
  }

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

  closeAllSubmenu() {
    this.isManagementSubMenuOpen = false;
    this.isReportSubMenuOpen = false;
  }

  closeOtherSubmenu(type: string) {
    if(type == "management") {
      this.isReportSubMenuOpen = false;
    } else if(type == "report") {
      this.isManagementSubMenuOpen = false;
    }
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
