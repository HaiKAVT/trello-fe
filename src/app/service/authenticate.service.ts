import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable,BehaviorSubject} from "rxjs";
import {UserToken} from "../model/user-token";
import {map} from "rxjs/operators";



const API_URL = `${environment.apiURL}`;
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  public currentUserSubject!: BehaviorSubject<UserToken>;
  public currentUser!: Observable<UserToken>;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserToken>(JSON.parse(<string>localStorage.getItem('user')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(API_URL + 'login', {username, password}, httpOptions)
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }))
  }

  logout() {
    window.sessionStorage.clear()
  }
  getCurrentUserValue() {
    return this.currentUserSubject.value;
  }
}
