import { Voucher } from "./Voucher";

export interface PaymentVoucher {
    cashierUserId: number; // Get from localStorage
    approvedByUserId: number; // Selected from admin
    remark: string; // Remark input by cashier
    receivedBy: string; // Received by input
    status: string; // 'Paid' or 'Unpaid'
    rows: Voucher[]; // List of VoucherRow
  }