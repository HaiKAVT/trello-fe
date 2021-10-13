import { Component, OnInit } from '@angular/core';
import {Workspace} from "../../../model/workspace";
import {WorkspaceService} from "../../../service/workspace/workspace.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticateService} from "../../../service/authenticate.service";
import {ToastService} from "../../../service/toast/toast.service";
import {MemberWorkspaceService} from "../../../service/member-workspace/member-workspace.service";
import {MemberService} from "../../../service/member/member.service";
import {NotificationService} from "../../../service/notification/notification.service";
import {UserService} from "../../../service/user/user.service";
import {UserToken} from "../../../model/user-token";

@Component({
  selector: 'app-workspace-setting',
  templateUrl: './workspace-setting.component.html',
  styleUrls: ['./workspace-setting.component.css']
})
export class WorkspaceSettingComponent implements OnInit {
  workspace!: Workspace;
  workspaces: Workspace[] = [];
  loggedInUser!: UserToken;
  currentWorkspaceId: any;

  constructor(private workspaceService: WorkspaceService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private authenticateService: AuthenticateService,
              private toastService: ToastService,
              private workspaceMemberService: MemberWorkspaceService,
              private memberService: MemberService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loggedInUser = this.authenticateService.getCurrentUserValue()
    this.getAllWorkspace();
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
      // this.workspaceOwner = data.owner
      // this.memberInWorkspace = data.members
      // this.checkRole(data);
    })
  }
  getAllWorkspace() {
    this.workspaceService.findAllByOwnerId(this.loggedInUser.id).subscribe(data => {
      this.workspaces = data;
    })
  }

  deleteWorkspace(id: number) {
    this.workspaceService.deleteWorkspace(id).subscribe(() => {
      this.router.navigateByUrl(`/trello`)
    })
  }

  showEditModal(){
    document.getElementById('edit-workspace')!.classList.add('is-active');
  }
  hideEditModal(){
    this.getCurrentWorkspace(this.currentWorkspaceId)
    document.getElementById('edit-workspace')!.classList.remove('is-active');
  }
  showEditPrivacyModal(){
    document.getElementById('edit-workspace-privacy')!.classList.add('is-active');
  }
  hideEditPrivacyModal(){
    this.getCurrentWorkspace(this.currentWorkspaceId);
    document.getElementById('edit-workspace-privacy')!.classList.remove('is-active');
  }
  showConfirmDeleteModal(){
    document.getElementById('confirm-delete')!.classList.add('is-active');
  }
  hideConfirmDeleteModal(){
    document.getElementById('confirm-delete')!.classList.remove('is-active');
  }

  updateWorkspace(){
    this.workspaceService.updateWorkspace(this.workspace.id,this.workspace).subscribe(data=>{
      this.workspace = data;
      this.hideEditModal();
      this.hideEditPrivacyModal()
    })
  }
}
