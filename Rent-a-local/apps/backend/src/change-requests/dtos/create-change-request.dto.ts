import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmpty } from 'class-validator';

export class CreateChangeRequestDto {
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    newStartDate: Date;

    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    newEndDate: Date;

    @IsInt()
    @IsNotEmpty()
    reservationId: number;

    @IsInt()
    @IsNotEmpty()
    userId: number;
}