import { Expose, Type } from "class-transformer";
import { LocalDto } from "src/local/dtos/local.dto";
import { UserDto } from "src/users/dtos/user.dto";

export class ReservationDto {
  @Expose()
  id: number;

  @Expose()
  startDate: Date;

  @Expose()
  endDate: Date;

  @Expose()
  paid: boolean;

  @Expose()
  totalPrice: number;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;

  @Expose()
  @Type(() => LocalDto)
  local: LocalDto;
}