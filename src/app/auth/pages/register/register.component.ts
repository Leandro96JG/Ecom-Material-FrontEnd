import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorsService } from '../../services/validators/validators.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit{
  //En la nueva version de angular 18, es necesario injectar dependencias usando inject y ya no el constructor

  private fb1 = inject(FormBuilder);
  private validatorService=inject(ValidatorsService);
  private router = inject(Router);

  public hidePassword:string = '';
  public hidePasswordConfirm:string = '';
  public visibility:boolean=true;
  public visibilityConfirm:boolean=true;

  constructor() {}
  ngOnInit(): void {
    this.hidePassword='password';
    this.hidePasswordConfirm='password';
  }

  myForm:FormGroup = this.fb1.group(
   {
     username: [
       '',
       [
         Validators.required,
         Validators.minLength(4),
       ],
     ],
     email: ['', [Validators.required, Validators.email]],
     password: ['', [Validators.required, Validators.minLength(4)]],
     passwordConfirm: ['',[Validators.required,Validators.minLength(4)]],
   },
   {
     validators: [
       this.validatorService.isFieldOneEqualFieldTwo(
         'password',
         'passwordConfirm'
       ),
     ],
   }
 );





 togglePasswordVisibility(){
  if(this.visibility){
    this.hidePassword='text';
    this.visibility= !this.visibility;
  }else{
    this.hidePassword='password';
    this.visibility=!this.visibility;
  }
}

togglePasswordConfirmVisibility(){
  if(this.visibilityConfirm){
    this.hidePasswordConfirm='text';
    this.visibilityConfirm= !this.visibilityConfirm;
  }else{
    this.hidePasswordConfirm='password';
    this.visibilityConfirm=!this.visibilityConfirm;
  }
}

  onSubmit() {
    this.myForm.markAllAsTouched();
  }
  navigateLogin(){
    this.router.navigateByUrl("/login");
  }


}
