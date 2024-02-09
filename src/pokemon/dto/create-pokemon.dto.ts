import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

@Schema()
export class CreatePokemonDto {

//Entero, positivo, min 1
@IsInt()
@IsPositive()
@Min(1)
no: number;

@IsString()
@MinLength(1)
name:string

}