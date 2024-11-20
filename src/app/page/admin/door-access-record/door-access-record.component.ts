import { Component } from '@angular/core';
import { ExcelService } from '../../../services/admin/excel.service';
import { Router } from '@angular/router';
import { DoorAccessRecordService } from '../../../services/admin/door-access-record.service';
import { initFlowbite } from 'flowbite';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-door-access-record',
  templateUrl: './door-access-record.component.html',
  styleUrl: './door-access-record.component.css',
  providers: [DatePipe]
})
export class DoorAccessRecordComponent {
  pagination = true;
  paginationPageSize = 20;
  paginationPageSizeSelector = [10, 20, 30];

  colDefs: any = [
    {
      valueGetter: (params: any) => params.node.rowIndex + 1,
      flex: 0.5,
    },
    { field: 'name', headerName: 'Name', flex: 1.5, filter: true },
    { field: 'doorLogNo', headerName: 'Door Log No', flex: 1, filter: true },
    { field: 'location', headerName: 'Location', flex: 1, filter: true },
    { field: 'dateTime', headerName: 'Date/Time', flex: 1, filter: true },
    { field: 'status', headerName: 'Status', flex: 1, filter: true },
  ];
  doorLogs: any = [];
  isModalOpen: boolean = false;
  selectedFile: File | null = null;
  selectedStaff: any = {};
  isLoading: boolean = false;

  constructor(
    private doorAccessRecordService: DoorAccessRecordService,
    private excelService: ExcelService,
    private datePipe: DatePipe
  ) {}

  importExcel() {
    this.isLoading = true;
    const user = JSON.parse(localStorage.getItem('user')!);
    const adminId = user?.id;

    this.excelService
      .importFromExcel(this.selectedFile!, adminId, 'doorLogs')
      .subscribe({
        next: (response) => {
          if (response.message) {
            this.getAllDoorAccessRecords();
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

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
    initFlowbite();
  }

  ngOnInit(): void {
    this.getAllDoorAccessRecords();
  }

  ngOnDestroy(): void {}

  getAllDoorAccessRecords(): void {
    this.doorAccessRecordService.getAllDoorAccessRecords().subscribe((data) => {
      const doorAccess = data.map((d: any) => {
        return { ...d, dateTime: this.datePipe.transform(d.dateTime, 'M/d/yyyy h:mm a') };
      });
      this.doorLogs = doorAccess;
      console.log(doorAccess);
      
    });
  }
}



