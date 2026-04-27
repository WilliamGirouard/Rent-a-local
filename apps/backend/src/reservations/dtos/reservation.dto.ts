import {Expose} from "class-transformer";
import { User } from "src/users/user.entity";
import { ManyToOne } from "typeorm";


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
}