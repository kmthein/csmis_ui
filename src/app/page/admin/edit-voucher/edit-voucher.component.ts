import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentVoucherService } from '../../../services/payment-voucher.service';

@Component({
  selector: 'app-edit-voucher',
  templateUrl: './edit-voucher.component.html',
  styleUrl: './edit-voucher.component.css',
})
export class EditVoucherComponent {
  voucherData: any;
  id!: number;
  order: any;
  totalAmount: any;
  admins: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private voucherService: PaymentVoucherService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id')!);
    this.getVoucherById();
    this.loadAdmins();
  }

  getVoucherById() {
    this.voucherService.getPaymentVoucher(this.id).subscribe((res) => {
      console.log(res);
      this.voucherData = res;
      this.totalAmount = this.voucherData.rows.reduce(
        (total: number, data: any) => {
          console.log(data);

          return total + data.price * data.qty; // Calculate total amount
        },
        0
      );
    });
  }

  loadAdmins(): void {
    this.voucherService.getAllAdmins().subscribe(
      (admins) => {
        this.admins = admins;
      },
      (error) => {
        console.error('Error fetching admins:', error);
      }
    );
  }

  onSubmit() {
    console.log(this.voucherData);
  }
}
