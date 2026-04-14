import { Local } from "./locals.entity";
export declare class LocalBuilder {
    private local;
    constructor();
    setName(name: string): LocalBuilder;
    setAddress(address: string): LocalBuilder;
    setDescription(description: string): LocalBuilder;
    setPricePerDay(pricePerDay: number): LocalBuilder;
    setLat(lat: number): LocalBuilder;
    setLng(lng: number): LocalBuilder;
    build(): Local;
}
