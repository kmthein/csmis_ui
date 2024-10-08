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
    { key: 'doorlogNo', label: 'Door Log No' },
    { key: 'division', label: 'Division' },
    { key: 'dept', label: 'Department' },
    { key: 'team', label: 'Team' },
    { key: 'status', label: 'Status' },
    { key: 'action', label: 'Action' },
  ];
  staffs: any = [];
  isModalOpen: boolean = false;
  selectedFile: File | null = null;

  constructor(private userService: UserService) {}

  importExcel() {
    console.log(this.selectedFile);
    const user = JSON.parse(localStorage.getItem('user')!);
    const adminId = user?.id;
    this.userService.importFromExcel(this.selectedFile!, adminId);
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
      pageLength: 5,
      processing: true,
      paging: false,
    };
  }

  getAllStaffs(): void {
    this.userService.getAllStaffs().subscribe((data) => {
      console.log(data);
      this.staffs = data;
      this.dttrigger.next(null); // Trigger DataTables to render
    });
  }
}
