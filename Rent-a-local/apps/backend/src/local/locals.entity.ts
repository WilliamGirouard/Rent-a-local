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

    @Column('double precision')
    lat: number;
    
    @Column('double precision')
    lng: number;

    @Column({ default: false }) // ajout de la colonne isReserved pour gerer les exceptions (dans service)
    isReserved: boolean;

    @Column("text", {array : true, default: []})
    images: string[];

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