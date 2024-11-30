import { Component } from '@angular/core';
import { ReportService } from '../../services/report/report.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-user-avoid-record',
  templateUrl: './user-avoid-record.component.html',
  styleUrl: './user-avoid-record.component.css',
})
export class UserAvoidRecordComponent {
  constructor(private reportService: ReportService) {}
  data: any = [];
  uniqueMeats: any = [];
  uniqueDays: any = [];
  crosstab: any = [];
  dropdownOpen: boolean = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  exportReport(type: string) {
    // "Registered Eat", "Registered Not Eat", "Unregistered But Eat"
    let params = new HttpParams();
    let fileName: any;
    let templatePath;
    let fileType: any = type;
    fileName = `users_avoid_meat_${new Date().getTime()}`;
    templatePath = 'users-avoid-meat';
    params = params
      .set('templatePath', templatePath)
      .set('fileType', fileType)
      .set('fileName', fileName);
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

  createCrosstab() {
    // Get unique meats and days
    this.uniqueMeats = [...new Set(this.data.map((item: any) => item.meat))];
    this.uniqueDays = [...new Set(this.data.map((item: any) => item.day))];

    // Create crosstab matrix
    this.crosstab = this.uniqueMeats.map((meat: any) => {
      const row: any = { meat };
      this.uniqueDays.forEach((day: any) => {
        const record = this.data.find(
          (item: any) => item.meat === meat && item.day === day
        );
        row[day] = record ? record.count : 0;
      });
      return row;
    });
  }

  ngOnInit() {
    this.getUsersAvoidMeat();
  }

  getUsersAvoidMeat() {
    this.reportService.getUserAvoidMeat().subscribe((res) => {
      console.log(res);
      this.data = res;
      this.createCrosstab();
    });
  }
}
