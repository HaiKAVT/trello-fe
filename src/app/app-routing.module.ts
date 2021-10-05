import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./Authentication/auth-guard";
import {LoginComponent} from "./login/login.component";


const routes: Routes = [{
  path: 'login',
 component: LoginComponent
},
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./trello/trello.module').then(module => module.TrelloModule)
  },
  {
    path: 'trello',
    canActivate: [AuthGuard],
    loadChildren: () => import('./trello/trello.module').then(module => module.TrelloModule)
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
