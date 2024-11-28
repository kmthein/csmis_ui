export interface Voucher {
    date: string;
    noOfPax: number;
    amount: number;
    price:number;
    
  }

// export class PaymentVoucher {
//   cashierUserId: number; // Get from localStorage
//   approvedByUserId: number; // Selected from admin
//   remark: string; // Remark input by cashier
//   receivedBy: string; // Received by input
//   status: string; // 'Paid' or 'Unpaid'
//   rows: VoucherRow[]; // List of VoucherRow
// }