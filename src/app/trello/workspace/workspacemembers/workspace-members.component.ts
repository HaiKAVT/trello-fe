import {Component, OnInit} from '@angular/core';
import {WorkspaceService} from "../../../service/workspace/workspace.service";
import {UserToken} from "../../../model/user-token";
import {Workspace} from "../../../model/workspace";
import {User} from "../../../model/user";
import {UserService} from "../../../service/user/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BoardService} from "../../../service/board/board.service";
import {AuthenticateService} from "../../../service/authenticate.service";
import {ToastService} from "../../../service/toast/toast.service";
import {MemberWorkspace} from "../../../model/member-workspace";
import {MemberWorkspaceService} from "../../../service/member-workspace/member-workspace.service";

@Component({
  selector: 'app-workspacemembers',
  templateUrl: './workspace-members.component.html',
  styleUrls: ['./workspace-members.component.css']
})
export class WorkspaceMembersComponent implements OnInit {
  loggedInUser!: UserToken;
  workspace!: Workspace;
  workspaces: Workspace[] = [];
  allowEdit: Boolean = false;
  userSearchResult: User[] = [];
  currentWorkspaceId!: number;
  pendingAddMember: User[] = [];
  workspaceOwner!: User;
  memberInWorkspace: MemberWorkspace[] = [];

  constructor(private workspaceService: WorkspaceService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private boardService: BoardService,
              private router: Router,
              private authenticateService: AuthenticateService,
              private toastService: ToastService,
              private workspaceMemberService: MemberWorkspaceService) {
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
      this.workspaceOwner = data.owner
      this.memberInWorkspace = data.members
      this.checkRole(data);
    })
  }

  checkRole(workspace: Workspace) {
    if (this.loggedInUser.id == workspace.owner.id) {
      this.allowEdit = true;
    }
    for (let member of this.workspace.members) {
      if ((this.loggedInUser.id == member.user?.id && member.role == "Admin")) {
        this.allowEdit = true
      }
    }
  }

  getAllWorkspace() {
    this.workspaceService.findAllByOwnerId(this.loggedInUser.id).subscribe(data => {
      this.workspaces = data;
    })
  }

  findAllUserByUsername(username: string) {

  }

  selectUser(username: any, user: User) {

  }

  addMemberToWorkspace() {
  }

  removePendingUser(index: any) {
  }

  searchMembers(username: string) {
  }

  removeMembers(index: any) {
  }

  updateMember(member:MemberWorkspace, role:string){

  }

  hideInvite(){}
}
