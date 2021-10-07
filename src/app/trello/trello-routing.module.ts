import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
// import {AuthGuard} from "../helper/auth.guard";
import {HomeComponent} from "./home/home.component";
import {BoardsComponent} from "./boards/boards.component";
import {BoardViewComponent} from "./board-view/board-view.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path:'boards',
    component:BoardsComponent
  },
  {
    path:'board/:id',
    component:BoardViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrelloRoutingModule {
}
