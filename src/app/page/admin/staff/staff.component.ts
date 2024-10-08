import { Component } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { initFlowbite } from 'flowbite';
import { Subject } from 'rxjs';
import { Config } from 'datatables.net';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.css',
})
export class StaffComponent {
  columns: any = [
    { key: 'staffId', label: 'Staff ID' },
    { key: 'name', label: 'Name' },
    { key: 'doorLogNo', label: 'Door Log No' },
    { key: 'division', label: 'Division' },
    { key: 'department', label: 'Department' },
    { key: 'team', label: 'Team' },
    { key: 'status', label: 'Status' },
  ];
  staffs: any = [];
  isModalOpen: boolean = false;
  selectedFile: File | null = null;

  constructor(private userService: UserService) {}

  importExcel() {
    console.log(this.selectedFile);
    const user = JSON.parse(localStorage.getItem('user')!);
    const adminId = user?.id;

    this.userService.importFromExcel(this.selectedFile!, adminId).subscribe({
      next: (response) => {
        if (response.message) {
          this.toggleModal();
          this.getAllStaffs();
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

  // DataTables settings
  dtoptions: Config = {};
  dttrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this.getAllStaffs();
    this.dtoptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      paging: true,
    };
  }

  ngOnDestroy(): void {
    // Unsubscribe the DataTable trigger when component is destroyed
    this.dttrigger.unsubscribe();
  }

  getAllStaffs(): void {
    if ($.fn.DataTable.isDataTable('#data-table')) {
      $('#data-table').DataTable().destroy();
    }
    this.userService.getAllStaffs().subscribe((data) => {
      console.log(data);
      this.staffs = data;
      setTimeout(() => {
        this.dttrigger.next(null); // Trigger DataTables to render
      }, 100); // Ensure this runs after DOM update
    });
  }
}
