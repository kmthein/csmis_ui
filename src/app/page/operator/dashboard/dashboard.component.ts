import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import { initFlowbite } from 'flowbite';
import { AnnoucementService } from '../../../services/annoucement/annoucement.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  user: User | undefined | null;
  restaurantName: string = "";
  announcement: any = {};
  receivedMail: boolean = false;

  // Function to handle the emitted restaurant name
  onRestaurantChange(name: string) {
    this.restaurantName = name;
  }

  constructor(private router: Router, private authService: AuthService, private announceService: AnnoucementService, private userService: UserService) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
      this.receivedMail = this.user?.receivedMail!;
      
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

  toggleMailNoti(notiOn: any) {
    const tempUser = JSON.parse(localStorage.getItem("user")!);
    const newUser = {...tempUser, receivedMail: notiOn }
    localStorage.setItem("user", JSON.stringify(newUser));
    console.log(notiOn);
    const id = this.user?.id!;
    const formData = new FormData();
    formData.append("bool", notiOn);
    this.userService.toggleMail(id, formData).subscribe({
      next: (res) => {
        console.log(res);
      }
    });
  }

  ngAfterViewInit(): void {
    initFlowbite();  // Reinitialize Flowbite
  }
}
