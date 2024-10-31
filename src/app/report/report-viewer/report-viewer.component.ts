import { Component } from '@angular/core';
import { ReportService } from '../../services/report/report.service';

@Component({
  selector: 'app-report-viewer',
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer.component.css']
})
export class ReportViewerComponent {
  pdfUrl: string | null = null;
  loading: boolean = false;  // New loading flag

  constructor(private reportService: ReportService) { }

  viewReport() {
    this.loading = true;  // Start loading
    this.reportService.getRestaurantReport().subscribe(
      response => {
        const blob = new Blob([response], { type: 'application/pdf' });
        this.pdfUrl = URL.createObjectURL(blob);
        this.loading = false;  // Stop loading after setting pdfUrl
      },
      error => {
        console.error('Error fetching report:', error);
        this.loading = false;  // Stop loading on error
      }
    );
  }

  downloadPdf() {
    this.reportService.getRestaurantReport().subscribe(
      response => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'restaurant_report.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      },
      error => {
        console.error('Error downloading report:', error);
      }
    );
  }
}
