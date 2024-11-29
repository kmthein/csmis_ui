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
  orderAlreadyExist: boolean = false;

  calculateWeek() {
    const selected = new Date(
      this.registerData[0]?.lunchDate || this.selectedDate
    );
    const dayOfWeek = selected.getDay();
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    const startOfWeek = new Date(selected);
    startOfWeek.setDate(selected.getDate() + diffToMonday);

    this.weekDates = [];
    for (let i = 0; i < 5; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      const formattedDate = day.toISOString().split('T')[0];

      // Exclude dates that match public holidays
      if (!this.publicHolidays.includes(formattedDate)) {
        this.weekDates.push(formattedDate);
      }
    }
    console.log('Filtered Week Dates:', this.weekDates);
  }

  onDateChange(event: any) {
    this.selectedDate = event.target.value;
    this.calculateWeek();
    this.getNextWeekRegister(); // Reload register data after filtering
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
    this.checkOrderAlreadyMade();
    this.getAllRestaurants();
    this.loadPublicHolidays();
  }

  checkOrderAlreadyMade() {
    this.orderService.getNextWeekOrder().subscribe((res: any) => {
      if (res.length > 0) {
        this.orderAlreadyExist = true;
      }
    });
  }

  loadPublicHolidays() {
    this.holidayService.getAllHolidays().subscribe({
      next: (data) => {
        this.publicHolidays = data.map((holiday: any) => holiday.date);
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
    const formattedDate = date.toISOString().split('T')[0];
    return this.publicHolidays.includes(formattedDate);
  }

  onChangeRestaurant(event: any) {
    this.restaurantId = event.target.value;
  }

  getAllRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe((res) => {
      this.restaurants = res;
      this.restaurantId = res[0].id;
    });
  }

  getNextWeekRegister() {
    this.orderService.getNextWeekRegister().subscribe((res: any) => {
      const holidayDates = this.publicHolidays.map((holiday: any) => holiday); // ISO format

      this.registerData = res.filter(
        (data: any) => !holidayDates.includes(data.lunchDate) // Exclude holidays
      );

      this.totalAmount = this.registerData.reduce(
        (total: number, data: any) => {
          return total + data.cost * data.quantity; // Calculate total amount
        },
        0
      );
    });
  }

  updateTotalAmount(): void {
    this.totalAmount = this.registerData.reduce((sum: any, service: any) => {
      return sum + service.quantity * service.cost;
    }, 0);
  }

  // Submit the form
  onSubmit(): void {
    console.log(this.registerData);
    const user = JSON.parse(localStorage.getItem('user')!);
    const data = {
      orderDate: new Date().toISOString(),
      restaurantId: this.restaurantId,
      adminId: user?.id,
      rows: this.registerData,
      restaurantName: this.restaurantId
    };
    // if (this.order.message.trim() === '') {
    //   this.toastr.error('Message is required.', 'Error');
    //   return;
    // }

    this.orderService.createOrder(data).subscribe(
      (response) => {
        this.toastr.success('Order created successfully!', 'Success');
        this.router.navigate(['/admin']); // Navigate to the order list
      },
      (error) => {
        console.error('Error creating order:', error);
        this.toastr.error('Error creating order. Please try again.');
      }
    );
  }

  // Cancel and go back to order list
  cancel(): void {
    this.router.navigate(['/orders']);
  }
}
