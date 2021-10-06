import {Component, OnInit} from '@angular/core';
import {ModalService} from "../../service/modal/modal.service";
import {Board} from "../../model/board";
import {BoardService} from "../../service/board/board.service";
import {AuthenticateService} from "../../service/authenticate.service";
import {UserToken} from "../../model/user-token";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  boards: Board[] = [];
  loggedInUser!: UserToken;

  constructor(private modalService: ModalService,
              private boardService: BoardService,
              private authenticateService: AuthenticateService) {
  }

  ngOnInit(): void {
    this.loggedInUser = this.authenticateService.getCurrentUserValue()
    this.getBoards()
  }

  getBoards() {
    this.boardService.getAllBoard().subscribe(data => {
      this.boards = data
    })
  }

  displayAddBoardModal() {
    this.modalService.show()
  }
}
