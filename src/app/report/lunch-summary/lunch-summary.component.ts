import { Component } from '@angular/core';
import { AgChartOptions } from 'ag-charts-community';
import { ReportService } from '../../services/report/report.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-lunch-summary',
  templateUrl: './lunch-summary.component.html',
  styleUrl: './lunch-summary.component.css'
})
export class LunchSummaryComponent {
  public chartOptions: AgChartOptions;
  start: any;
  end: any;

  constructor(private reportService: ReportService) {
    this.chartOptions = {
      data: [{ label: 'Jan', value: 2.3 }],
      series: [{ type: 'pie', angleKey: 'avgTemp', legendItemKey: 'month' }],
    };
  }

  getSummaryBetween() {
    console.log(this.start);
    console.log(this.end);
  }
}
