import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

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
      next:()=>this.router.navigateByUrl('/dashboard'),
      error: (message)=>{
        console.log("message",message);
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
