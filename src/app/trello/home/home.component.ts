import {Component, OnInit} from '@angular/core';
import {ModalService} from "../../service/modal/modal.service";
import {Board} from "../../model/board";
import {BoardService} from "../../service/board/board.service";
import {AuthenticateService} from "../../service/authenticate.service";
import {UserToken} from "../../model/user-token";
import {ToastService} from "../../service/toast/toast.service";
import {Column} from "../../model/column";
import {ColumnService} from "../../service/column/column.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  boards: Board[] = [];
  loggedInUser!: UserToken;
  newBoard: Board = {
    title: '',
    owner: {
      id: -1,
    },
    columns: [],
    type: '',
  };

  createdBoard?: Board

  constructor(private modalService: ModalService,
              private boardService: BoardService,
              private authenticateService: AuthenticateService,
              private toastService: ToastService,
              private columnService: ColumnService) {
  }

  ngOnInit(): void {
    this.loggedInUser = this.authenticateService.getCurrentUserValue()
    this.getBoards()
  }

  getBoards() {
    this.boardService.getOwnedBoard(this.loggedInUser.id!).subscribe(data => {
      this.boards = data;
    })
  }

  displayAddBoardModal() {
    document.getElementById('create-board')!.classList.add('is-active');
  }

  createNewBoard() {
    this.newBoard.owner = this.loggedInUser;
    this.boardService.addBoard(this.newBoard).subscribe(async data => {
      this.createdBoard = data
      await this.premadeColumnInBoard("Công việc", 0, this.createdBoard!);
      await this.premadeColumnInBoard("Sẽ làm", 1, this.createdBoard!);
      await this.premadeColumnInBoard("Đang làm", 2, this.createdBoard!);
      await this.premadeColumnInBoard("Đã xong", 3, this.createdBoard!);
      await this.toastService.showMessage("Bảng đã được tạo", "is-success");
      await this.getBoards()
      await this.resetInput();
      await this.hideCreateBoard()
    })
  }

  updateCreatedBoard() {
    this.boardService.updateBoard(this.createdBoard?.id!, this.createdBoard!).subscribe(() => {
      this.getBoards()
    })
  }

  resetInput() {
    this.newBoard = {
      title: '',
      owner: {
        id: -1,
      },
      columns: [],
      type: ''
    };
  }

  premadeColumnInBoard(title: string, position: number, board: Board) {
    let column: Column = {
      cards: [],
      position: position,
      title: title
    }
    this.columnService.createAColumn(column).subscribe(data => {
      board.columns.push(data);
      this.updateCreatedBoard();
    })
  }

  hideCreateBoard() {
    document.getElementById('create-board')!.classList.remove('is-active');
  }
}
