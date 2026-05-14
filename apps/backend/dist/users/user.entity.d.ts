import { Role } from "./roles/roles.enum";
import { Reservation } from "../reservations/reservations.entity";
export declare class User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: Role;
    reservations: Reservation[];
    logInsert(): void;
    logRemove(): void;
}
