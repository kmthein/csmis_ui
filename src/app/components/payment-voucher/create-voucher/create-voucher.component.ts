import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { PaymentVoucherService } from '../../../services/payment-voucher.service';
import { PaymentVoucher } from '../../../models/paymentVoucher';

@Component({
  selector: 'app-create-voucher', // Updated selector
  templateUrl: './create-voucher.component.html', // Updated template path
  styleUrls: ['./create-voucher.component.css'], // Updated style path
})
export class CreateVoucherComponent {
  voucherForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private paymentVoucherService: PaymentVoucherService
  ) {
    // Initialize the form
    this.voucherForm = this.fb.group({
      voucherNo: ['', Validators.required],
      restaurantName: ['', Validators.required],
      paymentDate: [new Date(), Validators.required],
      rows: this.fb.array([]), // For the dynamic rows
    });

    // Add 5 default rows
    this.initializeRows(5);
  }

  get rows(): FormArray {
    return this.voucherForm.get('rows') as FormArray;
  }

  initializeRows(count: number): void {
    for (let i = 0; i < count; i++) {
      this.addRow();
    }
  }

  addRow(): void {
    const row = this.fb.group({
      pax: [0, Validators.required],
      price: [0, Validators.required],
      amount: [{ value: 0, disabled: true }], // Read-only
      remark: [''],
    });
    this.rows.push(row);
  }

  removeRow(index: number): void {
    this.rows.removeAt(index);
  }

  calculateAmount(index: number): void {
    const row = this.rows.at(index);
    const pax = row.get('pax')?.value || 0;
    const price = row.get('price')?.value || 0;
    row.get('amount')?.setValue(pax * price);
  }

  onSubmit(): void {
    if (this.voucherForm.valid) {
      const rawData = this.voucherForm.getRawValue();
      const paymentVoucher: PaymentVoucher = {
        ...rawData,
        amount: rawData.rows.reduce((sum: number, row: any) => sum + row.amount, 0),
      };

      this.paymentVoucherService.createPaymentVoucher(paymentVoucher).subscribe({
        next: () => alert('Payment Voucher created successfully!'),
        error: (err) => alert('Failed to create voucher: ' + err.message),
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
