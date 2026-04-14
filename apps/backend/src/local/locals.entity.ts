import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, AfterInsert, BeforeRemove } from "typeorm";
import { User } from "src/users/user.entity";
import { Reservation } from "src/reservations/reservations.entity";

@Entity()
export class Local {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    description: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    pricePerDay: number;

    @ManyToOne(() => User, (user) => user.locals)
    owner: User;

    @OneToMany(() => Reservation, (reservation) => reservation.local)
    reservations: Reservation[];

    @AfterInsert()
    logInsert() {
        console.log(`Local inserted with ID: ${this.id}`);
    }

    @BeforeRemove()
    logRemove() {
        console.log(`Local deleted with ID: ${this.id}`);
    }
}