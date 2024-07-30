import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { AuthStatus } from '../interfaces/auth/auth-status.enum';
import { LoginResponse } from '../interfaces/auth/loginRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private readonly baseUrl:string = 'http://localhost:8080';
  private http = inject(HttpClient);

  private _currentUser = signal<string|null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(()=>this._currentUser);
  public authStatus = computed(()=> this._authStatus);

  login(username:string, password:string):Observable<boolean>{
    const url = `${this.baseUrl}/auth/log-in`;
    const body = {username, password};

    console.log('body: ', body)
    return this.http.post<LoginResponse>('http://localhost:8080/auth/log-in',body)
    .pipe(
      tap(({username}) => console.log(username)),
      map(({username,jwt})=>this.setAuthentication(username,jwt)),

      catchError(err =>
        throwError(()=>console.log(err))
      )
    );
  }

  private setAuthentication(username:string , jwt:string):boolean{
    this._currentUser.set(username);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token',jwt);
    return true;
  }


}
