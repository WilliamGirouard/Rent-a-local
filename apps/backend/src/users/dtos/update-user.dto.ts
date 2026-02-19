import { IsEmail, isString, isNotEmpty, IsOptional } from "class-validator";

export class updateUserDto{
    
    @IsEmail()
    @IsOptional()
    email:string

    @IsOptional()
    password:string
}