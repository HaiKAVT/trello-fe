import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import {HttpClientModule , HTTP_INTERCEPTORS} from "@angular/common/http";
import {JwtInterceptor} from "./Authentication/jwt.interceptor";
import {ErrorInterceptor} from "./Authentication/error.interceptor";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { TrelloHomeComponent } from './trello/trello-home/trello-home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    RecoverPasswordComponent,
    TrelloHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor , multi: true
  },
    {
      provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor , multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
