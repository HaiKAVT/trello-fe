import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "../helper/auth.guard";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {
    path:'',
    // canActivate:[AuthGuard],
    component:HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrelloRoutingModule { }
