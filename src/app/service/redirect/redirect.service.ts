import {Injectable} from '@angular/core';
import {Card} from "../../model/card";
import {Attachment} from "../../model/attachment";
import {AttachmentService} from "../attachment/attachment.service";
import {User} from "../../model/user";
import {UserService} from "../user/user.service";
import {AuthenticateService} from "../authenticate.service";

@Injectable({
  providedIn: 'root'
})
export class RedirectService {
  modalClass: string = '';
  card: Card = {content: "", id: 0, position: 0, title: ""};
  attachments: Attachment[] = [];
  user: User = {};

  constructor(private attachmentService: AttachmentService,
              private authenticationService: AuthenticateService,
              private userService: UserService) {
  }

  showModal(card: Card) {
    this.card = card;
    this.getUser();
    this.getAttachments();
    // this.getComments();
    this.modalClass = 'is-active';
  }

  // private getComments() {
  //   this.commentCardService.findAllByCardId(this.card.id).subscribe(comments => {
  //     // @ts-ignore
  //     this.comments = comments;
  //   })
  // }

  private getAttachments() {
    this.attachmentService.getAttachmentByCard(<number>this.card.id).subscribe(attachments => {
        this.attachments = attachments;
      }
    )
  }

  showCardModal() {
    this.modalClass = 'is-active';
  }

  hideCardModal() {
    this.modalClass = '';
  }

  private getUser() {
    let userId = this.authenticationService.getCurrentUserValue().id;
    if (userId != null) {
      this.userService.getUserById(userId).subscribe(user => this.user = user);
    }
  }
}
