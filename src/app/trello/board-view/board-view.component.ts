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
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {ColumnService} from "../../service/column/column.service";
import {Card} from "../../model/card";
import {CardService} from "../../service/card/card.service";
import {doc} from "@angular/fire/firestore";
import {TagService} from "../../service/tag/tag.service";
import {Tag} from "../../model/tag";

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

  createCardForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl()
  })

  isAdded: boolean = false;
  columnOld: Column = {
    cards: [],
    id: -1,
    position: -1,
    title: ""
  }
  selectedCard: Card = {
    id: -1,
    title: '',
    content: '',
    position: -1,
  }
  selectecdColumn: Column = {
    cards: [],
    id: -1,
    position: -1,
    title: ""
  }
  selectedColumnID: number = -1;
  selectedIndex: number = -1;
  cardsDto: Card[] = [];
  columnsDto: Column[] = [];

  previousColumn: Column = {
    cards: [],
    id: -1,
    position: -1,
    title: ""
  };

  constructor(private activatedRoute: ActivatedRoute,
              private boardService: BoardService,
              public authenticationService: AuthenticateService,
              private router: Router,
              private toastService: ToastService,
              private userService: UserService,
              private columnService: ColumnService,
              private cardService: CardService,
              private tagService:TagService) {
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

  addColumn() {
    if (this.columnForm.valid) {
      let newColumn: Column = {
        cards: [],
        position: this.currentBoard.columns.length,
        title: this.columnForm.get('title')?.value
      }
      this.resetColumnForm();
      this.columnService.createAColumn(newColumn).subscribe(data => {
        this.currentBoard.columns.push(data)
        this.boardDataUpdate()
        this.closeCreateColumnModal()
      })
    }
  }

  resetColumnForm() {
    this.columnForm = new FormGroup({
      title: new FormControl('', Validators.required),
    })
  }

  boardDataUpdate() {
    this.boardService.updateBoard(this.currentBoardId, this.currentBoard).subscribe(() => {
      this.getCurrentBoard()
    })
  }

  onFocusOut(column: Column) {
    this.columnService.updateAColumn(column.id,column).subscribe(()=>{
      this.boardDataUpdate()
    })
  }

  dropColumn(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.currentBoard.columns, event.previousIndex, event.currentIndex);
    this.saveChange()
  }

  dropCard(event: CdkDragDrop<Card[]>, column: Column) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.setPreviousColumn(event);
    this.saveChange()
  }

  private setPreviousColumn(event: CdkDragDrop<Card[]>) {
    let previousColumnId = parseInt(event.previousContainer.id);
    for (let column of this.currentBoard.columns) {
      if (column.id == previousColumnId) {
        this.previousColumn = column;
        break;
      }
    }
  }

  saveChange() {
    this.updatePosition();
  }

  private updatePosition() {
    for (let i = 0; i < this.currentBoard.columns.length; i++) {
      this.currentBoard.columns[i].position = i
      for (let j = 0; j < this.currentBoard.columns[i].cards.length; j++) {
        this.currentBoard.columns[i].cards[j].position! = j;
      }
    }
    this.updateDto();
  }

  private updateDto() {
    this.columnsDto = [];
    this.cardsDto = [];
    for (let column of this.currentBoard.columns) {
      this.columnsDto.push(column);
      for (let card of column.cards) {
        this.cardsDto.push(card);
      }
    }
    this.updateCards()
  }

  updateCards() {
    this.cardService.updateCards(this.cardsDto).subscribe(() => this.updatePreviousColumn())
  }
  private updatePreviousColumn() {
    if (this.previousColumn.id != -1) {
      this.columnService.updateAColumn(this.previousColumn.id, this.previousColumn).subscribe(() => this.updateColumns())
    } else {
      this.updateColumns()
    }
  }
  updateColumns() {
    this.columnService.updateAllColumn(this.columnsDto).subscribe(() => {
      this.boardDataUpdate()
    })
  }

  deleteColumn() {
    for (let i = 0; i < this.currentBoard.columns.length; i++) {
      if (this.currentBoard.columns[i].id == this.selectedColumnID) {
        this.selectedIndex = this.currentBoard.columns.indexOf(this.currentBoard.columns[i])
        this.currentBoard.columns.splice(this.selectedIndex, 1);
        console.log(this.currentBoard.columns);
        this.columnService.deleteAColumn(this.selectedColumnID).subscribe(() => {
          this.saveChange()
          this.closeDeleteColumnModal();
        })
      }
    }
  }

  showDeleteColumnModal(id: number) {
    this.selectedColumnID = id;
    document.getElementById('deleteColumnModal')!.classList.add('is-active')
  }

  closeDeleteColumnModal() {
    this.selectedColumnID = -1;
    this.selectedIndex = -1;
    document.getElementById('deleteColumnModal')!.classList.remove('is-active')
  }


  showUpdateCardModal(card: Card) {
    this.selectedCard = card;
    this.createCardForm.get('title')?.setValue(card.title);
    this.createCardForm.get('content')?.setValue(card.content);
    document.getElementById('editCardModal')!.classList.add('is-active')
  }

  editCard() {
    let card: Card = {
      id: this.selectedCard.id,
      title: this.createCardForm.get('title')?.value,
      content: this.createCardForm.get('content')?.value,
      position: this.selectedCard.position
    }
    this.resetCreateCardForm();
    this.cardService.updateCard(card.id, card).subscribe(data => {
      this.getCurrentBoard()
      this.closeEditCardModal()
    })
  }

  closeEditCardModal() {
    this.resetCreateCardForm();
    document.getElementById('editCardModal')!.classList.remove('is-active')
  }

  showCreateCardModal(column: Column) {
    this.selectecdColumn = column;
    document.getElementById('createCardModal')!.classList.add('is-active')
  }

  createCard() {
    if (this.createCardForm.valid) {
      let newCard: Card = {
        title: this.createCardForm.get('title')?.value,
        content: this.createCardForm.get('content')?.value,
        position: this.selectecdColumn.cards.length
      }
      this.resetCreateCardForm();
      this.cardService.createCard(newCard).subscribe(data => {
        this.selectecdColumn.cards.push(data)
        this.columnService.updateAColumn(this.selectecdColumn.id, this.selectecdColumn).subscribe()
        this.closeCreateCardModal()
      })
    }
  }

  resetCreateCardForm() {
    this.createCardForm = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl()
    })
  }

  closeCreateCardModal() {
    this.resetCreateCardForm();
    this.selectedColumnID = -1;
    document.getElementById('createCardModal')!.classList.remove('is-active')
  }

  showDeleteCardModal() {
    document.getElementById("delete-card-modal")!.classList.add("is-active")
  }

  closeDeleteCardModal() {
    document.getElementById("delete-card-modal")!.classList.remove("is-active")
  }

  deleteCard(id: any) {
    this.cardService.deleteCard(id).subscribe(() => {
        this.closeDeleteCardModal();
        this.closeEditCardModal();
        this.getCurrentBoard()
      }
    )
  }
  showCreateColumnModal(){
    document.getElementById('createColumnModal')!.classList.add("is-active")
  }

  closeCreateColumnModal(){
    document.getElementById('createColumnModal')!.classList.remove("is-active")
  }

  removeTagFromCard(tag:Tag){
    let tagName = tag.name;
    for (let tags of this.selectedCard.tags!){
      if(tags.id == tag.id){
        let index = this.selectedCard.tags?.indexOf(tags);
        this.selectedCard.tags?.splice(index!,1);
      }
    }
    this.saveChange();
  }

  switchTagForm(){
    let tagForm =document.getElementById('tags');

  }
}
