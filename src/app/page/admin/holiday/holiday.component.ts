import { Component } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { ActionButtonRendererComponent } from '../../../shared/component/action-button-renderer/action-button-renderer.component';
import { HolidayService } from '../../../services/admin/holiday.service';
import { ExcelService } from '../../../services/admin/excel.service';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrl: './holiday.component.css',
})
export class HolidayComponent {
  isModalOpen = false;
  pagination = true;
  paginationPageSize = 20;
  paginationPageSizeSelector = [10, 20, 30];

  constructor(
    private excelService: ExcelService,
    private holidayService: HolidayService
  ) {}

  ngOnInit() {
    this.getAllHolidays();
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
    initFlowbite();
  }

  colDefs: any = [
    {
      valueGetter: (params: any) => params.node.rowIndex + 1,
      flex: 0.5,
    },
    { field: 'name', headerName: 'Name', flex: 3, filter: true },
    { field: 'date', headerName: 'Date', flex: 3, filter: true },
    {
      headerName: 'Actions',
      cellRenderer: ActionButtonRendererComponent,
      flex: 3,
      cellRendererParams: {
        getAllHolidays: this.getAllHolidays.bind(this), 
      },
    },
  ];
  holidays: any = [];
  selectedFile: File | null = null;
  isLoading: boolean = false;

  importExcel() {
    this.isLoading = true;
    const user = JSON.parse(localStorage.getItem('user')!);
    const adminId = user?.id;

    this.excelService
      .importFromExcel(this.selectedFile!, adminId, 'holidays')
      .subscribe({
        next: (response) => {
          if (response.message) {
            this.getAllHolidays();
            this.isLoading = false;
            this.toggleModal();
          }
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0]; // Get the selected file
  }

  getAllHolidays() {
    this.holidayService.getAllHolidays().subscribe((data) => {
      this.holidays = data;
    });
  }
}
