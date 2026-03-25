import { User } from "src/users/user.entity";
export declare class Reservation {
    id: number;
    startDate: Date;
    endDate: Date;
    paid: boolean;
    user: User;
    get userId(): number;
}
