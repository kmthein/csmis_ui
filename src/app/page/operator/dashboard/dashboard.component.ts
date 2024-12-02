import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user/user.service';
import { LunchService } from '../../../services/lunch.service';
import { AnnouncementService } from '../../../services/announcement/announcement.service';
import { OperatorCostService } from '../../../services/operator-cost.service'; // Import the service
import { User } from '../../../models/user';
import { initFlowbite } from 'flowbite'; // Import Flowbite initialization function
import { FeedbackService } from '../../../services/feedback.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  user: User | null = null;
  restaurantName: string = '';
  announcement: any = {};
  receivedMail: boolean = false;
  isCurrentWeek: boolean = true;
  weeklyMenu: any[] = [];
  menuAry: string[] = [];
  restaurant: any;
  nextWeekMenuHave: boolean = false;
  monthlyCost: number = 0; // Variable to store monthly cost
  weeklyCost: number = 0; // Variable to store weekly cost

  constructor(
    private router: Router,
    private authService: AuthService,
    private announceService: AnnouncementService,
    private userService: UserService,
    private lunchService: LunchService,
    private feedbackService: FeedbackService,
    private operatorCostService: OperatorCostService // Inject the service
  ) {}

  ngOnInit(): void {
    // Subscribe to the current user and fetch necessary data
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
      if (this.user) {
        this.receivedMail = this.user.receivedMail;
        this.fetchCosts(); // Fetch costs after user data is available
      }
    });

    // Fetch announcements
    this.fetchAnnouncements();
    // Load the current week's or next week's menu
    this.isCurrentWeek ? this.getCurrentWeekMenu() : this.getNextWeekMenu();
    this.getNextWeekMenu();
    
  }

  ngAfterViewInit(): void {
    initFlowbite(); // Reinitialize Flowbite after view initialization
  }

  // Fetch announcements
  private fetchAnnouncements(): void {
    this.announceService.getAllAnnouncements(1, 1).subscribe({
      next: (response) => {
        this.announcement = response.content[0];
      },
      error: (error) => {
        console.error('Error fetching announcements:', error);
      },
    });
  }

  // Fetch the monthly and weekly total costs from the operator cost service
  private fetchCosts(): void {
    if (this.user?.id) {
      // Fetch monthly cost
      this.operatorCostService.getMonthlyTotalCost(this.user.id).subscribe({
        next: (response) => {
          this.monthlyCost = response;
        },
        error: (error) => {
          console.error('Error fetching monthly cost:', error);
        },
      });

      // Fetch weekly cost
      this.operatorCostService.getWeeklyTotalCost(this.user.id).subscribe({
        next: (response) => {
          this.weeklyCost = response;
        },
        error: (error) => {
          console.error('Error fetching weekly cost:', error);
        },
      });
    }
  }

  // Fetch the menu for the current week
  private getCurrentWeekMenu(): void {
    this.lunchService.getWeeklyLunch().subscribe({
      next: (response) => {
        this.restaurantName =
          response[response.length - 1]?.restaurantName || '';
        this.weeklyMenu = response.map((data: any) => ({
          ...data,
          menu: data?.menu?.split(','),
          date: new Date(data?.date),
          isFeedbackAdd: false
        }));
        this.weeklyMenu.forEach((menuItem) => {
          this.checkFeedbackStatus(this.user?.id!, menuItem.id).subscribe(
            (res: boolean) => {
              menuItem.isFeedbackAdd = res; // Update the field asynchronously
            }
          );
        });
      },
      error: (error) => {
        console.error('Error fetching current week menu:', error);
      },
    });
  }

  checkFeedbackStatus(userId: number, lunchId: number) {
    return this.feedbackService.checkFeedbackStatus(userId, lunchId)
  }

  // Fetch the menu for the next week
  private getNextWeekMenu(): void {
    this.lunchService.getNextWeekLunch().subscribe({
      next: (response) => {
        if (response != null) {
          this.nextWeekMenuHave = true;
        } else {
          this.restaurantName =
            response[response?.length - 1]?.restaurantName || '';
          this.weeklyMenu = response.map((data: any) => ({
            ...data,
            menu: data?.menu?.split(','),
            date: new Date(data?.date),
          }));
        }
      },
      error: (error) => {
        console.error('Error fetching next week menu:', error);
      },
    });
  }

  // Toggle between current and next week menu
  toggleNextOrCurrentWeek(): void {
    this.isCurrentWeek = !this.isCurrentWeek;
    if (this.isCurrentWeek) {
      this.getCurrentWeekMenu();
    } else {
      this.getNextWeekMenu();
    }
  }

  

  // Check if feedback can be given for a specific menu date
  canGiveFeedback(menuDate: Date): boolean {
    const currentDate = new Date();
    const dayOfWeek = currentDate.getDay();
    return this.isCurrentWeek && menuDate.getDay() <= dayOfWeek; // Feedback allowed for today and previous days
  }

  // Toggle the email notification setting
  toggleMailNoti(notiOn: boolean): void {
    if (this.user) {
      const updatedUser = { ...this.user, receivedMail: notiOn };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      const formData = new FormData();
      formData.append('bool', notiOn.toString());
      this.userService.toggleMail(this.user.id, formData).subscribe({
        next: (res) => {
          console.log('Mail notification setting updated:', res);
        },
        error: (err) => {
          console.error('Error updating mail notification setting:', err);
        },
      });
    }
  }
}
