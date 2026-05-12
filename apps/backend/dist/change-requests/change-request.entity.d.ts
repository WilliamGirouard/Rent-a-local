import { Reservation } from 'src/reservations/reservations.entity';
import { User } from 'src/users/user.entity';
import { ChangeRequestStatus } from './status/status.enum';
export declare class ChangeRequest {
    id: number;
    newStartDate: Date;
    newEndDate: Date;
    status: ChangeRequestStatus;
    reservation: Reservation;
    user: User;
}
