import {Expose, Type} from "class-transformer";

class LocalDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    address: string;
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
}