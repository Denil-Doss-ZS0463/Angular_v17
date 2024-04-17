import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUrl = 'http://localhost:3300/users/';

  constructor(private http:HttpClient, private cookie: CookieService) { }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.authUrl}login`, credentials);
  }

  setToken(token: string): void {
    // Set cookie with the token
    this.cookie.set('jwt', token);
  }

  getToken(): string | null {
    // Retrieve token from cookies
    const token = this.cookie.get('jwt');
    if (token) {
      return token;
    }
    return null;
  }

  getUserIdFromToken(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.userId;
    }
    return null;
  }

  logout(): void {
    // Remove the token cookie
    this.cookie.delete('jwt')}

}
