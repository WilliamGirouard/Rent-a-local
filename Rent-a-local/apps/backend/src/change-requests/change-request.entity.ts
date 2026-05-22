import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Reservation } from 'src/reservations/reservations.entity';
import { User } from 'src/users/user.entity';
import { ChangeRequestStatus } from './status/status.enum';


@Entity()
export class ChangeRequest {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    newStartDate: Date;

    @Column()
    newEndDate: Date;

    @Column({ default: ChangeRequestStatus.PENDING })
    status: ChangeRequestStatus;

    @ManyToOne(() => Reservation)
    reservation: Reservation;

    @ManyToOne(() => User)
    user: User;
}