import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// import {AuthGuard} from "../helper/auth.guard";
import {HomeComponent} from "./home/home.component";
import {BoardsComponent} from "./boards/boards.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path:'board',
    component:BoardsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrelloRoutingModule {
}
