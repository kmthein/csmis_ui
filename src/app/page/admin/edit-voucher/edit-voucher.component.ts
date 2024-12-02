import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentVoucherService } from '../../../services/payment-voucher.service';
import { HttpParams } from '@angular/common/http';
import { ReportService } from '../../../services/report/report.service';

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
  dropdownOpen: boolean = false;
  reportDate!: string;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  exportReport(type: string) {
    let params = new HttpParams();
    let fileName: any;
    let templatePath;
    let fileType: any = type;
      fileName = `payment_voucher_${new Date().getTime()}`;
      templatePath = 'payment-voucher';
      params = params
        .set('templatePath', templatePath)
        .set('fileType', fileType)
        .set('fileName', fileName)
        .set('reportDate', this.reportDate);
    this.reportService.generateReport(params).subscribe({
      next: (response) => {
        const blob = new Blob([response], {
          type:
            fileType === 'pdf'
              ? 'application/pdf'
              : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        if (fileType == 'excel') {
          fileType = 'xlsx';
        }
        a.download = `${fileName}.${fileType}`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Report download failed', err);
      },
    });
    this.toggleDropdown();
  }

  constructor(
    private route: ActivatedRoute,
    private voucherService: PaymentVoucherService,
    private router: Router,
    private reportService: ReportService
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
      this.reportDate = res.rows[0].dt;
      
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
