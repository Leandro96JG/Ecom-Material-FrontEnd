import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal, WritableSignal, effect } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';
import { AuthStatus } from '../interfaces/auth/auth-status.enum';
import { LoginResponse } from '../interfaces/auth/loginResponse.interface';
import { CreateUser } from '../interfaces/auth/create-user.interface';
import { RegisterResponse } from '../interfaces/auth/registerResponse.interface';
import { jwtDecode } from 'jwt-decode'
@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private readonly baseUrl:string = 'http://localhost:8080';
  private http = inject(HttpClient);

  private _currentUser = signal<string|null>(null);
  private _authStatus = signal<AuthStatus>(AuthStatus.notAuthenticated);
  private token = '';
  private static readonly TOKEN_KEY = 'token';
  private static readonly USERNAME_KEY = 'username';

  public currentUser = computed(()=>this._currentUser());
  public authStatus = computed(()=> this._authStatus());

  //Metodos para guardar y leer lo del localStorage

  private saveToLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  private getFromLocalStorage(key: string): string | null {
    return localStorage.getItem(key);
  }

  constructor(){
    this.init();
    this.checkStatus().subscribe()
  }


  public init() {
    //Para solucionar problemas en el local storage
    this._authStatus.set(AuthStatus.checking)
    if(typeof window !== 'undefined'){
      const token = this.getFromLocalStorage(AuthService.TOKEN_KEY);
      const username = this.getFromLocalStorage(AuthService.USERNAME_KEY);
      if (token && username) {
        this.setAuthentication(username, token);
      }
    }
  }

  login(username:string, password:string):Observable<boolean>{
    const url = `${this.baseUrl}/auth/log-in`;
    const body = {username, password};

    return this.http.post<LoginResponse>(url,body)
    .pipe(
      map(({username,jwt})=>this.setAuthentication(username,jwt)),

      catchError(err =>
        throwError(()=>err.message)
      )
    );
  }

  private setAuthentication(username:string , jwt:string):boolean{
    this.token = jwt;
    this._currentUser.set(username);
    this._authStatus.set(AuthStatus.authenticated);

    this.saveToLocalStorage(AuthService.TOKEN_KEY, jwt);
    this.saveToLocalStorage(AuthService.USERNAME_KEY, username);

    return true;
  }

  register(createUser:CreateUser):Observable<boolean>{
    const url=`${this.baseUrl}/auth/sign-up`;

    return this.http.post<RegisterResponse>(url,createUser).pipe(
      map(({username,jwt})=>this.setAuthentication(username,jwt)),
      catchError(err =>{
        const errMessage = err.error.message;
        return throwError(()=> errMessage)
      }
      )
    )
  }


  //Rol

   getRole(){

      if(this.token === ''){
        return
      }
      const decodeToken = jwtDecode(this.token);
      const roleString = decodeToken.authorities;
      const claims = roleString?.split(',');
      return claims;
  }

  public logout(){
    this.token ='';
    this._currentUser.set(null);
    this._authStatus.set(AuthStatus.notAuthenticated);

    localStorage.removeItem(AuthService.TOKEN_KEY);
    localStorage.removeItem(AuthService.USERNAME_KEY);
  }

  //Check status

  checkStatus():Observable<boolean>{
    if(typeof window !== 'undefined'){
      const token = this.getFromLocalStorage(AuthService.TOKEN_KEY);
      if(!token){
        this.logout();
        return of(false);
      }
    }
    return of(true);

  }

  public getToken(){
    return this.getFromLocalStorage(AuthService.TOKEN_KEY);
  }

}
