import {Injectable} from '@angular/core';
import {Board} from "../../model/board";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  board: Observable<Board[]> = new Observable<Board[]>()

  constructor() {
  }

  getAllBoard(): Observable<Board[]> {
    return this.board
  }
}
