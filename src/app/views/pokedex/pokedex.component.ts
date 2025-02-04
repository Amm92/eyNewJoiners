import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonCardComponent } from "../../components/pokemon-card/pokemon-card.component";
import { Subscription } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'ey-pokedex',
  imports: [PokemonCardComponent, MatPaginatorModule],
  templateUrl: './pokedex.component.html',
  styleUrl: './pokedex.component.scss'
})
export class PokedexComponent implements OnInit, OnDestroy{

  public pokemons: any[] = [];
  private _subscription!: Subscription;
  pageIndex = 0;
  message!: string;

  constructor(private _pokemonService: PokemonService){

  }

  ngOnInit(){
   this.getPokemons();
  }

  public getPokemons(){
    this._subscription =
      this._pokemonService.getAll(this.pageIndex + 1).subscribe(
        (pokemonsResp: any) =>{
          this.pokemons = pokemonsResp;
          console.log(this.pokemons);
        }
      );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  handlePageEvent(e: PageEvent) {
    this._subscription.unsubscribe();
    this.pageIndex = e.pageIndex;
    this.getPokemons();
  }

}
