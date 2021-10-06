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
  show: Boolean = false;
  validation_message = {
    username: [
      {type: 'required', message: 'Trường bắt buộc'},
      {type: 'pattern', message: 'Chỉ nhập chữ hoặc số'}
    ],
    password: [
      {type: 'required', message: 'Trường bắt buộc'},
      {type: 'pattern', message: 'Chỉ nhập chữ hoặc số'}
    ]
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const {userName, password} = this.loginForm.value;

  }

  showPassword() {
    this.show = !this.show
  }
}
