import { Component } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { initFlowbite } from 'flowbite';
import { Subject } from 'rxjs';
import { Config } from 'datatables.net';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.css'
})
export class StaffComponent {
  staffs: any = [];
  isModalOpen: boolean = false;

  constructor(private userService: UserService) {}

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
    initFlowbite();
  }

  // DataTables settings
  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject<any>();

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };
    this.dtTrigger.next(null); // Trigger DataTables to render
    this.getAllStaffs();
  }

  ngOnDestroy(): void {
    // Unsubscribe the event trigger to avoid memory leaks
    this.dtTrigger.unsubscribe();
  }

  getAllStaffs(): void {
    this.userService.getAllStaffs().subscribe(
      (data) => {
        console.log(data);
        this.staffs = data;
      }
    )
  }
}
