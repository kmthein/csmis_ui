export interface PaymentVoucherDTO {
    cashierUserId: number; // ID of the logged-in cashier
    approvedByUserId: number; // ID of the admin who approved
    remark: string; // Remarks entered by the user
    receivedBy: string; // Name of the cashier who received the payment
    status: string; // Status of the voucher (e.g., "unpaid", "paid")
    rows: VoucherRowDTO[]; // List of services or rows for the voucher
  }
  
  export interface VoucherRowDTO {
    dt: string; // Date of the service (ISO date string, e.g., "2024-12-01")
    qty: number; // Quantity of the service
    price: number; // Price per pax
    amount: number; // Total amount for the service
    remark?: string; // Optional remarks for this specific service
  }
  