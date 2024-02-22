import { Schema } from "@nestjs/mongoose";
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

@Schema()
export class paginatioDto {
@IsOptional()
@IsPositive()
@IsNumber()
@Min(1)
limit?: number;

@IsOptional()
@IsPositive()
@IsNumber()
offset?: number;

}