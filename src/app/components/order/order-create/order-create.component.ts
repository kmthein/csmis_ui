import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../models/order';
import { OrderRow } from '../../../models/order';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css'],
})
export class OrderCreateComponent implements OnInit {
  order: Order = new Order();

  constructor(
    private orderService: OrderService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0]; // Format today's date as YYYY-MM-DD
    this.orderService.getQuantity(today).subscribe(
      (quantity) => {
        const row = new OrderRow(0, new Date(), quantity); // Create a new row
        this.order.rows.push(row); // Add the row to the order's rows array
      },
      (error) => {
        console.error('Error fetching quantity:', error);
        this.toastr.error('Error fetching quantity. Please try again.', 'Error');
      }
    );
  }

  // Submit the form
  onSubmit(): void {
    if (this.order.message.trim() === '') {
      this.toastr.error('Message is required.', 'Error');
      return;
    }

    this.orderService.createOrder(this.order).subscribe(
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
