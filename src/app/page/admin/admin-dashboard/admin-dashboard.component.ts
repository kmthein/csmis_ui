import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SettingService } from '../../../services/setting.service';
import { DatePipe } from '@angular/common';
import { AgChartOptions } from 'ag-charts-community';
import { ReportService } from '../../../services/report/report.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
  providers: [DatePipe],
})
export class AdminDashboardComponent {
  dueDate: any;
  dueTime: any;
  lastRegisterDay: any;
  lastRegisterTime: any;
  isModalOpen: boolean = false;
  month: string = '';
  year: string = '';
  dataNotFound: boolean = false;
  monthIndex: number = 0;

  public chartOptions: AgChartOptions;

  constructor(
    private settingService: SettingService,
    private datePipe: DatePipe,
    private reportService: ReportService,
    private toastService: ToastrService
  ) {
    this.chartOptions = {
      title: {
        text: `Monthly Cost Report`,
      },
      subtitle: {
        text: 'Cost Report By Department',
      },
      data: [
        {
          month: 'February',
          sales: 140,
          hr: 85,
          marketing: 95,
          it: 115,
          operations: 160,
        },
      ],
      series: [
        {
          type: 'bar',
          xKey: 'month',
          yKey: 'sales',
          yName: 'Sales',
        },
        {
          type: 'bar',
          xKey: 'month',
          yKey: 'hr',
          yName: 'HR',
        },
        {
          type: 'bar',
          xKey: 'month',
          yKey: 'marketing',
          yName: 'Marketing',
        },
        {
          type: 'bar',
          xKey: 'month',
          yKey: 'it',
          yName: 'IT',
        },
        {
          type: 'bar',
          xKey: 'month',
          yKey: 'operations',
          yName: 'Operations',
        },
      ],
    };
  }

  dateSelect() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate() - 1).padStart(2, '0');
    this.monthIndex = +month;
    this.year = year.toString();
    this.month = month.toString();
    const formattedDate = `${year}-${month}-${day}`;
  }

  ngOnInit() {
    this.getSetting();
    this.dateSelect();
    this.getCurrentMonthCostByDepartment();
  }

  getCurrentMonthCostByDepartment() {
    const form = new FormData();
    form.append('month', this.month);
    this.reportService.getLunchCostBarChart(form).subscribe((res: any) => {
      console.log(res);

      const monthNames = [
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

      res.forEach((row: any) => {
        const monthNumber = parseInt(row.month, 10);
        row.month = monthNames[monthNumber - 1];
      });

      // Restructure data by month
      const groupedData: { [key: string]: any } = {};
      res.forEach((row: any) => {
        const month = row.month;
        const department = row.departmentName;
        const cost = row.totalCost;

        if (!groupedData[month]) {
          groupedData[month] = { month };
        }
        groupedData[month][department] = cost;
      });

      // Convert grouped data to array format for the chart
      const chartData = Object.values(groupedData);

      // Extract unique department names
      const departments = Array.from(
        new Set(res.map((row: any) => row.departmentName))
      );

      // Create dynamic series
      const series: any = departments.map((department) => ({
        type: 'bar',
        xKey: 'month',
        yKey: department,
        yName: department,
      }));

      // Set the chart options
      this.chartOptions = {
        title: {
          text: `Monthly Cost Report`,
        },
        subtitle: {
          text: 'Cost Report By Department',
        },
        data: chartData,
        series: series,
      };
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  getSetting() {
    this.settingService.getSettings().subscribe({
      next: (response: any) => {
        console.log(response);
        this.dueDate = response?.lastRegisterDay;
        this.lastRegisterDay = response?.lastRegisterDay;
        this.lastRegisterTime = response?.lastRegisterTime;
        this.dueTime = this.transformTime(response?.lastRegisterTime);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  transformTime(timeString: string): string {
    const date = new Date(`1970-01-01T${timeString}`);
    return this.datePipe.transform(date, 'h:mm a') || '';
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    const formData = new FormData();
    const user = JSON.parse(localStorage.getItem('user')!);
    formData.append('adminId', user?.id);
    formData.append('lastRegisterDay', form.value.lastRegisterDay);
    formData.append('lastRegisterTime', form.value.lastRegisterTime);
    this.settingService.updateLastRegister(formData).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response.status == '200') {
          this.getSetting();
          this.toastService.success('Settings updated successfully');
        } else {
          this.getSetting();
          this.toastService.error('Settings update failed');
        }
        this.closeModal();
      },
    });
  }
}
