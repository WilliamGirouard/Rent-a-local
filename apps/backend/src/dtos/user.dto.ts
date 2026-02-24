import { Expose, Exclude } from "class-transformer";

@Exclude()
export class UserDto {

    @Expose()
    id : number

    @Expose()
    email : string

    @Expose()   
    firstName: string;

    @Expose()
    lastName: string;

    @Expose()
    get fullName() : string {
        return `${this.firstName} ${this.lastName}`;
    }
}