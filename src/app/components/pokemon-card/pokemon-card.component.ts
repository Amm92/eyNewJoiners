import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';



@Component({
  selector: 'ey-pokemon-card',
  imports: [MatCardModule, MatButtonModule, RouterModule, CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss'
})
export class PokemonCardComponent {

  public pokemon = input.required<any>();

  public readonly pokemonImage = computed (
    () => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${this.pokemon().id}.png`
  )

}
