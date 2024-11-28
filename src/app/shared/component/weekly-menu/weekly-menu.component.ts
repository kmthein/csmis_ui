import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LunchService } from '../../../services/lunch.service';
import { error } from 'jquery';

@Component({
  selector: 'app-weekly-menu',
  templateUrl: './weekly-menu.component.html',
  styleUrl: './weekly-menu.component.css',
})
export class WeeklyMenuComponent {
  constructor(private lunchService: LunchService) {}

  weeklyMenu: any = [];
  menuAry: string[] = [];
  @Output() restaurant = new EventEmitter<string>();
  @Input() isCurrentWeek: any;
  @Output() menuData = new EventEmitter<any[]>();
  
  ngOnInit() {
    if (this.isCurrentWeek) {
      this.getCurrentWeekMenu();
    } else {
      this.getNextWeekMenu();
    }
  }

  getMenuData(isCurrentWeek: boolean) {
    // Replace this with your actual API or data-fetching logic

    this.getNextWeekMenu();
    console.log(this.weeklyMenu);    
    this.menuData.emit(this.weeklyMenu); // Emit the data back to the parent
  }

  getNextWeekMenu() {
    this.lunchService.getNextWeekLunch().subscribe({
      next: (response) => {
        console.log(response);

        this.restaurant.emit(response[response.length - 1].restaurantName);
        this.menuData.emit(response);
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

        this.restaurant.emit(response[response.length - 1].restaurantName);
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
}
