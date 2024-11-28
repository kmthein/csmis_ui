import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user';
import { initFlowbite } from 'flowbite';
import { UserService } from '../../../services/user/user.service';
import { LunchService } from '../../../services/lunch.service';
import { AnnouncementService } from '../../../services/announcement/announcement.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] // Fixed typo
})
export class DashboardComponent {
  user: User | undefined | null;
  restaurantName: string = '';
  announcement: any = {};
  receivedMail: boolean = false;
  isCurrentWeek: boolean = true;
  weeklyMenu: any = [];
  menuAry: string[] = [];
  restaurant: any;

  canGiveFeedback(menuDate: Date): boolean {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay(); // 0 is Sunday, 1 is Monday, etc.
  
    console.log(`Menu Date: ${menuDate}, Current Day: ${dayOfWeek}`);
  
    // If we are in the current week
    if (this.isCurrentWeek) {
      // Feedback is allowed for the current day and any previous days in the week
      return menuDate.getDay() <= dayOfWeek; // If the menu day is less than or equal to today's day
    }
  
    // Feedback is not allowed for next week
    return false;
  }
  
  

  // Fetch next week's menu
  getNextWeekMenu() {
    this.lunchService.getNextWeekLunch().subscribe({
      next: (response) => {
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

  // Fetch current week's menu
  getCurrentWeekMenu() {
    this.lunchService.getWeeklyLunch().subscribe({
      next: (response) => {
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

  // Toggle between current and next week menu
  toggleNextOrCurrentWeek() {
    this.isCurrentWeek = !this.isCurrentWeek;
    if (!this.isCurrentWeek) {
      this.getNextWeekMenu();
    } else {
      this.getCurrentWeekMenu();
    }
  }

  // Constructor to inject services
  constructor(
    private router: Router,
    private authService: AuthService,
    private announceService: AnnouncementService,
    private userService: UserService,
    private lunchService: LunchService
  ) {}

  // On component initialization
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
      },
    });
    if (this.isCurrentWeek) {
      this.getCurrentWeekMenu();
    } else {
      this.getNextWeekMenu();
    }
  }

  // Toggle the email notification setting
  toggleMailNoti(notiOn: any) {
    const tempUser = JSON.parse(localStorage.getItem('user')!);
    const newUser = { ...tempUser, receivedMail: notiOn };
    localStorage.setItem('user', JSON.stringify(newUser));
    const id = this.user?.id!;
    const formData = new FormData();
    formData.append('bool', notiOn);
    this.userService.toggleMail(id, formData).subscribe({
      next: (res) => {
        console.log(res);
      },
    });
  }

  // Reinitialize Flowbite after view init
  ngAfterViewInit(): void {
    initFlowbite(); // Reinitialize Flowbite
  }
}
