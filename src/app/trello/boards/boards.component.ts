import { Component, OnInit } from '@angular/core';
import {Board} from "../../model/board";
import {ModalService} from "../../service/modal/modal.service";
import {BoardService} from "../../service/board/board.service";
import {UserToken} from "../../model/user-token";
import {AuthenticateService} from "../../service/authenticate.service";

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {
  boards: Board[] = [];
  privateBoards:Board[]=[];
  publicBoards:Board[]=[];
  loggedInUser!: UserToken;

  constructor(private modalService: ModalService,
              private boardService: BoardService,
              private authenticateService: AuthenticateService) {
  }

  ngOnInit(): void {
    this.loggedInUser = this.authenticateService.getCurrentUserValue()
    this.getBoards()
    this.getPublicBoard()
    this.getPrivateBoard()
  }

  getBoards() {
    this.boardService.getAllBoard().subscribe(data => {
      this.boards = data
    })
  }
  getPrivateBoard(){
    this.boardService.getBoardByType('Private').subscribe(data=>{
      this.privateBoards = data
    })
  }
  getPublicBoard(){
    this.boardService.getBoardByType('Public').subscribe(data=>{
      this.publicBoards = data
    })
  }

  displayAddBoardModal() {
    this.modalService.show()
  }
}
