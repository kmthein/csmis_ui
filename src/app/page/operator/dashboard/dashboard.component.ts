import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import { initFlowbite } from 'flowbite';
import { AnnoucementService } from '../../../services/annoucement/annoucement.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  user: User | undefined | null;
  restaurantName: string = "";
  announcement: any = {};

  // Function to handle the emitted restaurant name
  onRestaurantChange(name: string) {
    this.restaurantName = name;
  }

  constructor(private router: Router, private authService: AuthService, private announceService: AnnoucementService) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
    });
    this.announceService.getAllAnnouncements().subscribe({
      next: (response) => {
        this.announcement = response[0];
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  ngAfterViewInit(): void {
    initFlowbite();  // Reinitialize Flowbite
  }
}
