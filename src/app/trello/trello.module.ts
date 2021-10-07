import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TrelloRoutingModule} from './trello-routing.module';
import {HomeComponent} from './home/home.component';
import {ShareModule} from "../share/share.module";
import {BoardsComponent} from './boards/boards.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DragDropModule} from "@angular/cdk/drag-drop";
import { BoardViewComponent } from './board-view/board-view.component';


@NgModule({
  declarations: [
    HomeComponent,
    BoardsComponent,
    BoardViewComponent,
  ],
  imports: [
    CommonModule,
    TrelloRoutingModule,
    ShareModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule
  ]
})
export class TrelloModule {
}
