import { UserDto } from "../../users/dtos/user.dto";
declare class LocalDto {
    id: number;
    name: string;
    address: string;
    pricePerDay: number;
}
export declare class ReservationDto {
    id: number;
    startDate: Date;
    endDate: Date;
    paid: boolean;
    totalPrice: number;
    user: UserDto;
    local: LocalDto;
    user: UserDto;
}
