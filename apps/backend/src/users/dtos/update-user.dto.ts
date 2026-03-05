import { IsEmail, isString, isNotEmpty, IsOptional } from "class-validator";

export class updateUserDto{
    
    @IsOptional()
    id:number

    @IsEmail()
    @IsOptional()
    email:string

    @IsOptional()
    password:string

    @IsOptional()
    admin:boolean
}