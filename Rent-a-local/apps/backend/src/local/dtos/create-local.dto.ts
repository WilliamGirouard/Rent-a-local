import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsNumber, Min, IsAlpha, IsArray, IsOptional } from "class-validator";

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

    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    pricePerDay: number;

    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    lat: number;
    
    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    lng: number;
}