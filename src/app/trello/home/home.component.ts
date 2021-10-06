import {Component, OnInit} from '@angular/core';
import {ModalService} from "../../service/modal/modal.service";
import {Board} from "../../model/board";
import {BoardService} from "../../service/board.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
