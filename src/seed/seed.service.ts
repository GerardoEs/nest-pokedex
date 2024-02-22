import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonMOdel: Model<Pokemon>,
    private readonly http:AxiosAdapter
  ){}
 // private readonly axios:AxiosInstance=axios;
  async executeSeed() {
    /* forma 1 y 2 para borrar
    await this.pokemonMOdel.deleteMany({}); //Cuidado borra todo
    const {data} = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')
    const insertPromisesArray=[];

    data.results.forEach(async({name, url})=>{ 
      //console.log({name,url})
      const segments = url.split('/');
      const no:number = +segments[segments.length-2]
     // console.log({name,no})
      //const pokemon = await this.pokemonMOdel.create({name,no})
      insertPromisesArray.push(this.pokemonMOdel.create({name,no}));
      await Promise.all(insertPromisesArray);
    });
*/
await this.pokemonMOdel.deleteMany({}); //Cuidado borra todo
   
const pokemonToInsert :{ name: string, no: number}[]=[];
const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=600')
  
data.results.forEach(async({name, url})=>{ 
   
const segments = url.split('/');
const no:number = +segments[segments.length-2];
pokemonToInsert.push({name,no});
})
 await this.pokemonMOdel.insertMany(pokemonToInsert);
    //return data.results;
    return "Se ejecuto el seed";
  }

  
}
