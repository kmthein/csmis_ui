import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { ReportService } from '../../services/report/report.service';
import { error } from 'jquery';
import { ActionButtonRendererComponent } from '../../shared/component/action-button-renderer/action-button-renderer.component';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-mail-on-user',
  templateUrl: './mail-on-user.component.html',
  styleUrl: './mail-on-user.component.css',
})
export class MailOnUserComponent {
  users: any = [];
  pagination = true;
  paginationPageSize = 20;
  paginationPageSizeSelector = [10, 20, 30];
  dropdownOpen: boolean = false;
  constructor(
    private reportService: ReportService,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    const isClickInside = this.el.nativeElement.contains(event.target);

    if (!isClickInside) {
      this.dropdownOpen = false;
    }
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  exportReport(type: string) {
    const fileName = `mail_on_report_${new Date().getTime()}`;
    const templatePath = 'mail-user';
    let fileType: any = type;
    const params = new HttpParams()
    .set('templatePath', templatePath)
    .set('fileType', fileType)
    .set('fileName', fileName);
    this.reportService
      .generateReport(params)
      .subscribe({
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

  ngOnInit() {
    this.getMailOnUsers();
  }

  colDefs: any = [
    {
      valueGetter: (params: any) => params.node.rowIndex + 1,
      flex: 0.5,
    },
    { field: 'name', headerName: 'Name', flex: 3, filter: true },
    { field: 'email', headerName: 'Email', flex: 3, filter: true },
    { field: 'division', headerName: 'Division', flex: 3, filter: true },
    { field: 'department', headerName: 'Department', flex: 3, filter: true },
    { field: 'team', headerName: 'Team', flex: 3, filter: true },
  ];

  getMailOnUsers() {
    this.reportService.getMailOnUsers().subscribe({
      next: (response) => {
        console.log(response);
        this.users = response;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
