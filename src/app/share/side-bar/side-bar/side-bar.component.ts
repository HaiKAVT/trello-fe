import {Component, Input, OnInit} from '@angular/core';

import {AuthenticateService} from "../../../service/authenticate.service";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  constructor(private authenticateService: AuthenticateService) {
  }

  ngOnInit(): void {
  }

  showCreateWorkspaceModal() {
    document.getElementById('create-workspace')!.classList.add('is-active');
  }

}
