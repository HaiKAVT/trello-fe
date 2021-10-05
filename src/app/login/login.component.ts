import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {User} from "../model/user";
import {AuthenticationService} from "../service/authentication/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({
    username: new FormControl(),
    password: new FormControl()
    }

  )

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {

  }

}
