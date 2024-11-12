import { Component } from '@angular/core';
import { ReportService } from '../../../services/report/report.service';
import { AgCharts } from 'ag-charts-angular';
// Chart Options Type Interface
import { AgChartOptions } from 'ag-charts-community';
import { FontSize } from 'ckeditor5';
@Component({
  selector: 'app-lunch-summary-pie',
  templateUrl: './lunch-summary-pie.component.html',
  styleUrl: './lunch-summary-pie.component.css',
})
export class LunchSummaryPieComponent {
  public chartOptions: AgChartOptions;

  constructor(private reportService: ReportService) {
    this.chartOptions = {
      data: [{ label: 'Jan', value: 2.3 }],
      series: [{ type: 'pie', angleKey: 'avgTemp', legendItemKey: 'month' }],
    };
  }

  ngOnInit() {
    this.getMonthlyLunchPie();
  }

  getMonthlyLunchPie() {
    this.reportService.getMonthlySummaryPie().subscribe({
      next: (response) => {
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
            text: 'Monthly Lunch Summary',
            fontSize: 18, // Adjust font size for the chart title
          },
          legend: {
            item: {
              label: {
                fontSize: 14, // Adjust font size for legend items
              }
            }
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

  getLunchSummaryDaily(date: Date) {
    const formData = new FormData();
    formData.append('date', new Date().toString());
  }
}
