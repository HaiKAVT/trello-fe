import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TrelloRoutingModule} from './trello-routing.module';
import {HomeComponent} from './home/home.component';
import {ShareModule} from "../share/share.module";


@NgModule({
  declarations: [
    HomeComponent
  ],
    imports: [
        CommonModule,
        TrelloRoutingModule,
        ShareModule
    ]
})
export class TrelloModule {
}
