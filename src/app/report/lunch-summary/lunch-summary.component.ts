import { Component } from '@angular/core';
import { AgChartOptions } from 'ag-charts-community';
import { ReportService } from '../../services/report/report.service';
import { NgForm } from '@angular/forms';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-lunch-summary',
  templateUrl: './lunch-summary.component.html',
  styleUrl: './lunch-summary.component.css',
})
export class LunchSummaryComponent {
  public chartOptions: AgChartOptions;
  start: any;
  end: any;
  dropdownOpen: boolean = false;
  currentSelect: any;
  month: string = "";
  year: string = "";

  constructor(private reportService: ReportService) {
    this.chartOptions = {
      data: [{ label: 'Jan', value: 2.3 }],
      series: [{ type: 'pie', angleKey: 'avgTemp', legendItemKey: 'month' }],
    };
  }

  ngOnInit() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate() - 1).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;
    this.end = formattedDate;
    this.currentSelect = 'daily';
    this.reportService.getLunchSummaryPie(formattedDate).subscribe({
      next: (response) => {
        console.log(response);
        this.chartOptions = {
          data: this.transformData(response),
          series: [
            {
              type: 'pie',
              angleKey: 'value',
              legendItemKey: 'label',
              sectorLabelKey: 'value',
              sectorLabel: {
                color: 'white',
                fontWeight: 'bold',
                fontSize: 14,
              },
            },
          ],
          title: {
            text: 'Yesterday Lunch Summary',
            fontSize: 18, // Adjust font size for the chart title
          },
          legend: {
            item: {
              label: {
                fontSize: 14, // Adjust font size for legend items
              },
            },
          },
        };
      },
    });
  }

  private transformData(response: any): any[] {
    const keyMappings: { [key: string]: string } = {
      registerAndEat: 'Register and eat',
      registerNotEat: 'Register, not eat',
      unregisterButEat: 'Unregister but eat',
    };

    return Object.keys(response).map((key) => ({
      label: keyMappings[key] || key,
      value: response[key],
    }));
  }

  selectOption(value: string) {
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
    console.log(this.currentSelect);
    let params = new HttpParams();
    let fileName: any;
    let templatePath;
    let fileType: any = type;
    if (this.currentSelect == 'daily') {
      fileName = `lunch_summary_daily_${new Date().getTime()}`;
      templatePath = 'lunch-summary-daily';
      params = params
        .set('templatePath', templatePath)
        .set('fileType', fileType)
        .set('fileName', fileName)
        .set('reportDate', this.end);
    } else if (this.currentSelect == 'monthly') {
      fileName = `lunch_summary_monthly_${new Date().getTime()}`;
      templatePath = 'lunch-summary-monthly';
      params = params
        .set('templatePath', templatePath)
        .set('fileType', fileType)
        .set('fileName', fileName)
        .set('reportDate', this.end);
    } else if (this.currentSelect == 'custom') {
      fileName = `lunch_summary_between_${new Date().getTime()}`;
      templatePath = 'lunch-summary-between';
      params = params
        .set('templatePath', templatePath)
        .set('fileType', fileType)
        .set('fileName', fileName)
        .set('startDate', this.start)
        .set('endDate', this.end);
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

  onStartDateChange(newStartDate: string) {
    this.start = newStartDate;
    console.log('Start Date:', this.start);
  }

  onEndDateChange(newEndDate: string) {
    this.end = newEndDate;
    console.log('End Date:', this.end);
  }

  getSummaryBetween() {
    const formData = this.createFormData();
    const reportObservable = this.currentSelect === 'daily'
      ? this.reportService.getLunchSummaryPie(this.end)
      : this.currentSelect == 'monthly' ? this.reportService.getMonthlySummaryPie(formData) : this.reportService.getLunchSummaryBetween(formData);

    reportObservable.subscribe({
      next: (response) => {
        console.log(response);
        this.chartOptions = this.createChartOptions(response, this.currentSelect === 'daily' ? 'Daily Lunch Summary' : 'Lunch Summary');
      },
    });
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
    }
    return formData;
  }

  // Helper method to create chart options based on the response and title
  private createChartOptions(data: any, title: string): any {
    return {
      data: this.transformData(data),
      series: [
        {
          type: 'pie',
          angleKey: 'value',
          legendItemKey: 'label',
          sectorLabelKey: 'value',
          sectorLabel: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 14,
          },
        },
      ],
      title: {
        text: title,
        fontSize: 18,
      },
      legend: {
        item: {
          label: {
            fontSize: 14,
          },
        },
      },
    };
  }
}
