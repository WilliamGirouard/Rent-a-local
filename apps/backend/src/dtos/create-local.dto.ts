import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLocalDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    pricePerDay: number;

    @IsInt()
    @IsNotEmpty()
    ownerId: number;
}