import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/order';
import { OrderRow } from '../../../models/order';
import { ToastrService } from 'ngx-toastr';
import { PaymentVoucherService } from '../../../services/payment-voucher.service';
import { Restaurant } from '../../../models/restaurant';
import { RestaurantService } from '../../../services/admin/restaurant.service';
import { HolidayService } from '../../../services/admin/holiday.service';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css'],
})
export class OrderCreateComponent implements OnInit {
  order: Order = new Order();

  selectedDate: string = '';
  weekDates: string[] = [];
  totalAmount: number = 0;
  registerData: any = [];
  restaurants: any = [];
  restaurantId!: number;
  publicHolidays: any = [];

  calculateWeek() {
    if (!this.selectedDate) {
      return;
    }

    const selected = new Date(this.selectedDate);
    const dayOfWeek = selected.getDay();
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    const startOfWeek = new Date(selected);
    startOfWeek.setDate(selected.getDate() + diffToMonday);

    this.weekDates = [];
    for (let i = 0; i < 5; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      this.weekDates.push(day.toISOString().split('T')[0]);
    }
  }

  onDateChange(event: any) {
    this.selectedDate = event.target.value;
    this.calculateWeek();
  }

  constructor(
    private orderService: OrderService,
    private router: Router,
    private toastr: ToastrService,
    private voucherService: PaymentVoucherService,
    private restaurantService: RestaurantService,
    private holidayService: HolidayService
  ) {}

  ngOnInit(): void {
    this.getAllRestaurants();
    this.loadPublicHolidays();
  }

  loadPublicHolidays() {
    this.holidayService.getAllHolidays().subscribe({
      next: (data) => {
        this.publicHolidays = data.map(
          (holiday: any) => new Date(holiday.date)
        );
        this.getNextWeekRegister();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  generateNextWeekNonHolidayDates(today: Date): Date[] {
    const nextWeekDates: Date[] = [];
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)

    // Calculate how many days until next Monday
    const daysUntilNextMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + daysUntilNextMonday); // Set the date to next Monday

    // Generate dates for Monday to Friday
    for (let i = 0; i < 5; i++) {
      // 5 days (Monday to Friday)
      const date = new Date(nextMonday);
      date.setDate(nextMonday.getDate() + i); // Add i days to next Monday

      // Check if this date is not a public holiday
      if (!this.isPublicHoliday(date)) {
        nextWeekDates.push(date);
      }
    }

    return nextWeekDates;
  }

  isPublicHoliday(date: Date): boolean {
    return this.publicHolidays.some(
      (holiday: any) =>
        holiday.getDate() === date.getDate() &&
        holiday.getMonth() === date.getMonth() &&
        holiday.getFullYear() === date.getFullYear()
    );
  }

  onChangeRestaurant(event: any) {
    this.restaurantId = event.target.value;
  }

  getAllRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe(res => {
      this.restaurants = res;
      this.restaurantId = res[0].id;
    })
  }

  getNextWeekRegister() {
  this.orderService.getNextWeekRegister().subscribe((res: any) => {
    // Extract holiday dates as ISO strings for comparison
    const holidayDates = this.publicHolidays.map((holiday: any) => holiday.date);

    // Filter out entries where lunchDate matches any holiday date
    this.registerData = res.filter((data: any) => !holidayDates.includes(data.lunchDate));

    // Calculate total amount based on the filtered data
    this.totalAmount = this.registerData.reduce((total: number, data: any) => {
      const oneDayAmount = data.cost * data.quantity;
      return total + oneDayAmount;
    }, 0);
  });
}


  updateTotalAmount(): void {
    this.totalAmount = this.registerData.reduce((sum: any, service: any) => {
      return sum + (service.quantity * service.cost);
    }, 0);
  }

  // Submit the form
  onSubmit(): void {
    console.log(this.registerData);
    const user = JSON.parse(localStorage.getItem("user")!);
    const data = {
      orderDate: new Date().toISOString(),
      restaurantId: this.restaurantId,
      adminId: user?.id,
      rows: this.registerData
    }
    // if (this.order.message.trim() === '') {
    //   this.toastr.error('Message is required.', 'Error');
    //   return;
    // }

    this.orderService.createOrder(data).subscribe(
      (response) => {
        this.toastr.success('Order created successfully!', 'Success');
        this.router.navigate(['/orders']); // Navigate to the order list
      },
      (error) => {
        console.error('Error creating order:', error);
        this.toastr.error('Error creating order. Please try again.', 'Error');
      }
    );
  }

  // Cancel and go back to order list
  cancel(): void {
    this.router.navigate(['/orders']);
  }
}
