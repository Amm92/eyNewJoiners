import { Component, computed, OnDestroy, OnInit, signal } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { CapitalizePipe } from "../../pipes/capitalize.pipe";
import { MatButtonModule } from '@angular/material/button';
import { TypeColorDirective } from '../../directives/type-color.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ey-pokemon-details',
  imports: [CommonModule, CapitalizePipe, MatButtonModule, RouterModule, TypeColorDirective],
  templateUrl: './pokemon-details.component.html',
  styleUrl: './pokemon-details.component.scss'
})
export class PokemonDetailsComponent implements OnInit, OnDestroy{

  public pokemonID!: number;
  public pokemonData = signal<any>(null);
  private _subscriptions: Subscription[] = [];
  public readonly pokemonImage = computed (
      () => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemonID}.png`
    )

  constructor(private _pokemonService: PokemonService, private _activatedRoute: ActivatedRoute){
    this._subscriptions.push(this._activatedRoute.params.subscribe((params: any) =>{
      this.pokemonID = params['id'];
    }));
  }
  ngOnInit(): void {
   this._getPokemonData();
  }
  ngOnDestroy(): void {
    for(const sub of this._subscriptions){
      sub.unsubscribe();
    }
  }

  private _getPokemonData(){
    this._subscriptions.push(
      this._pokemonService.getPokemon(this.pokemonID).subscribe(
        (resp: any) =>{
          this.pokemonData.set(resp);
        }
      )
    );
  }
}
