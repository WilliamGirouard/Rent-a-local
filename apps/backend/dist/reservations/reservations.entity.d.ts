import { User } from "../users/user.entity";
import { Local } from "src/local/locals.entity";
export declare class Reservation {
    id: number;
    startDate: Date;
    endDate: Date;
    paid: boolean;
    isReserved: boolean;
    user: User;
    get userId(): number;
    local: Local;
    get localId(): number;
    logInsert(): void;
    logRemove(): void;
}
