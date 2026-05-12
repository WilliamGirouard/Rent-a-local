import { IsBoolean } from "class-validator";

export class UpdateReservationPaymentDto {
  @IsBoolean()
  paid: boolean;
}