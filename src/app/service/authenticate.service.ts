import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

const API_URL = `${environment.apiURL}`;
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
  constructor(private httpClient: HttpClient) {
  }

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post(API_URL + 'login', {username, password}, httpOptions)
  }

  logout() {
    window.sessionStorage.clear()
  }
}
