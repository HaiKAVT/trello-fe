import {Component, Input, OnInit} from '@angular/core';
import {Board} from "../../model/board";
import {UserToken} from "../../model/user-token";
import {AuthenticateService} from "../../service/authenticate.service";
import {Router} from "@angular/router";
import {BoardService} from "../../service/board/board.service";
import {DetailedMember} from "../../model/detailed-member";
import {Tag} from "../../model/tag";

@Component({
  selector: 'app-navbar-board-header',
  templateUrl: './navbar-board-header.component.html',
  styleUrls: ['./navbar-board-header.component.scss']
})
export class NavbarBoardHeaderComponent implements OnInit {
  @Input() currentBoard: Board = {columns: [], owner: {}, title: "", tags: []};
  @Input() canEdit: boolean = false;
  @Input() members: DetailedMember[] = [];
  @Input() tags: Tag[] = [];
  selectedMember: DetailedMember = {boardId: -1, canEdit: false, id: -1, userId: -1, username: ""};
  currentUser: UserToken = this.authenticationService.getCurrentUserValue()
  constructor(private authenticationService:AuthenticateService,
              private router:Router,
              private boardService:BoardService) { }

  ngOnInit(): void {
  }

  updateBoardTitle(){
    if(this.currentBoard.id != null){
      this.boardService.updateBoard(this.currentBoard.id,this.currentBoard).subscribe(data=>{
        this.currentBoard = data
      })
    }
  }
  showDetail(member: DetailedMember) {
    this.selectedMember = member;
    // @ts-ignore
    document.getElementById('user-detail-modal').classList.add('is-active');
  }

  showUserPreview(member: DetailedMember) {
    let elementId = 'user-preview-text-' + member.userId;
    let element = document.getElementById(elementId);
    // @ts-ignore
    element.innerHTML = '@' + member.username;
    // @ts-ignore
    element.classList.remove('is-hidden');
  }
  closeUserPreviews() {
    let elements = document.getElementsByClassName('user-preview-text');
    // @ts-ignore
    for (let element of elements) {
      element.classList.add('is-hidden');
    }
  }

  showAllMembers() {
    let members = document.getElementsByClassName('user-preview');
    // @ts-ignore
    for (let member of members) {
      member.classList.remove('is-hidden');
    }
  }
}
