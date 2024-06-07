export class PaymentHistoryResponseDto {
    paymentId: number;
    userId: number;
    paymentAmount: number;
    paymentReference: string;
    usageStartDate: Date;
    usageEndDate: Date;
    paymentDate: Date;
  }