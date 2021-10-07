import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {BoardService} from "../../service/board/board.service";
import {AuthenticateService} from "../../service/authenticate.service";
import {ToastService} from "../../service/toast/toast.service";
import {UserService} from "../../service/user/user.service";
import {Board} from "../../model/board";
import {UserToken} from "../../model/user-token";
import {User} from "../../model/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Column} from "../../model/column";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {ColumnService} from "../../service/column/column.service";

@Component({
  selector: 'app-board-view',
  templateUrl: './board-view.component.html',
  styleUrls: ['./board-view.component.scss']
})
export class BoardViewComponent implements OnInit {
  currentBoardId: number = -1;
  currentBoard: Board = {
    id: -1,
    owner: {},
    title: '',
    columns: []
  }
  loggedInUser: UserToken = {};
  user: User = {};
  canEdit: boolean = false;

  columnForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
  })
  isAdded:boolean=false;
  columnOld :Column ={
    cards: [],
    id: -1,
    position: -1,
    title: ""
  }
  constructor(private activatedRoute: ActivatedRoute,
              private boardService: BoardService,
              public authenticationService: AuthenticateService,
              private router: Router,
              private toastService: ToastService,
              private userService: UserService,
              private columnService:ColumnService) {
  }

  ngOnInit(): void {
    this.getCurrentBoardByURL()
  }

  getCurrentBoardByURL() {
    this.loggedInUser = this.authenticationService.getCurrentUserValue();
    this.activatedRoute.paramMap.subscribe((param: ParamMap) => {
      this.currentBoardId = parseInt(param.get('id')!)
      this.getCurrentBoard()
    })
  }

  getCurrentBoard() {
    this.boardService.getBoardById(this.currentBoardId).subscribe(board => {
      this.currentBoard = board;
      this.checkEditAllow();
    })
  }

  checkEditAllow() {
    let userId = this.loggedInUser.id
    let isEditAllow = userId == this.currentBoard.owner.id
    if (isEditAllow) {
      this.canEdit = true;
    }
  }

  addColumn(){
    if(this.columnForm.valid){
      let newColumn: Column = {cards:[], position:this.currentBoard.columns.length, title:this.columnForm.get('title')?.value}
      this.resetColumnForm();
      this.columnService.createAColumn(newColumn).subscribe(data=>{
        this.currentBoard.columns.push(data)
        this.boardDataUpdate()
      })
    }
  }

  resetColumnForm(){
    this.columnForm = new FormGroup({
      title: new FormControl('', Validators.required),
    })
  }

  boardDataUpdate(){
    this.boardService.updateBoard(this.currentBoardId, this.currentBoard).subscribe(()=>{
      this.getCurrentBoard()
    })
  }

  onKeydown($event: KeyboardEvent, column: Column){

  }

  dropColumn(event: CdkDragDrop<string[]>){
    moveItemInArray(this.currentBoard.columns,event.previousIndex, event.currentIndex);
    this.updatePosition();

  }

  private updatePosition(){
    for(let i = 0; i<this.currentBoard.columns.length;i++){
      this.currentBoard.columns[i].position = i;
      console.log(this.currentBoard.columns[i]);
      if(i == this.currentBoard.columns.length - 1){
        this.updateColumns()
      }
    }
  }

  updateColumns(){
    this.columnService.updateAllColumn(this.currentBoard.columns).subscribe(()=>{
      this.boardDataUpdate()
    })
  }

  showDeleteColumnModal(id:number){

  }

}
