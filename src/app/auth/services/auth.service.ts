import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { AuthStatus } from '../interfaces/auth/auth-status.enum';
import { LoginResponse } from '../interfaces/auth/loginResponse.interface';
import { CreateUser } from '../interfaces/auth/create-user.interface';
import { RegisterResponse } from '../interfaces/auth/registerResponse.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private readonly baseUrl:string = 'http://localhost:8080';
  private http = inject(HttpClient);

  private _currentUser = signal<string|null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.checking);

  public currentUser = computed(()=>this._currentUser());
  public authStatus = computed(()=> this._authStatus());

  constructor(){

  }

  login(username:string, password:string):Observable<boolean>{
    const url = `${this.baseUrl}/auth/log-in`;
    const body = {username, password};

    return this.http.post<LoginResponse>(url,body)
    .pipe(
      tap(({username}) => console.log(username)),
      map(({username,jwt})=>this.setAuthentication(username,jwt)),

      catchError(err =>
        throwError(()=>console.log(err.error.message))
      )
    );
  }

  private setAuthentication(username:string , jwt:string):boolean{
    this._currentUser.set(username);
    this._authStatus.set(AuthStatus.authenticated);
    localStorage.setItem('token',jwt);
    return true;
  }

  register(createUser:CreateUser):Observable<boolean>{
    const url=`${this.baseUrl}/auth/sign-up`;

    return this.http.post<RegisterResponse>(url,createUser).pipe(
      map(({username,jwt})=>this.setAuthentication(username,jwt)),
      catchError(err =>
        throwError(()=> err.error.message )
      )
    )
  }


}
