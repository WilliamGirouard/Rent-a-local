import { Entity, Column, PrimaryGeneratedColumn, OneToMany, AfterInsert, BeforeRemove } from "typeorm";
import { Reservation } from "../reservations/reservations.entity";

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

    @Column()
    lat: number;

    @Column()
    lng: number;
    
    // SEULEMENT cette relation - PAS de ManyToOne vers User
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