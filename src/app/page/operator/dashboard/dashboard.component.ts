import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  isAdmin: boolean = false;
  user: User | undefined | null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
    });
    console.log(this.user);
    console.log(this.router.url);
    if(this.router.url === "/admin") {
      this.isAdmin = true;
    }
  }

  ngAfterViewInit(): void {
    initFlowbite();  // Reinitialize Flowbite
  }
}
