import { IsString, IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class CreateUserDto {
    
    @IsEmail()
    email : string

    @IsStrongPassword({
        minLength: 8,
        minNumbers: 2,
        minSymbols: 1,
        minUppercase:1,
    }, {
        message: "Password needs at least: \n8 caracters\n1 Uppercase letter\n2 numbers\n1 symbol"
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