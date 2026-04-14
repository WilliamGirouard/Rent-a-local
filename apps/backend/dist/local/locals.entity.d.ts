import { Reservation } from "../reservations/reservations.entity";
export declare class Local {
    id: number;
    name: string;
    address: string;
    description: string;
    pricePerDay: number;
    reservations: Reservation[];
    logInsert(): void;
    logRemove(): void;
}
