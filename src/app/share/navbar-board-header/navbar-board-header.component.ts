import {Component, Input, OnInit} from '@angular/core';
import {Board} from "../../model/board";
import {UserToken} from "../../model/user-token";
import {AuthenticateService} from "../../service/authenticate.service";
import {Router} from "@angular/router";
import {BoardService} from "../../service/board/board.service";

@Component({
  selector: 'app-navbar-board-header',
  templateUrl: './navbar-board-header.component.html',
  styleUrls: ['./navbar-board-header.component.scss']
})
export class NavbarBoardHeaderComponent implements OnInit {
  @Input() currentBoard: Board = {columns: [], owner: {}, title: "", tags: []};
  @Input() canEdit: boolean = false;
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
}
