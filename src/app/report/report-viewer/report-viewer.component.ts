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
    const date = new Date();
    const fileName = `restaurant_report_${new Date().getTime()}`;
    const templatePath = 'restaurant2';
    let fileType: any = "excel"; // or 'excel' for Excel report
    this.reportService.generateReport(templatePath, fileType, fileName).subscribe({
      next: (response) => {
        const blob = new Blob([response], {
          type: fileType === 'pdf' ? 'application/pdf' : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        if(fileType == 'excel') {
          fileType = 'xlsx';
        }
        a.download = `${fileName}.${fileType}`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Report download failed', err);
      }
    });
  }

  downloadPdf() {
    
  }
}
