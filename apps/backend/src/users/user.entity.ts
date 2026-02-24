import { Exclude, Expose } from "class-transformer";
import {Entity, Column, PrimaryGeneratedColumn, AfterInsert, BeforeRemove} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    email: string;
    
    @Column()
    // @Exclude()
    password: string;

    @Column()
    // @Exclude()
    firstName: string;

    @Column()
    // @Exclude()
    lastName: string;

    // @Expose()
    // get fullName() : string {
    //     return `${this.firstName} ${this.lastName}`;
    // }

    @AfterInsert()
    logInsert() {
        console.log(`User inserted with ID : ${this.id}`)
    }

    @BeforeRemove()
    logRemove() {
        console.log(`User deleted with ID : ${this.id} `)
    }

}