import { Router } from '@angular/router';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {

  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private adminService = inject(AdminService);

  public myFormCategory:FormGroup = this.fb.group({
    name:['',[Validators.required, Validators.minLength(6)]],
    description:['',[Validators.required, Validators.minLength(6)]]
  })

  addCategory(){
    this.adminService.addCategory(this.myFormCategory.value).subscribe({
      next: ()=>{
        this.snackBar.open("Category added","Close",{duration:4000});
        this.router.navigateByUrl("/admin/dashboard")
      },
      error:(err) =>{
        this.router.navigateByUrl("/auth")
        this.snackBar.open(err.message,"Close", {duration:4000})
      }
    })
  }

}
