import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {RecoverPasswordComponent} from './recover-password/recover-password.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AngularMaterialModule} from "./angular-material.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from "@angular/flex-layout";
// import {FooterComponent} from './share/footer/footer.component';
// import {ModalComponent} from './share/modal/modal.component';
// import {NavbarBoardHeaderComponent} from './share/navbar-board-header/navbar-board-header.component';
// import {NavbarComponent} from './share/navbar/navbar.component';
import {FormsModule} from "@angular/forms";
import {ShareModule} from "./share/share.module";
// import {tokenInterceptorProvider} from "./helper/token.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    RecoverPasswordComponent,
    // FooterComponent,
    // ModalComponent,
    // NavbarBoardHeaderComponent,
    // NavbarComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AngularMaterialModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        ShareModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

