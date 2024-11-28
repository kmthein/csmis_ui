import { Component, OnInit } from '@angular/core';
import { PaymentVoucherService } from '../../services/payment-voucher.service';

@Component({
  selector: 'app-payment-voucher',
  templateUrl: './payment-voucher.component.html',
  styleUrls: ['./payment-voucher.component.css']
})
export class PaymentVoucherComponent implements OnInit {

  selectedDate: string = '';
  weekDates: string[] = [];
  voucherData: any = {  // Initialize voucherData with top-level properties
    voucherNo: '',
    paymentDate: '',
    cateringServiceName: '',
    invoicePeriod: '',
    services: [] // For daily service details
  };
  totalAmount: number = 0;

  constructor(private voucherService: PaymentVoucherService) {}

  ngOnInit(): void {
    const today = new Date();
    this.selectedDate = today.toISOString().split('T')[0];
    this.calculateWeek();
  }

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

    this.calculateVoucherData();
  }

  calculateVoucherData() {
    if (!this.selectedDate) return;

    // Reset voucher data and total amount
    this.voucherData.services = [];
    this.totalAmount = 0;

    // Set static voucher details
    this.voucherData.voucherNo = "CS001-" + this.weekDates[0].replace(/-/g, '');
    this.voucherData.paymentDate = new Date().toISOString().split('T')[0];
    this.voucherData.cateringServiceName = "Kaung Myait Hein Restaurant";
    this.voucherData.invoicePeriod = `${this.weekDates[0]} ~ ${this.weekDates[this.weekDates.length - 1]}`;

    this.weekDates.forEach(date => {
      this.voucherService.getQuantity(date).subscribe(quantity => {
        this.voucherService.getTotalCost(date).subscribe(totalCost => {
          const pricePerPax = totalCost;
          const amount = quantity * pricePerPax;

          // Add daily details to services
          this.voucherData.services.push({
            date: date,
            quantity: quantity,
            totalCost: totalCost,
            pricePerPax: pricePerPax,
            amount: amount,
          });

          // Update total amount for the week
          this.totalAmount += amount;
        });
      });
    });
  }

  onDateChange(event: any) {
    this.selectedDate = event.target.value;
    this.calculateWeek();
  }
}
