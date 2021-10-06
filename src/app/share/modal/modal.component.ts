import { Component, OnInit } from '@angular/core';
import {ModalService} from "../../service/modal/modal.service";
import {Board} from "../../model/board";
import {ToastService} from "../../service/toast/toast.service";
import {BoardService} from "../../service/board.service";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  newBoard: Board = {
    title: '',
    owner: {
      id: -1,
    },
    columns: [],
    status:'',
  };
  constructor(public modalService:ModalService,
              private toastService:ToastService,
              private boardService:BoardService) { }

  ngOnInit(): void {
  }
  createNewBoard() {
    this.resetInput();
    this.modalService.close();
    this.toastService.showMessage("Board Created","is-success")
    //create new board
    // this.board.owner.id = this.modalService.currentUser.id;
    // this.boardService.addNewBoard(this.board).subscribe(board => {
    //     this.board = board;
    //     this.createNotificationBoard()
    //     this.loadDto();
    //   }
    // )
  }

  resetInput(){
    this.newBoard = {
      title: '',
      owner: {
        id: -1,
      },
      columns: [],
      status:''
    };
  }
}
