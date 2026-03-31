import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLocalDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsNumber()
    @IsNotEmpty()
    pricePerDay: number;

    


    /*
    //@IsInt() ==> C'est la réservation ==> Va voir le diagramme UML draw.io
    //ownerId: number;


    id:number
    capacity:number
    adress:string
    lat:double
    long:double
    equipmentList:List<EquipmentEnum> ==> Enumeration => inspire toi de roles user
    
    =====> PS: Regarde le diagramme UML draw.io (dans le word en épinglé sur Discord)
    */
}