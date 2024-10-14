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
  user: User | undefined | null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
    });
  }

  ngAfterViewInit(): void {
    initFlowbite();  // Reinitialize Flowbite
  }
}
