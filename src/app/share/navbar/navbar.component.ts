import {Component, OnInit} from '@angular/core';
import {NavbarService} from "../../service/navbar/navbar.service";
import {ToastService} from "../../service/toast/toast.service";
import {AuthenticateService} from "../../service/authenticate.service";
import {Router} from "@angular/router";
import {User} from "../../model/user";
import {UserToken} from "../../model/user-token";
import {UserService} from "../../service/user/user.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs/operators";

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
  isSubmitted = false;
  selectedImage: any | undefined = null;

  constructor(public navbarService: NavbarService,
              private toast: ToastService,
              private authenticateService: AuthenticateService,
              private router: Router,
              private storage: AngularFireStorage,
              private userService: UserService,
              private toastService: ToastService
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
          this.loggedInUser.image = "https://i.pinimg.com/originals/57/fb/31/57fb3190d0cc1726d782c4e25e8561e9.png";
        }
        this.imgSrc = this.navbarService.loggedInUser.image;
      })
    }
  }

  logout() {
    this.authenticateService.logout();
    this.router.navigateByUrl("/login");
  }

  closeModalUpdate() {
    // @ts-ignore
    document.getElementById('modal-update-user').classList.remove('is-active')
  }

  openModalUpdate() {
    // @ts-ignore
    document.getElementById("modal-update-user").classList.add('is-active')
    this.getUserById()
  }

  updateUserInfo() {
    this.isSubmitted = true;
    if (this.selectedImage != null) {
      // @ts-ignore
      const filePath = `${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.imgSrc = url;
            this.loggedInUser.image = url;
            this.userService.updateById(this.id, this.loggedInUser).subscribe(() => {
                this.toastService.showMessage("Sửa thành công", 'is-success');
                this.navbarService.getCurrentUser();
                this.closeModalUpdate();
              },
              () => {
                this.toastService.showMessage("Thất bại !", 'is-danger');
              });
          });
        })).subscribe();
    }
  }
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = event.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      if (this.selectedImage != null) {
        const filePath = `${this.selectedImage.name.split('.').splice(0, -1).join('.')}_${new Date().getTime()}`;
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(url => {
              this.imgSrc = url;
            });
          })).subscribe();
      }
    } else {
      this.selectedImage = null;
    }
  }


}
