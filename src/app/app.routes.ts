import { Routes } from '@angular/router';
import { PokedexComponent } from './views/pokedex/pokedex.component';
import { PokemonDetailsComponent } from './views/pokemon-details/pokemon-details.component';

export const routes: Routes = [
    {path:"pokedex", component:PokedexComponent},
    {path:'pokedex/pokemon/:id', component: PokemonDetailsComponent},
    {path: '**', redirectTo: 'pokedex', pathMatch: 'full'}
    ];
