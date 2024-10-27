import { Component } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { initFlowbite } from 'flowbite';
import { filter, Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ActionButtonRendererComponent } from '../../../shared/component/action-button-renderer/action-button-renderer.component';
import { Router } from '@angular/router';
import { ExcelService } from '../../../services/admin/excel.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.css',
})
export class StaffComponent {
  pagination = true;
  paginationPageSize = 20;
  paginationPageSizeSelector = [10, 20, 30];

  colDefs: any = [
    {
      valueGetter: (params: any) => params.node.rowIndex + 1,
      flex: 0.5,
    },
    { field: 'staffId', headerName: 'Staff ID', flex: 1, filter: true },
    { field: 'name', headerName: 'Name', flex: 1.5, filter: true },
    { field: 'doorLogNo', headerName: 'Door Log No', flex: 1, filter: true },
    { field: 'division', headerName: 'Division', flex: 1, filter: true },
    { field: 'department', headerName: 'Department', flex: 1, filter: true },
    { field: 'team', headerName: 'Team', flex: 1, filter: true },
    { field: 'status', headerName: 'Status', flex: 1, filter: true },
    {
      headerName: 'Actions',
      cellRenderer: ActionButtonRendererComponent,
      flex: 0.8,
      cellRendererParams: {
        type: "staff"
      },
    },
  ];
  staffs: any = [];
  isModalOpen: boolean = false;
  selectedFile: File | null = null;
  selectedStaff: any = {};
  isLoading: boolean = false;

  constructor(
    private userService: UserService,
    private excelService: ExcelService,
    private router: Router
  ) {}

  addNewStaff() {
    this.router.navigate(['/admin/staff/new']);
  }

  onEdit(staff: any) {
    this.selectedStaff = staff; // Store the selected staff's data
    this.toggleModal(); // Open the modal
  }

  importExcel() {
    this.isLoading = true;
    const user = JSON.parse(localStorage.getItem('user')!);
    const adminId = user?.id;

    this.excelService
      .importFromExcel(this.selectedFile!, adminId, 'users')
      .subscribe({
        next: (response) => {
          if (response.message) {
            this.getAllStaffs();
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
    this.getAllStaffs();
  }

  ngOnDestroy(): void {}

  getAllStaffs(): void {
    this.userService.getAllStaffs().subscribe((data) => {
      console.log(data);
      this.staffs = data;
    });
  }
}
