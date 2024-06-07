import { User } from "src/entities/user.entity";

export class ConsumptionHistoryResponseDto {
  consumptionId: number;
  user: User;
  consumptionDate: Date;
  consumptionAmount: number;
  consumptionWay: string;
  consumptionType: string;
}
