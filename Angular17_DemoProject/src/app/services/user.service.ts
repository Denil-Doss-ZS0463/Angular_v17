import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = 'http://localhost:3300/users/';
  private userAccessUrl = 'http://localhost:3300/useraccess/';

  loggedInUser: any;
  token!: string;

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.userUrl}login`, credentials);
  }

  loggedUser(id: any) {
    return this.http.get(`${this.userUrl}getUserById/${id}`);
  }

  updateUser(id: any, userData: any) {
    return this.http.put(`${this.userUrl}updateUser/${id}`, id, userData);
  }

  setUserToken(token: string) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  getUserToken() {
    return localStorage.getItem('token');
  }

  getUserIdFromToken() {
    const token = this.getUserToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.userId;
    } else {
      return null;
    }
  }

  setLoggedInUser(user: any) {
    this.loggedInUser = user;
  }

  getLoggedInUser() {
    return this.loggedInUser;
  }

  addUser(userData: any) {
    return this.http.post(`${this.userUrl}addUser`, userData);
  }
  getUsersList(){
    return this.http.get(`${this.userUrl}getAllUsers`);
  }
  getAccessLevelDetails(){
    return this.http.get(`${this.userAccessUrl}user-access-levels`)
  }
  private refreshUserListSource = new Subject<void>();
  refreshUserList$ = this.refreshUserListSource.asObservable();
  refreshUserList() {
    this.refreshUserListSource.next();
  }

  getUserDetailsById(id: any) {
    return this.http.get(`${this.userUrl}getUserById/${id}`);
  }
  deleteUser(id:number){
    return this.http.patch(`${this.userUrl}updateUserStatus/${id}`,null);
  }
}