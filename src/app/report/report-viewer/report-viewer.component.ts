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

  downloadPdf() {
    
  }
}
