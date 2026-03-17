import { Role } from "./roles/roles.enum";
export declare class User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: Role;
    logInsert(): void;
    logRemove(): void;
}
