import { Expose } from "class-transformer";
import { IsEmail, IsStrongPassword, IsString, IsNotEmpty, IsOptional } from "class-validator";
export class UpdateUserDto {
    
    @IsEmail()
    @IsOptional()
    @Expose()
    email : string

    @IsStrongPassword({
        minLength: 14,
        minNumbers: 2,
        minSymbols: 1,
        minUppercase:2,
    }, {
        message: "Your Password is cooked...Needs to be at least 14 carac. long, 2 uppercase, 2 numbers and 1 symbols.."
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    password: string

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @Expose()
    firstName: string;
    
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @Expose()
    lastName: string;
}