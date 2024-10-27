import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RestaurantService } from '../../../../services/admin/restaurant.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrl: './add-restaurant.component.css'
})
export class AddRestaurantComponent {
  restaurant: any = {
    name: "",
    address: "",
    contact: "",
    email: ""
  };
  adminId: number | null = null;

  backToRestaurantList() {
    this.router.navigate(['/admin/restaurant']);
  }

  constructor(private router: Router, private restaurantService: RestaurantService) {
    const user = JSON.parse(localStorage.getItem("user")!);
    console.log(user?.id);
    this.adminId = user?.id;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    
    if (form.valid) {
      this.restaurantService.addRestaurant(form.value).subscribe({
        next: (response) => {
          this.router.navigate(['/admin/restaurant']);
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }

}
