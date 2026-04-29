import { LocalDto } from "src/local/dtos/local.dto";
import { UserDto } from "src/users/dtos/user.dto";
export declare class ReservationDto {
    id: number;
    startDate: Date;
    endDate: Date;
    paid: boolean;
    totalPrice: number;
    user: UserDto;
    local: LocalDto;
}
