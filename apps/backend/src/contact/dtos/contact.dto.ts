import { IsNotEmpty, IsEmail, IsString, IsNumber } from "class-validator";

export class ContactDto {

    @IsEmail()
    @IsNotEmpty()
    email : string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsNumber()
    @IsNotEmpty()
    reservationId: number;

    @IsString()
    @IsNotEmpty()
    message: string;
}