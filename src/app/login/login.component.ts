import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-z0-9]+$')]),
      password: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-z0-9]+$')])
    }
  )

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit() {

  }

  showPassword(){

  }
}
