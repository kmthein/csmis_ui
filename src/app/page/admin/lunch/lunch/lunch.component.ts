import { Component, OnInit } from '@angular/core';
import { Lunch } from '../../../../models/lunch';
import { LunchService } from '../../../../services/lunch.service';
import { Router } from '@angular/router';
import { ActionButtonRendererComponent } from '../../../../shared/component/action-button-renderer/action-button-renderer.component';


@Component({
  selector: 'app-lunch',
  templateUrl: './lunch.component.html',
  styleUrls: ['./lunch.component.css']  // Fixed typo here
})
export class LunchComponent implements OnInit {
  lunches: Lunch[] = [];
  isEditing: boolean = false;
  isModalOpen: boolean = false;
  isLoading: boolean = false;
  restaurantName: string = "";
  menuAlreadyHave: boolean = false;

  // Function to handle the emitted restaurant name
  onRestaurantChange(name: string) {
    this.restaurantName = name;
  }

  pagination = true;
  paginationPageSize = 20;
  paginationPageSizeSelector = [10, 20, 30];
  colDefs: any = [
    {
      valueGetter: (params: any) => params.node.rowIndex + 1,
      flex: 0.5,
    },
    { field: 'menu', headerName: 'Menu', flex: 1.5, filter: true },
    { field: 'date', headerName: 'Date', flex: 1, filter: true },
    { field: 'price', headerName: 'Price', flex: 0.8, filter: true },
    { field: 'companyRate', headerName: 'Rate', flex: 0.8, filter: true },
    { field: 'restaurantName', headerName: 'Restaurant', flex: 1, filter: true },
    {
      headerName: 'Actions',
      cellRenderer: ActionButtonRendererComponent,
      flex: 0.8,
      cellRendererParams: {
        type: "menu",
        loadLunches: this.loadLunches.bind(this)
      },
    },
  ];

  constructor(private lunchService: LunchService, private router: Router) {
  }

  navigateAddWeeklyMenu() {
    this.router.navigate(['/admin/menu/add-weekly'])
  }


  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  ngOnInit() {
    this.loadLunches();
  }

  getDaysFromNextWeek(): Date[] {
    const now = new Date();
    const daysOfNextWeek: Date[] = [];
    
    // Calculate the upcoming week's dates (Monday to Friday only)
    const daysToNextMonday = (8 - now.getDay()) % 7 || 7; // Next Monday
    for (let i = 0; i < 7; i++) {
      const day = new Date(now);
      day.setDate(now.getDate() + daysToNextMonday + i);
  
      // Only include weekdays (Monday = 1, Friday = 5)
      const dayOfWeek = day.getDay(); // 0 = Sunday, 6 = Saturday
      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        daysOfNextWeek.push(day);
      }
    }
    return daysOfNextWeek;
  }

loadLunches() {
  this.lunchService.getAllLunches().subscribe(data => {
    this.lunches = data;

    // Get all days of next week
    const nextWeekDates = this.getDaysFromNextWeek();

    const datesToAdd = nextWeekDates.filter(nextWeekDate => {
      const isExisting = this.lunches.some((lunch: any) => {
        // Assuming lunch.date is in "YYYY-MM-DD" format
        if (new Date(lunch.date).toDateString() === nextWeekDate.toDateString()) {
          this.menuAlreadyHave = true; 
          return true; 
        }
        return false; 
      });
      return !isExisting; 
    });
  });
}

  deleteLunch(id: number) {
    this.lunchService.deleteLunch(id).subscribe(() => {
      this.loadLunches();
    });
  }
  
}