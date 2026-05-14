import { Expose } from "class-transformer";
import { IsBoolean } from "class-validator";

export class UpdateReservationPaymentDto {
  @IsBoolean()
  @Expose()
  paid: boolean;
}