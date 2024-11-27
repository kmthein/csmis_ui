import { Component } from '@angular/core';
import { ReportService } from '../../services/report/report.service';

@Component({
  selector: 'app-staff-lunch-record',
  templateUrl: './staff-lunch-record.component.html',
  styleUrl: './staff-lunch-record.component.css'
})
export class StaffLunchRecordComponent {
  start: any;
  end: any;
  dropdownOpen: boolean = false;
  currentSelect: any;
  month: string = "";
  year: string = "";
  dataNotFound: boolean = false;
  monthIndex: number = 0;
  users: any = [];
  type: any = "Registered Eat";

  userType: any = ["Registered Eat", "Registered Not Eat", "Unregistered But Eat"]

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
    this.currentSelect = "daily";
    this.dateSelect();
    this.getDailyDataYesterday();
  }

  getDailyDataYesterday() {
    const form = new FormData();
    form.append("date", this.end);
    this.reportService.getStaffLunchRecord(this.type, this.currentSelect, form)?.subscribe(res => {
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
    const reportObservable = this.reportService.getStaffLunchRecord(this.type, this.currentSelect, formData);
    reportObservable?.subscribe({
      next: (res: any) => {
        console.log(res);        
        this.users = res;
      }
    })
  }
}
