import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { FooterComponent } from './share/footer/footer.component';
import { ModalComponent } from './share/modal/modal.component';
import { NavbarBoardHeaderComponent } from './share/navbar-board-header/navbar-board-header.component';
import { NavbarComponent } from './share/navbar/navbar.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    RecoverPasswordComponent,
    FooterComponent,
    ModalComponent,
    NavbarBoardHeaderComponent,
    NavbarComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
