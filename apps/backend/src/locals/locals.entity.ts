import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from 'src/users/user.entity';
import { Expose } from 'class-transformer';

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

    @ManyToOne(() => User)
    owner: User;

    @Expose()
    get ownerId(): number {
        return this.owner.id;
    }
}