import {Entity, Column, PrimaryGeneratedColumn, AfterInsert, BeforeRemove, OneToMany} from "typeorm";
import { Role } from "./roles/roles.enum";
import { Reservation } from "src/reservations/reservations.entity";
import { Local } from "src/local/locals.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({unique: true})
    email: string;
    
    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    role: Role;

    @AfterInsert()
    logInsert() {
        console.log(`User inserted with ID : ${this.id}`)
    }

    @BeforeRemove()
    logRemove() {
        console.log(`User deleted with ID : ${this.id} `)
    }
    
}