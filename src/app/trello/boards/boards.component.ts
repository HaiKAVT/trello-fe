import { Component, OnInit } from '@angular/core';
import {Board} from "../../model/board";
import {ModalService} from "../../service/modal/modal.service";
import {BoardService} from "../../service/board/board.service";

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.css']
})
export class BoardsComponent implements OnInit {

  board: Board[] = [];

  constructor(private modalService: ModalService,
              private boardService:BoardService) {
  }

  ngOnInit(): void {
  }

  displayAddBoardModal() {
    this.modalService.show()
  }

}
