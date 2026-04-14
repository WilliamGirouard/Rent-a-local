import { IsString, IsNumber, Min, IsOptional } from "class-validator";

export class UpdateLocalDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsOptional()
    @Min(0)
    pricePerDay?: number;
}