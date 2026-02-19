import { IsString, IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    
    @IsEmail()
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
    password: string

    @IsString()
    @IsNotEmpty()
    firstName: string;
    
    @IsString()
    @IsNotEmpty()
    lastName: string;
    
}