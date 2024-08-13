import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  private _snackBar = inject(MatSnackBar);

  public visibility:boolean = true;
  public hidePassword:string = '';

  public myForm:FormGroup = this.fb.group({
    username:['',[Validators.required,Validators.minLength(4)],],
    password:['',[Validators.required,Validators.minLength(4)],],
  })

  ngOnInit(): void {
    this.hidePassword="password";
  }

  login(){
    const {username, password} = this.myForm.value;
    this.authService.login(username,password)
    .pipe(
      tap((value)=>console.log('Desde el observer',value))
    )
    .subscribe({
      next:()=>{
        this._snackBar.open("Log in successfull",'Close',{duration:4000})
        if(this.authService.getRole()?.includes("ROLE_ADMIN")){
          console.log(this.authService.getRole()?.includes("ROLE_ADMIN"));
          this.router.navigateByUrl('/admin')
        }else{
          console.log(this.authService.getRole()?.includes("ROLE_ADMIN"));
          this.router.navigateByUrl('/dashboard')
        }
      },
      error: (message)=>{
        this._snackBar.open("Datos ingresados incorrectos","ERROR",{duration:4000});
      }
    })
  }









  togglePasswordVisibility(){
    if(this.visibility){
      this.hidePassword='text';
      this.visibility= !this.visibility;
    }else{
      this.hidePassword='password';
      this.visibility=!this.visibility;
    }
  }

}
