import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, Delete, Query } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { paginatioDto } from 'src/common/dtos/pagination.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PokemonService {
private defaultLimit: number;
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonMOdel: Model<Pokemon>,
    private readonly configService: ConfigService
  ){
    this.defaultLimit = configService.get<number>('defaultLimit');
    console.log("Valor del env",process.env.DEFAULT_LIMIT);
   console.log(this.defaultLimit);
  }
  
  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name;
   try{ 
      const pokemon = await this.pokemonMOdel.create(createPokemonDto);
      return pokemon;
   }catch (error){
    console.log(error)
    this.handleExceptions(error);
  }
   
   
  }

  findAll(PAginationDto: paginatioDto) {
    //console.log(queryParameters)
    //const {limit=+process.env.DEFAULT_LIMIT,offset=0} = PAginationDto
   //const {limit= this.configService.get<number>('defaultlimit'),offset=0} = PAginationDto
   const {limit= this.defaultLimit,offset=0} = PAginationDto
 
    return this.pokemonMOdel.find()
    .limit (limit)
    .skip(offset)
    .sort({
      no: 1
    })
    .select('-__v')
    //return `This action returns all pokemon`;
  }

  async findOne(term: string) {
   
  let pokemon: Pokemon
    if(!isNaN(+term)){
      pokemon =await this.pokemonMOdel.findOne({no: term})
    }
//MongoId
    if( isValidObjectId(term)){
      pokemon =await this.pokemonMOdel.findById(term);
    }
//Name
if(!pokemon){
  pokemon =await this.pokemonMOdel.findOne({name: term.toLowerCase().trim()})
}



if(!pokemon){
  throw new NotFoundException("Pokemon no ubicable por nombre, id, no")
}

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
try{
    const pokemon = await this.findOne(term);
    if(updatePokemonDto.name){
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
      //const updatePoken= await pokemon.updateOne(updatePokemonDto,{new: true})
      //return updatePoken;
      await pokemon.updateOne(updatePokemonDto);


      
      return {...pokemon.toJSON(),...updatePokemonDto};
    }
  }catch (error){
    console.log(error)
    this.handleExceptions(error);
    }
  }

  async remove(id: string) {
  //  const pokemon = await this.findOne(id);
    //await pokemon.deleteOne();
    //return {id};
    //const result= await this.pokemonMOdel.findByIdAndDelete(id);
    const {deletedCount} = await this.pokemonMOdel.deleteOne({_id: id});
    if(deletedCount===0){
      throw new BadRequestException(`Pokemon con el id ${id} no existe`)
    }
    return ;

    //return pokemon;
  }

  private handleExceptions(error:any){
    if(error.code===11000){
      throw new BadRequestException(`Registro ya existe en la Base de Datos. No se dara la alta ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error);
    throw new InternalServerErrorException('No puedo crear el Pokemn');

  }
}
