import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../interfaces/category.interface';
import { map, Observable, of } from 'rxjs';
import { CategoryResponse } from '../interfaces/category-response.interface';
import { Product } from '../interfaces/product-response';

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

  getCategories():Observable<CategoryResponse[]>{
    const categoryUrl = `${this.urlAdmin}/categories`
    return this.http.get<CategoryResponse[]>(categoryUrl)
  }

  addProduct(product:any):Observable<any>{
    const categoryUrl = `${this.urlAdmin}/add-product`
    return this.http.post<any>(categoryUrl,product)
  }

  getProducts():Observable<Product[]>{
    const categoryUrl = `${this.urlAdmin}/products`
    return this.http.get<Product[]>(categoryUrl)
  }

}
