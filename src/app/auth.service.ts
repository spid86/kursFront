import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserRoleSubject: BehaviorSubject<string | null>;
  public currentUserRole$: Observable<string | null>;

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.currentUserRoleSubject = new BehaviorSubject<string | null>(null);
    this.currentUserRole$ = this.currentUserRoleSubject.asObservable();
  }

  setCurrentUserRole(role: string): void {
    this.currentUserRoleSubject.next(role);
  }

  login(username: string | undefined, password: string | undefined) {
    const basicAuth = btoa(username + ':' + password);
    const headers = new HttpHeaders({
      authorization : 'Basic ' + basicAuth,
    });
    localStorage.setItem('token', basicAuth);
    const resp = this.http.get<String>(`${this.apiUrl}/auth`, { headers }).pipe(catchError((error => {
      this.clearBasicAuthToken();
      return throwError(() => 'Login failed. Please try again.')
    })))
    return resp;
  }
  getBasicAuthToken(): string | null {
    return localStorage.getItem("token");
  }
  isAuthenticated(): boolean {
    const authToken = localStorage.getItem('token');
    return !!authToken; 
  }
  getCurrentUserRole(): string | null {
    return localStorage.getItem("role");
  }
  clearBasicAuthToken(): void {
    localStorage.removeItem("token");
  }
  logout(): void{
    localStorage.clear();
  }
}
