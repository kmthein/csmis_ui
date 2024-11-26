import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import { initFlowbite } from 'flowbite';
import { AnnouncementService } from '../../../services/announcement/announcement.service';
import { UserService } from '../../../services/user/user.service';
import { LunchService } from '../../../services/lunch.service';

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
  isCurrentWeek: boolean = true;

  weeklyMenu: any = [];
  menuAry: string[] = [];
  restaurant: any;

  getNextWeekMenu() {
    this.lunchService.getNextWeekLunch().subscribe({
      next: (response) => {
        console.log(response);
        this.restaurantName = response[response.length - 1].restaurantName;
        this.weeklyMenu = response.map((data: any) => {
          return {
            ...data,
            menu: data?.menu?.split(','),
            date: new Date(data?.date),
          };
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getCurrentWeekMenu() {
    this.lunchService.getWeeklyLunch().subscribe({
      next: (response) => {
        console.log(response);

        this.restaurantName = response[response.length - 1].restaurantName;
        this.weeklyMenu = response.map((data: any) => {
          return {
            ...data,
            menu: data?.menu?.split(','),
            date: new Date(data?.date),
          };
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  // Function to handle the emitted restaurant name
  onRestaurantChange(name: string) {
    this.restaurantName = name;
  }

  toggleNextOrCurrentWeek() {
      this.isCurrentWeek = !this.isCurrentWeek;
      if(!this.isCurrentWeek) {
        this.getNextWeekMenu();
      } else {
        this.getCurrentWeekMenu();
      }
  }

  constructor(private router: Router, private authService: AuthService, private announceService: AnnouncementService, private userService: UserService, private lunchService: LunchService) {}

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
    if (this.isCurrentWeek) {
      this.getCurrentWeekMenu();
    } else {
      this.getNextWeekMenu();
    }
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
