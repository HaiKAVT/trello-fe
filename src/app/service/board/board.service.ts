import {Injectable} from '@angular/core';
import {Board} from "../../model/board";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  board: Observable<Board[]> = new Observable<Board[]>()

  constructor(private http:HttpClient) {
  }

  getAllBoard(): Observable<Board[]> {
    return this.board
  }
}
