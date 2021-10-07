import {Component, OnInit} from '@angular/core';
import {NavbarService} from "../../service/navbar/navbar.service";
import {ToastService} from "../../service/toast/toast.service";
import {AuthenticateService} from "../../service/authenticate.service";
import {Router} from "@angular/router";
import {User} from "../../model/user";
import {UserToken} from "../../model/user-token";
import {UserService} from "../../service/user/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentUser: UserToken = {};
  loggedInUser!: User;
  id!: any;
  imgSrc: any;

  constructor(public navbarService: NavbarService,
              private toast: ToastService,
              private authenticateService: AuthenticateService,
              private router: Router,
              private userService: UserService
  ) {
    this.authenticateService.currentUserSubject.subscribe(data => {
      this.currentUser = data;
    })
  }

  ngOnInit(): void {
    this.navbarService.getCurrentUser()
    this.getUserById()
  }

  getUserById() {
    if (this.authenticateService.getCurrentUserValue() != null) {
      this.id = this.authenticateService.getCurrentUserValue().id;
      this.userService.getUserById(this.id).subscribe(user => {
        this.loggedInUser = user;
        if (this.loggedInUser.image == null) {
          this.loggedInUser.image = "https://firebasestorage.googleapis.com/v0/b/trello-h3k.appspot.com/o/h3k.png?alt=media&token=2f7182c6-69b5-47a5-a9ab-5e6ad9e7bd91";
        }
        this.imgSrc = this.navbarService.loggedInUser.image;
      })
    }
  }

  logout() {
    this.authenticateService.logout();
    this.router.navigateByUrl("/");
  }


}
