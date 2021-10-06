import {Component, OnInit} from '@angular/core';
import {ModalService} from "../../service/modal/modal.service";
import {Board} from "../../model/board";
import {BoardService} from "../../service/board/board.service";
import {AuthenticateService} from "../../service/authenticate.service";
import {UserToken} from "../../model/user-token";
import {ToastService} from "../../service/toast/toast.service";

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
  }

  getBoards() {
    this.boardService.getOwnedBoard(this.loggedInUser.id!).subscribe(data => {
      this.boards = data
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
