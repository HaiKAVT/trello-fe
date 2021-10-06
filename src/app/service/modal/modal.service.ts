import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  isActived: boolean = false;

  constructor() {
  }

  show() {
    this.isActived = true
  }

  close(){
    this.isActived = false
  }
}
