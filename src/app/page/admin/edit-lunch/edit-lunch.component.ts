import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LunchService } from '../../../services/lunch.service';
import { error } from 'jquery';
import { NgForm } from '@angular/forms';
import { User } from '../../../models/user';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-edit-lunch',
  templateUrl: './edit-lunch.component.html',
  styleUrl: './edit-lunch.component.css'
})
export class EditLunchComponent {
  user: User | undefined | null;
  id: number | null = null;
  lunch: any = null;
  constructor(private route: ActivatedRoute, private lunchService: LunchService, private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
    });
    this.id = Number(this.route.snapshot.paramMap.get('id')!);
    this.getLunchById();
  }

  backToMenuList() {
    this.router.navigate([`/admin/menu`])
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    const body = {
      price: form.value.price,
      companyRate: form.value.companyRate,
      restaurantName: form.value.restaurantName,
      restaurantId: form.value.restaurantId,
      date: form.value.date,
      menu: form.value.menu,
      adminId: this.user?.id
    }
    this.lunchService.updateLunch(this.id!, body).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigate([`/admin/menu`]);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }

  getLunchById() {
    this.lunchService.getLunchById(this.id!).subscribe({
      next: (response) => {
        this.lunch = response;
        console.log(this.lunch);
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
}
