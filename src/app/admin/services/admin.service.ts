import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../interfaces/category.interface';
import { map, Observable, of } from 'rxjs';
import { CategoryResponse } from '../interfaces/category-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private http = inject(HttpClient);
  private readonly urlAdmin:string = "http://localhost:8080/api/admin";

  constructor() { }

  addCategory(category:Category):Observable<CategoryResponse>{
    const categoryUrl = `${this.urlAdmin}/category`
    return this.http.post<CategoryResponse>(categoryUrl,category)
  }
}
