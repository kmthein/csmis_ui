import { Component, EventEmitter, Output } from '@angular/core';
import { LunchService } from '../../../services/lunch.service';
import { error } from 'jquery';

@Component({
  selector: 'app-weekly-menu',
  templateUrl: './weekly-menu.component.html',
  styleUrl: './weekly-menu.component.css'
})
export class WeeklyMenuComponent {
  constructor(private lunchService: LunchService) {}

  weeklyMenu: any = [];
  menuAry: string[] = [];
  @Output() restaurant = new EventEmitter<string>();
  
  ngOnInit() {
    this.getCurrentWeekMenu();
  }

  getCurrentWeekMenu() {
    this.lunchService.getWeeklyLunch().subscribe({
      next: (response) => {
        console.log(response);
        
        this.restaurant.emit(response[response.length - 1].restaurantName);
        this.weeklyMenu = response.map((data: any) => {
          return {
            ...data, 
            menu: data?.menu?.split(","),
            date: new Date(data?.date)
          };
        })
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}
