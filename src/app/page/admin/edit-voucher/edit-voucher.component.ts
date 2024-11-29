import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  readonly: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private voucherService: PaymentVoucherService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id')!);
    this.getVoucherById();
    this.loadAdmins();
  }

  getVoucherById() {
    this.voucherService.getPaymentVoucher(this.id).subscribe((res: any) => {
      console.log(res);
      if (res.status == 'PAID') {
        this.readonly = true;
      }
      this.voucherData = res;
      this.totalAmount = this.voucherData.rows.reduce(
        (total: number, data: any) => {
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

  navigateBack() {
    this.router.navigate([`/admin/voucher`]);
  }

  onSubmit() {
    console.log(this.voucherData);
    this.voucherService
      .updatePaymentVoucher(this.voucherData.id, this.voucherData)
      .subscribe((res: any) => {
        console.log(res);
        if (res.status == '200') {
          this.router.navigate([`/admin/voucher`]);
        }
      });
  }
}
