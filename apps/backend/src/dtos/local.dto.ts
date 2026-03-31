import { Expose } from 'class-transformer';

export class LocalDto {
    @Expose()
    id: number;

    @Expose()
    name: string;

    @Expose()
    address: string;

    @Expose()
    description: string;

    @Expose()
    pricePerDay: number;

    //@Expose()
    //ownerId: number;
}