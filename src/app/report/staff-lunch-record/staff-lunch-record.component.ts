import { Component } from '@angular/core';
import { ReportService } from '../../services/report/report.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-staff-lunch-record',
  templateUrl: './staff-lunch-record.component.html',
  styleUrl: './staff-lunch-record.component.css',
})
export class StaffLunchRecordComponent {
  start: any;
  end: any;
  dropdownOpen: boolean = false;
  currentSelect: any;
  month: string = '';
  year: string = '';
  dataNotFound: boolean = false;
  monthIndex: number = 0;
  users: any = [];
  type: any = 'Registered Eat';

  userType: any = [
    'Registered Eat',
    'Registered Not Eat',
    'Unregistered But Eat',
  ];

  dateSelect() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate() - 1).padStart(2, '0');
    this.monthIndex = +month;
    this.year = year.toString();
    this.month = month.toString();
    const formattedDate = `${year}-${month}-${day}`;
    this.end = formattedDate;
  }

  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.currentSelect = 'daily';
    this.dateSelect();
    this.getDailyDataYesterday();
  }

  getDailyDataYesterday() {
    const form = new FormData();
    form.append('date', this.end);
    this.reportService
      .getStaffLunchRecord(this.type, this.currentSelect, form)
      ?.subscribe((res) => {
        console.log(res);
      });
  }

  pagination = true;
  paginationPageSize = 20;
  paginationPageSizeSelector = [10, 20, 30];

  colDefs: any = [
    {
      valueGetter: (params: any) => params.node.rowIndex + 1,
      flex: 0.5,
    },
    { field: 'name', headerName: 'Name', flex: 3, filter: true },
    { field: 'date', headerName: 'Date', flex: 3, filter: true },
    { field: 'doorLogNo', headerName: 'Doorlog', flex: 3, filter: true },
    { field: 'department', headerName: 'Department', flex: 3, filter: true },
    { field: 'team', headerName: 'Team', flex: 3, filter: true },
  ];

  selectOption(value: string) {
    this.dateSelect();
    this.currentSelect = value;
  }

  months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  onChangeType(event: any) {
    this.type = event.target.value;
    console.log(this.type);
  }

  onChangeMonth(event: any) {
    this.month = event.target.value;
  }

  onChangeYear(event: any) {
    this.year = event.target.value;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  exportReport(type: string) {
    // "Registered Eat", "Registered Not Eat", "Unregistered But Eat"
    let params = new HttpParams();
    let fileName: any;
    let templatePath;
    let fileType: any = type;
    if (this.type == 'Registered Eat') {
      fileName = `registered_ate_${new Date().getTime()}`;
      templatePath = 'registered-ate-users';
      if (this.currentSelect == 'daily') {
        fileName = `registered_ate_daily_${new Date().getTime()}`;
        params = params
          .set('templatePath', templatePath)
          .set('fileType', fileType)
          .set('fileName', fileName)
          .set('date', this.end)
          .set('timeRangeType', 'daily');
      } else if (this.currentSelect == 'monthly') {
        fileName = `registered_ate_monthly_${new Date().getTime()}`;
        params = params
          .set('templatePath', templatePath)
          .set('fileType', fileType)
          .set('fileName', fileName)
          .set('month', this.month)
          .set('year', this.year)
          .set('timeRangeType', 'monthly');
      } else if (this.currentSelect == 'custom') {
        fileName = `registered_ate_custom_${new Date().getTime()}`;
        params = params
          .set('templatePath', templatePath)
          .set('fileType', fileType)
          .set('fileName', fileName)
          .set('startDate', this.start)
          .set('endDate', this.end)
          .set('timeRangeType', 'weekly');
      } else if (this.currentSelect == 'yearly') {
        fileName = `registered_ate_yearly_${new Date().getTime()}`;
        params = params
          .set('templatePath', templatePath)
          .set('fileType', fileType)
          .set('fileName', fileName)
          .set('year', this.year)
          .set('timeRangeType', 'yearly');
      }
    } else if(this.type == 'Registered Not Eat') {
      fileName = `registered_not_ate_${new Date().getTime()}`;
      templatePath = 'registered-not-eat-users';
      if (this.currentSelect == 'daily') {
        fileName = `registered_not_ate_daily_${new Date().getTime()}`;
        params = params
          .set('templatePath', templatePath)
          .set('fileType', fileType)
          .set('fileName', fileName)
          .set('date', this.end)
          .set('timeRangeType', 'daily');
      } else if (this.currentSelect == 'monthly') {
        fileName = `registered_not_ate_monthly_${new Date().getTime()}`;
        params = params
          .set('templatePath', templatePath)
          .set('fileType', fileType)
          .set('fileName', fileName)
          .set('month', this.month)
          .set('year', this.year)
          .set('timeRangeType', 'monthly');
      } else if (this.currentSelect == 'custom') {
        fileName = `registered_not_ate_custom_${new Date().getTime()}`;
        params = params
          .set('templatePath', templatePath)
          .set('fileType', fileType)
          .set('fileName', fileName)
          .set('startDate', this.start)
          .set('endDate', this.end)
          .set('timeRangeType', 'weekly');
      } else if (this.currentSelect == 'yearly') {
        fileName = `registered_not_ate_yearly_${new Date().getTime()}`;
        params = params
          .set('templatePath', templatePath)
          .set('fileType', fileType)
          .set('fileName', fileName)
          .set('year', this.year)
          .set('timeRangeType', 'yearly');
      }
    } else if(this.type == 'Unregistered But Eat') {
      fileName = `unregistered_ate_${new Date().getTime()}`;
      templatePath = 'unregistered-ate-user';
      if (this.currentSelect == 'daily') {
        fileName = `unregistered_ate_daily_${new Date().getTime()}`;
        params = params
          .set('templatePath', templatePath)
          .set('fileType', fileType)
          .set('fileName', fileName)
          .set('date', this.end)
          .set('timeRangeType', 'daily');
      } else if (this.currentSelect == 'monthly') {
        fileName = `unregistered_ate_monthly_${new Date().getTime()}`;
        params = params
          .set('templatePath', templatePath)
          .set('fileType', fileType)
          .set('fileName', fileName)
          .set('month', this.month)
          .set('year', this.year)
          .set('timeRangeType', 'monthly');
      } else if (this.currentSelect == 'custom') {
        fileName = `unregistered_ate_custom_${new Date().getTime()}`;
        params = params
          .set('templatePath', templatePath)
          .set('fileType', fileType)
          .set('fileName', fileName)
          .set('startDate', this.start)
          .set('endDate', this.end)
          .set('timeRangeType', 'weekly');
      } else if (this.currentSelect == 'yearly') {
        fileName = `unregistered_ate_yearly_${new Date().getTime()}`;
        params = params
          .set('templatePath', templatePath)
          .set('fileType', fileType)
          .set('fileName', fileName)
          .set('year', this.year)
          .set('timeRangeType', 'yearly');
      }
    }

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

  private createFormData(): FormData {
    const formData = new FormData();
    if (this.currentSelect === 'daily') {
      formData.append('date', this.end);
    } else if (this.currentSelect === 'custom') {
      formData.append('startDate', this.start);
      formData.append('endDate', this.end);
    } else if (this.currentSelect === 'monthly') {
      formData.append('month', this.month);
      formData.append('year', this.year);
    } else if (this.currentSelect == 'yearly') {
      formData.append('year', this.year);
    }
    return formData;
  }

  getLunchRecord() {
    const formData = this.createFormData();
    const reportObservable = this.reportService.getStaffLunchRecord(
      this.type,
      this.currentSelect,
      formData
    );
    reportObservable?.subscribe({
      next: (res: any) => {
        console.log(res);
        this.users = res;
      },
    });
  }
}
