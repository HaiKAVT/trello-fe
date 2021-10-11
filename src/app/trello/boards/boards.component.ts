import {Component, OnInit} from '@angular/core';
import {Board} from "../../model/board";
import {ModalService} from "../../service/modal/modal.service";
import {BoardService} from "../../service/board/board.service";
import {UserToken} from "../../model/user-token";
import {AuthenticateService} from "../../service/authenticate.service";
import {ToastService} from "../../service/toast/toast.service";
import {Column} from "../../model/column";
import {ColumnService} from "../../service/column/column.service";

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {
  boards: Board[] = [];
  privateBoards: Board[] = [];
  publicBoards: Board[] = [];
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
    this.getPublicBoard()
    this.getPrivateBoard()
  }

  getBoards() {
    this.boardService.getOwnedBoard(this.loggedInUser.id!).subscribe(data => {
      this.boards = data
    })
  }

  getPrivateBoard() {
    this.boardService.getBoardByTypeAndUser('Private', this.loggedInUser.id!).subscribe(data => {
      this.privateBoards = data
    })
  }

  getPublicBoard() {
    this.boardService.getBoardByType('Public').subscribe(data => {
      this.publicBoards = data
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

  hideCreateBoard() {
    document.getElementById('create-board')!.classList.remove('is-active');
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
}
