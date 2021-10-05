import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TrelloRoutingModule} from './trello-routing.module';
import {HomeComponent} from './home/home.component';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    TrelloRoutingModule
  ]
})
export class TrelloModule {
}
