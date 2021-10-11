import {Component, OnInit} from '@angular/core';
import {Workspace} from "../../../model/workspace";
import {WorkspaceService} from "../../../service/workspace/workspace.service";
import {UserService} from "../../../service/user/user.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {BoardService} from "../../../service/board/board.service";
import {AuthenticateService} from "../../../service/authenticate.service";
import {ToastService} from "../../../service/toast/toast.service";
import {UserToken} from "../../../model/user-token";
import {Board} from "../../../model/board";

@Component({
  selector: 'app-workspacehome',
  templateUrl: './workspace-home.component.html',
  styleUrls: ['./workspace-home.component.css']
})
export class WorkspaceHomeComponent implements OnInit {
  workspace!: Workspace;
  workspaces: Workspace[] = [];
  roleUserInWorkspace: Boolean = false;
  loggedInUser!: UserToken;
  currentWorkspaceId!: number;
  newBoard: Board = {
    title: '',
    owner: {
      id: -1,
    },
    columns: [],
    type: '',
  };

  constructor(private workspaceService: WorkspaceService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private boardService: BoardService,
              private router: Router,
              private authenticateService: AuthenticateService,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.loggedInUser = this.authenticateService.getCurrentUserValue()
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.currentWorkspaceId = parseInt(paramMap.get('id')!)
      if (this.currentWorkspaceId != null) {
        this.getCurrentWorkspace(this.currentWorkspaceId);
        this.getAllWorkspace();
      }
    });
  }

  getCurrentWorkspace(id: any) {
    this.workspaceService.findById(id).subscribe(data => {
      this.workspace = data;
      this.checkRole(data);
    })
  }

  getAllWorkspace() {
    this.workspaceService.findAllByOwnerId(this.loggedInUser.id).subscribe(data => {
      this.workspaces = data;
    })
  }


  checkRole(workspace: Workspace) {
    if (this.loggedInUser.id == workspace.owner.id) {
      console.log(this.workspace.owner)
      this.roleUserInWorkspace = true;
    }
  }

  displayAddBoardModal() {
    document.getElementById('create-board')!.classList.add('is-active');
  }

  hideCreateBoard() {
    document.getElementById('create-board')!.classList.remove('is-active');
  }

  createNewBoard() {
    this.newBoard.owner = this.loggedInUser;
    this.boardService.addBoard(this.newBoard).subscribe(data => {
      this.toastService.showMessage("Bảng đã được tạo", "is-success");
      this.workspaceAddBoard(data)
      this.resetInput();
      this.hideCreateBoard();
    })
  }

  workspaceAddBoard(board: Board){
    this.workspace.boards.push(board);
    this.workspaceService.updateWorkspace(this.workspace.id, this.workspace).subscribe(()=>{
      this.getCurrentWorkspace(this.currentWorkspaceId)
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
}
