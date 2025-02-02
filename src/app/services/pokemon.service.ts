import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private _apiurl = environment.API_URL;

  constructor(private _http: HttpClient) { }

  public getAll(page: number): Observable<any>{
    if(page !== 0){
      --page;
    }

    page = Math.max(0,page);

    return this._http.get(`${this._apiurl}pokemon?offset=${page*20}&limit=20`).pipe(
      map((resp:any) =>{
        const simplePokemons: any[] = resp.results.map(
          (pokemon:any) => ({
            id:pokemon.url.split('/').at(-2) ?? '',
            name: pokemon.name,
            total: resp.count
          })
        );
        return simplePokemons

      })
    );
  }

  public getPokemon(number:number): Observable<any>{
    return this._http.get(`${this._apiurl}pokemon/${number}`).pipe(
      map(
        (resp:any) =>{
          const pokemon = {
            name: resp.name,
            types: resp.types.map((type:any)=> type.type.name),
            ability: resp.abilities[0].ability.name,
            number: resp.id,
            moves: resp.moves.slice(0, 4).map((move:any) => move.move.name)
          }
          return pokemon;
        }
      )
    );
  }
}
