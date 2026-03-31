import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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

    @Column()
    pricePerDay: number;


    // ====================> C'est la réservation qui s'en occupent, pas le local
    //@ManyToOne(() => User)
    //owner: User;
//
    //@Expose()
    //get ownerId(): number {
    //    return this.owner.id;
    //}
}