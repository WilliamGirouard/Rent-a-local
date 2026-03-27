import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateLocalDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsNumber()
    pricePerDay?: number;
}