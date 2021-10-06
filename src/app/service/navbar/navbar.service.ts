import { Injectable } from '@angular/core';
import {AuthenticateService} from "../authenticate.service";
import {UserService} from "../user/user.service";
import {User} from "../../model/user";

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  loggedInUser!:User;

  constructor(private authenticationService: AuthenticateService,
              private userService: UserService) { }

  getCurrentUser(){
    if(this.authenticationService.getCurrentUserValue() !=null){
      let loggedInUserID = this.authenticationService.getCurrentUserValue().id;
      if(loggedInUserID!=null){
        this.userService.getUserById(loggedInUserID).subscribe(loginUser=>{
          this.loggedInUser = loginUser;
        });
      }
    }
  }
}
