import { IsNotEmpty, IsEmail, IsString, IsNumber } from "class-validator";

export class ContactDto {

    @IsEmail()
    @IsNotEmpty()
    email : string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    message: string;
}