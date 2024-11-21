import { HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReportService } from '../../services/report/report.service';
import { AgChartOptions } from 'ag-charts-community';

@Component({
  selector: 'app-department-cost',
  templateUrl: './department-cost.component.html',
  styleUrl: './department-cost.component.css'
})
export class DepartmentCostComponent {
  public chartOptions: AgChartOptions;
  start: any;
  end: any;
  dropdownOpen: boolean = false;
  currentSelect: any;
  month: string = "";
  year: string = "";
  dataNotFound: boolean = false;
  monthIndex: number = 0;

  constructor(private reportService: ReportService) {
    this.chartOptions = {
      title: {
        text: `Monthly Cost Report`,
      },
      subtitle: {
        text: "Cost Report By Department",
      },
      data: [
        {
          month: "February",
          sales: 140,
          hr: 85,
          marketing: 95,
          it: 115,
          operations: 160,
        },
      ],
      series: [
        {
          type: "bar",
          xKey: "month",
          yKey: "sales",
          yName: "Sales",
        },
        {
          type: "bar",
          xKey: "month",
          yKey: "hr",
          yName: "HR",
        },
        {
          type: "bar",
          xKey: "month",
          yKey: "marketing",
          yName: "Marketing",
        },
        {
          type: "bar",
          xKey: "month",
          yKey: "it",
          yName: "IT",
        },
        {
          type: "bar",
          xKey: "month",
          yKey: "operations",
          yName: "Operations",
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
    this.end = formattedDate;
  }
  

  ngOnInit() {
    this.currentSelect = 'monthly';
    this.dateSelect();
    this.getCurrentMonthCostByDepartment();
  }
  
  getCurrentMonthCostByDepartment() {
    const form = new FormData();
    form.append("month", this.month);
    this.reportService.getLunchCostBarChart(form).subscribe((res: any) => {
      this.importBarChartData(res);
    });
  } 

  selectOption(value: string) {
    this.dateSelect();
    this.currentSelect = value;
    this.getSummaryBetween();
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
        .set('month', this.month)
        .set('year', this.year);
    } else if (this.currentSelect == 'custom') {
      fileName = `lunch_summary_between_${new Date().getTime()}`;
      templatePath = 'lunch-summary-between';
      params = params
        .set('templatePath', templatePath)
        .set('fileType', fileType)
        .set('fileName', fileName)
        .set('startDate', this.start)
        .set('endDate', this.end);
    } else if (this.currentSelect == 'yearly') {
      console.log("yearly");
      
    }
    this.reportService.generateReport(params).subscribe({
      next: (response: any) => {
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
      error: (err: any) => {
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

  importBarChartData(res: any) {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    // Determine if the response contains monthly or yearly data
  
    // Convert month numbers to names if monthly data is present
    if (this.currentSelect !== "yearly" ) {
      res.forEach((row: any) => {
        const monthNumber = parseInt(row.month, 10);
        row.month = monthNames[monthNumber - 1];
      });
    }
  
    // Restructure data by month or year
    const groupedData: { [key: string]: any } = {};
    res.forEach((row: any) => {
      // Determine the key to use for 'date'
      let customDate;
      if(this.currentSelect == "custom") {
        customDate = `${row?.start} to ${row?.end}`;
      }
      const normalizedDate = this.currentSelect == "yearly" 
        ? row?.year 
        : this.currentSelect == "daily"  
        ? row?.date 
        : this.currentSelect == "custom"
        ? customDate
        : row?.month;
    
      // Ensure the normalizedDate exists in groupedData
      if (!groupedData[normalizedDate]) {
        groupedData[normalizedDate] = { date: normalizedDate };
      }
    
      // Add department costs to the grouped data
      const department = row.departmentName;
      const cost = row.totalCost;
    
      groupedData[normalizedDate][department] = cost;
    });
    
    // Convert grouped data to an array for AG Charts
    const chartData = Object.values(groupedData);
  
    // Extract unique department names
    const departments = Array.from(
      new Set(res.map((row: any) => row.departmentName))
    );
  
    // Create dynamic series
    const series: any = departments.map((department) => ({
      type: "bar",
      xKey: "date", // Use year or month for the x-axis key
      yKey: department,
      yName: department,
    }));
  
    // Set the chart options
    this.chartOptions = {
      title: {
        text: `${this.currentSelect == "yearly"  ? "Yearly" : this.currentSelect == "daily" ? "Daily" : this.currentSelect == "custom" ? "" : "Monthly"} Cost Report ${this.currentSelect == "custom" && this.start ? `Between ${this.start} and ${this.end}` : ""}`,
      },
      subtitle: {
        text: "Cost Report By Department",
      },
      data: chartData,
      series: series,
    };
  }

  getSummaryBetween() {
    this.dataNotFound = false;
    const formData = this.createFormData();
    const reportObservable = this.reportService.getLunchCostBarChart(formData);

    reportObservable.subscribe({
      next: (response: any) => {
        console.log(response);
        this.importBarChartData(response);
      },
    });
  }

  private createFormData(): FormData {
    const formData = new FormData();
    if (this.currentSelect === 'daily') {
      formData.append('date', this.end);
    } else if (this.currentSelect === 'custom') {
      formData.append('start', this.start);
      formData.append('end', this.end);
    } else if (this.currentSelect === 'monthly') {
      formData.append('month', this.month);
      formData.append('year', this.year);
    } else if (this.currentSelect == 'yearly') {
      formData.append('year', this.year);
    }
    return formData;
  }
}
