import {Component, Input, OnInit} from '@angular/core';

import {AuthenticateService} from "../../../service/authenticate.service";
import {Workspace} from "../../../model/workspace";
import {UserToken} from "../../../model/user-token";
import {WorkspaceService} from "../../../service/workspace/workspace.service";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  workspaces: Workspace[] = [];
  loggedInUser!: UserToken;

  constructor(private authenticateService: AuthenticateService,
              private workspaceService: WorkspaceService) {
  }


  ngOnInit(): void {
    this.loggedInUser = this.authenticateService.getCurrentUserValue()
    this.getAllWorkspace();
  }

  getAllWorkspace() {
    this.workspaceService.findAllByOwnerId(this.loggedInUser.id).subscribe(data => {
      this.workspaces = data;
    })
  }

  showCreateWorkspaceModal() {
    document.getElementById('create-workspace')!.classList.add('is-active');
  }
  showWorkspaceButton(id:any){
    let toChange = document.getElementById(`workspace-${id}`);
    if(toChange!.classList.contains('is-hidden')){
      toChange!.classList.remove('is-hidden')
    } else {
      toChange!.classList.add('is-hidden')
    }
  }
}
