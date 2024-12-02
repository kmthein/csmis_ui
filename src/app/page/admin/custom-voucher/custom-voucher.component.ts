import { Component } from '@angular/core';
import { ReportService } from '../../../services/report/report.service';
import { HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-custom-voucher',
  templateUrl: './custom-voucher.component.html',
  styleUrl: './custom-voucher.component.css',
})
export class CustomVoucherComponent {
  start: any;
  end: any;
  voucherExist: boolean = false;
  voucherData: any;
  id!: number;
  order: any;
  totalAmount: any;
  admins: any[] = [];
  readonly: boolean = false;
  dropdownOpen: boolean = false;
  reportDate!: string;
  currentDate!: string;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  navigateBack() {
    this.router.navigate([`/admin/voucher`]);
  }

  exportReport(type: string) {
    let params = new HttpParams();
    let fileName: any;
    let templatePath;
    let fileType: any = type;
    fileName = `paid_voucher_list_${new Date().getTime()}`;
    templatePath = 'paid-voucher';
    params = params
      .set('templatePath', templatePath)
      .set('fileType', fileType)
      .set('fileName', fileName)
      .set('startDate', this.start)
      .set('endDate', this.end);
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

  constructor(private reportService: ReportService, private router: Router) {}

  dateSelect() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate() - 1).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    this.currentDate = formattedDate;
  }

  ngOnInit() {
    this.dateSelect();
  }

  onSubmit() {
    const form = new FormData();
    form.append('startDate', this.start);
    form.append('endDate', this.end);
    this.reportService.getVoucherBetweenTwoDates(form).subscribe((res: any) => {
      console.log(res);
      this.voucherData = res;
      this.voucherExist = true;
      this.totalAmount = res.reduce((total: number, data: any) => {
        console.log(data);
        return total + data.amount; // Calculate total amount
      }, 0);
    });
  }
}
