import { Routes } from '@angular/router';
import { PokedexComponent } from './views/pokedex/pokedex.component';

export const routes: Routes = [
    {path:"pokedex", component:PokedexComponent},
    {path: '**', redirectTo: 'pokedex', pathMatch: 'full'}
    ];
