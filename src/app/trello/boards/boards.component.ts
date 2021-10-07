import {Component, OnInit} from '@angular/core';
import {Board} from "../../model/board";
import {ModalService} from "../../service/modal/modal.service";
import {BoardService} from "../../service/board/board.service";
import {UserToken} from "../../model/user-token";
import {AuthenticateService} from "../../service/authenticate.service";
import {ToastService} from "../../service/toast/toast.service";

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
    type:'',
  };
  constructor(private modalService: ModalService,
              private boardService: BoardService,
              private authenticateService: AuthenticateService,
              private toastService:ToastService) {
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
    this.modalService.close();
    this.newBoard.owner = this.loggedInUser;
    this.boardService.addBoard(this.newBoard).subscribe(()=>{
      this.toastService.showMessage("Board Created","is-success");
      this.resetInput();
      this.getBoards()
      this.getPublicBoard()
      this.getPrivateBoard()
    })
  }
  resetInput(){
    this.newBoard = {
      title: '',
      owner: {
        id: -1,
      },
      columns: [],
      type:''
    };
  }
  hideCreateBoard(){
    document.getElementById('create-board')!.classList.remove('is-active');
  }
}
