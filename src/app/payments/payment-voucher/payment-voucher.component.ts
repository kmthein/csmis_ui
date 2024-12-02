import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PaymentVoucherService } from '../../services/payment-voucher.service';
import { HolidayService } from '../../services/admin/holiday.service';
import { OrderService } from '../../services/order.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-voucher',
  templateUrl: './payment-voucher.component.html',
  styleUrls: ['./payment-voucher.component.css'],
})
export class PaymentVoucherComponent implements OnInit {
  selectedDate: string = '';
  totalAmount: number = 0;
  voucherData: any = {
    voucherNo: '',
    paymentDate: '',
    cateringServiceName: '',
    invoicePeriod: '',
    services: [],
    approvedBy: '', // Admin selected for approval
    remarks: '', // Remarks entered by the user
    status: 'UNPAID', // Default status (paid or unpaid)
    receivedBy: '',
  };
  voucherExist: boolean = false;
  holidays: string[] = []; // To store holiday dates
  admins: any[] = []; // List of admins
  cashier: any = {}; // Current logged-in user (Cashier)
  isModalOpen: boolean = false; // Modal open/close state
  restaurants: any[] = [];
  order: any = {};
  orderedDates: any = [];

  constructor(
    private voucherService: PaymentVoucherService,
    private holidayService: HolidayService,
    private orderService: OrderService,
    private toast: ToastrService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  voucherGenerateAgain() {
    this.voucherExist = false;
  }

  isDateDisabled(date: string): boolean {
    return (
      this.orderedDates.includes(date) ||
      this.holidays.includes(date) ||
      this.isWeekend
    );
  }

  isWeekend(date: Date): boolean {
    const day = date.getDay(); // Get the day of the week (0 = Sunday, 6 = Saturday)
    return day === 0 || day === 6; // Return true for weekends
  }

  dateFilter = (date: Date | null): boolean => {
    if (!date) return true; // Allow null dates
    const formattedDate = this.formatDateToYYYYMMDD(date);
    const isWeekend = this.isWeekend(date);
    const isPublicHoliday = this.holidays.includes(formattedDate);
    const isOrderedDate = this.orderedDates.includes(formattedDate);
    return !(isWeekend || isPublicHoliday || isOrderedDate);
  };

  formatDateToYYYYMMDD(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  ngOnInit(): void {
    const today = new Date();
    this.selectedDate = today.toISOString().split('T')[0];
    this.loadAdmins();
    this.setReceivedBy(); // Automatically set receivedBy field
    this.getAlreadyHaveVoucherDate();
    this.holidayService.getAllHolidays().subscribe((data: any) => {
      this.holidays = data.map((holiday: any) => holiday.date); // Assuming holiday.date is in 'yyyy-MM-dd' format
      // this.calculateWeek();
    });
  }

  getAlreadyHaveVoucherDate() {
    this.voucherService.getAlreadyHaveVoucherDate().subscribe((res: any) => {
      const dates: any = [];
      res.map((data: any) => {
        const date = new Date(data.dt);
        dates.push(date.toISOString().split('T')[0]);
      });
      this.orderedDates = dates;

      this.cdr.detectChanges();
    });
  }

  loadRestaurants(): void {
    this.voucherService.getAllRestaurants().subscribe(
      (data) => {
        this.restaurants = data;
      },
      (error) => {
        console.error('Error fetching restaurants:', error);
      }
    );
  }
  loadAdmins(): void {
    this.voucherService.getAllAdmins().subscribe(
      (admins) => {
        this.admins = admins;
        this.voucherData.approvedBy = admins[0].name;
      },
      (error) => {
        console.error('Error fetching admins:', error);
      }
    );
  }

  onChangeApprove(event: any) {
    this.voucherData.approvedBy = event.target.value;
  }

  setReceivedBy(): void {
    const user = JSON.parse(localStorage.getItem('user')!);
    if (user) {
      this.cashier = user; // Assign the cashier as the logged-in user
    }
  }

  calculateWeek() {
    if (!this.selectedDate) {
      return;
    }

    const selected = new Date(this.selectedDate);
    const dayOfWeek = selected.getDay();

    // Ensure Monday stays in the current week
    const diffToMonday =
      dayOfWeek === 0 ? -6 : dayOfWeek === 1 ? 0 : 1 - dayOfWeek;

    const startOfWeek = new Date(selected);
    startOfWeek.setDate(selected.getDate() + diffToMonday);

    const tempWeekDates: string[] = [];
    for (let i = 0; i < 5; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      const formattedDate = day.toISOString().split('T')[0];

      console.log(formattedDate);

      // Only include dates that are not holidays
      if (!this.holidays.includes(formattedDate)) {
        tempWeekDates.push(formattedDate);
      }
    }

    this.voucherData.services = []; // Reset services
    this.calculateVoucherData(tempWeekDates);
    const date = new Date(this.selectedDate);

    // Manually format the date as YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    // Call the order service with the manually formatted date
    this.orderService.getOrderByDate(formattedDate).subscribe((res) => {
      console.log(res);
      this.order = res;
    });
  }

  calculateVoucherData(weekDates: string[]) {
    if (!this.selectedDate) return;
    // this.voucherService.getRestaurantByDate(this.selectedDate).subscribe(
    //   (restaurantName) => {
    //     this.voucherData.cateringServiceName = restaurantName;
    //     this.calculateWeek(); // Recalculate the week details
    //   },
    //   (error) => {
    //     console.error('Error fetching restaurant:', error);
    //     this.voucherData.cateringServiceName = 'No restaurant available'; // Handle when no restaurant is found
    //   }
    // );
    this.voucherData.services = [];
    this.totalAmount = 0;
    this.voucherData.voucherNo = 'CS001-' + weekDates[0].replace(/-/g, '');
    this.voucherData.paymentDate = new Date().toISOString().split('T')[0];
    this.voucherData.invoicePeriod = `${weekDates[0]} ~ ${
      weekDates[weekDates.length - 1]
    }`;
    console.log(this.voucherData.invoicePeriod);
    weekDates.forEach((date) => {
      this.voucherService.getOrderQuantity(date).subscribe((quantity) => {
        console.log(quantity);

        this.voucherService.getTotalCost(date).subscribe((totalCost) => {
          const pricePerPax = totalCost;
          const amount = quantity * pricePerPax;

          this.voucherData.services = this.order.rows.map((row: any) => ({
            ...row, // Keep original row properties
            date: row.lunchDate, // Add or override the `date`
            pricePerPax, // Add price per pax
            amount, // Add calculated amount
          }));

          // this.voucherData.services.push({
          //   date: date,
          //   quantity: quantity,
          //   totalCost: totalCost,
          //   pricePerPax: pricePerPax,
          //   amount: amount,
          // });

          this.totalAmount += amount;
          this.voucherExist = true;
        });
      });
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  onDateChange(event: any) {
    this.selectedDate = event.target.value;
    this.calculateWeek();
  }

  submitVoucher() {
    if (
      !this.voucherData.approvedBy ||
      this.voucherData.services.length === 0
    ) {
      this.toast.info('Please complete the form with all required data.');
      return;
    }

    const paymentVoucherDTO = {
      cashierUserId: this.cashier.id,
      approvedByName: this.voucherData.approvedBy,
      remark: this.voucherData.remarks,
      receivedBy: this.voucherData.receivedBy,
      status: this.voucherData.status,
      totalAmount: this.totalAmount,
      rows: this.voucherData.services.map((service: any) => ({
        dt: service.date,
        qty: service.quantity,
        price: service.pricePerPax,
        amount: service.amount,
        remark: '', // Add any remarks if needed
      })),
    };

    // Call the API to save the voucher
    this.voucherService
      .saveVoucher(this.dateStringFormat(this.selectedDate), paymentVoucherDTO)
      .subscribe(
        (response) => {
          this.toast.success('Payment voucher saved successfully!');
          this.resetForm(); // Reset the form after saving
          this.voucherExist = false;
          this.router.navigate([`/admin/voucher`]);
        },
        (error) => {
          console.error('Error saving payment voucher:', error);
          this.toast.error(
            'An error occurred while saving the voucher. Please try again.'
          );
        }
      );
  }

  dateStringFormat(param: string) {
    const date = new Date(this.selectedDate);

    // Manually format the date as YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  resetForm() {
    this.selectedDate = '';
    this.totalAmount = 0;
    this.voucherData = {
      voucherNo: '',
      paymentDate: '',
      cateringServiceName: '',
      invoicePeriod: '',
      services: [],
      approvedBy: '',
      remarks: '',
      status: 'UNPAID',
    };
  }
}
