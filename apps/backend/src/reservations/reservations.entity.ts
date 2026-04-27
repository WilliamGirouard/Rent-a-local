import { Expose } from "class-transformer";
import { User } from "src/users/user.entity";
import { Local } from "src/local/locals.entity";
import { AfterInsert, BeforeRemove, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Reservation{

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column({ default: false })
    paid: boolean;

    @ManyToOne(() => User)
    user: User;

    @Expose()
    get userId(): number {
        return this.user.id;
    }

    @ManyToOne(() => Local)
    local: Local;

    @Expose()
    get localId(): number {
       return this.local.id;
    }

    @AfterInsert()
    logInsert() {
        console.log(`Reservation inserted with ID: ${this.id}`);
    }

    @BeforeRemove()
    logRemove() {
        console.log(`Reservation deleted with ID: ${this.id}`);
    }
}
