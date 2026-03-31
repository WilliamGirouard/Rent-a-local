import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty } from "class-validator";

export class CreateReservationDto {
    
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    startDate: Date;

    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    endDate: Date;

    @IsInt()
    @IsNotEmpty()
    userId: number;

    //@IsInt()
    //@IsNotEmpty()
    //localId:number;
}