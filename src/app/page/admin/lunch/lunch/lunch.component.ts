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
        type: "menu"
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

  loadLunches() {
    this.lunchService.getAllLunches().subscribe(data => {
      this.lunches = data;
    });
  }

  deleteLunch(id: number) {
    this.lunchService.deleteLunch(id).subscribe(() => {
      this.loadLunches();
    });
  }
  
}