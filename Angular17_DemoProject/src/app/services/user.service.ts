import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3300/users/';
  loggedInUser: any;
  token!: string;

  constructor(private http: HttpClient) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}login`, credentials);
  }

  // setLoggedInUser(user: any) {
  //   this.loggedInUser = user;
  // }

  // getLoggedInUser() {
  //   return this.loggedInUser;
  // }

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
      // const decodedToken: any = jwtDecode(token);
      // return decodedToken.userId;
      return token;
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

  loggedUser(id: any) {
    return this.http.get(`${this.baseUrl}getUserById/${id}`);
  }
}
