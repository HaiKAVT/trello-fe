import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { NavbarComponent } from './navbar/navbar.component';
// import { NavbarBoardHeaderComponent } from './navbar-board-header/navbar-board-header.component';
import { ModalComponent } from './modal/modal.component';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { SideBarComponent } from './side-bar/side-bar/side-bar.component';
// import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    // NavbarComponent,
    // NavbarBoardHeaderComponent,
    ModalComponent,
    SideBarComponent,
    // FooterComponent
  ],
    exports: [
        // NavbarComponent,
        // NavbarBoardHeaderComponent,
        ModalComponent,
        SideBarComponent,
        // FooterComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class ShareModule { }
