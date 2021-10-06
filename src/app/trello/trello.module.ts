import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TrelloRoutingModule} from './trello-routing.module';
import {HomeComponent} from './home/home.component';
import {ShareModule} from "../share/share.module";
import { BoardsComponent } from './boards/boards.component';


@NgModule({
  declarations: [
    HomeComponent,
    BoardsComponent,
  ],
    imports: [
        CommonModule,
        TrelloRoutingModule,
        ShareModule
    ]
})
export class TrelloModule {
}
