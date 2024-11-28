import { Component } from '@angular/core';
import { PaymentVoucherService } from '../../../services/payment-voucher.service';
import { ActionButtonRendererComponent } from '../../../shared/component/action-button-renderer/action-button-renderer.component';

@Component({
  selector: 'app-voucher-list',
  templateUrl: './voucher-list.component.html',
  styleUrl: './voucher-list.component.css',
})
export class VoucherListComponent {
  pagination = true;
  paginationPageSize = 20;
  paginationPageSizeSelector = [10, 20, 30];

  colDefs: any = [
    {
      valueGetter: (params: any) => params.node.rowIndex + 1,
      flex: 0.5,
    },
    { field: 'invoiceFor', headerName: 'Description', flex: 1, filter: true },
    { field: 'cashier', headerName: 'Cashier', flex: 1.5, filter: true },
    { field: 'receivedBy', headerName: 'Received By', flex: 1, filter: true },
    {
      field: 'approvedBy',
      headerName: 'Approver Manager',
      flex: 1,
      filter: true,
    },
    { field: 'status', headerName: 'Status', flex: 1, filter: true },
    { field: 'totalAmount', headerName: 'Total Amount', flex: 1, filter: true },
    {
      headerName: 'Actions',
      cellRenderer: ActionButtonRendererComponent,
      flex: 0.8,
      cellRendererParams: {
        type: 'voucher',
      },
    },
  ];
  vouchers: any = [];

  constructor(private voucherService: PaymentVoucherService) {}

  ngOnInit() {
    this.getAllVouchers();
  }

  getAllVouchers() {
    this.voucherService.getPaymentVouchers().subscribe((res) => {
      console.log(res);
      this.vouchers = res;
    });
  }
}
