import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticateService} from "../service/authenticate.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-z0-9]+$')]),
      password: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-z0-9]+$')])
    }
  )
  show: Boolean = false;
  validation_message = {
    userName: [
      {type: 'required', message: 'Trường bắt buộc'},
      {type: 'pattern', message: 'Chỉ nhập chữ hoặc số'}
    ],
    password: [
      {type: 'required', message: 'Trường bắt buộc'},
      {type: 'pattern', message: 'Chỉ nhập chữ hoặc số'}
    ]
  }

  constructor(private authenticationService: AuthenticateService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit() {

    this.authenticationService.login(this.loginForm.get('userName')?.value, this.loginForm.get('password')?.value)
      .subscribe(() => {
        this.router.navigate(['/'])
      })
  }

  showPassword() {
    this.show = !this.show
  }
}
