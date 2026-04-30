import {Expose} from "class-transformer";
import { Role } from "../roles/roles.enum";


export class UserDto {

    @Expose()
    id : number

    @Expose()
    email : string

    @Expose()   
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    role: Role;

}