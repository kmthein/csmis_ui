import { Component } from '@angular/core';
import { ActionButtonRendererComponent } from '../../../../shared/component/action-button-renderer/action-button-renderer.component';
import { RestaurantService } from '../../../../services/admin/restaurant.service';
import { Router } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrl: './restaurant-list.component.css'
})
export class RestaurantListComponent {
  pagination = true;
  paginationPageSize = 20;
  paginationPageSizeSelector = [10, 20, 30];

  colDefs: any = [
    {
      valueGetter: (params: any) => params.node.rowIndex + 1,
      flex: 0.5,
    },
    { field: 'name', headerName: 'Name', flex: 1.5, filter: true },
    { field: 'address', headerName: 'Address', flex: 1, filter: true },
    { field: 'contact', headerName: 'Contact', flex: 1, filter: true },
    { field: 'email', headerName: 'Email', flex: 1, filter: true },
    { field: 'status', headerName: 'Status', flex: 1, filter: true },
    {
      headerName: 'Actions',
      cellRenderer: ActionButtonRendererComponent,
      flex: 0.8,
      cellRendererParams: {
        type: "restaurant",
        getAllRestaurants: this.getAllRestaurants.bind(this)
      },
    },
  ];

  restaurants: any = [];
  isModalOpen: boolean = false;
  selectedRestaurant: any = {};
  isLoading: boolean = false;

  constructor(
    private restaurantService: RestaurantService,
    private router: Router
  ) {}

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
    initFlowbite();
  }

  addNewRestaurant() {
    this.router.navigate(['/admin/restaurant/new']);
  }

  onEdit(restaurant: any) {
    this.selectedRestaurant = restaurant; // Store the selected staff's data
    this.toggleModal(); // Open the modal
  }

  ngOnInit(): void {
    this.getAllRestaurants();
  }

  ngOnDestroy(): void {}

  getAllRestaurants(): void {
    this.restaurantService.getAllRestaurants().subscribe((data) => {
      console.log(data);
      this.restaurants = data;
    });
  }

}
