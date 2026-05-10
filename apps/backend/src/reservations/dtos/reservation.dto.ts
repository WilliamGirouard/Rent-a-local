import {Expose, Type} from "class-transformer";
import { UserDto } from "src/users/dtos/user.dto";

class LocalDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    address: string;

    @Expose()
    pricePerDay: number;
}

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
    userId: number;

    @Expose()
    localId: number;

    @Expose()
    @Type(() => LocalDto)
    local: LocalDto;

    @Expose()
    @Type(() => UserDto)
    user: UserDto;
}