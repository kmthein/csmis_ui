import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../../../../services/admin/restaurant.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrl: './edit-restaurant.component.css'
})
export class EditRestaurantComponent {
  id!: number;
  restaurant: any;
  viewMode: boolean = true;
  statusList = ['Active', 'InActive'];

  toggleView(bool: boolean) {
    this.viewMode = bool;
  }

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private router: Router,
  ) {}

  backToStaffList() {
    this.router.navigate(['/admin/restaurant']);
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id')!);

    this.restaurantService.getRestaurantById(this.id).subscribe((data) => {
      console.log(data);
      this.restaurant = data;
    });
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    const formData = new FormData();
    for (let key in form.value) {
      if (form.value.hasOwnProperty(key)) {
        if (form.value[key]) {
          formData.append(key, form.value[key]);
        }
      }
    }
    this.restaurantService.updateRestaurants(formData, this.id).subscribe({
      next: (response) => {
        this.router.navigate(['/admin/restaurant']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

}
