import { Role } from "../roles/roles.enum";
export declare class UpdateUserDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: Role;
}
