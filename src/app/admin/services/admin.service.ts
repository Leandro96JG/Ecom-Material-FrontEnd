import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Category } from '../interfaces/category.interface';
import { map, Observable, of, tap } from 'rxjs';
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
    const categoriesUrl = `${this.urlAdmin}/categories`
    return this.http.get<CategoryResponse[]>(categoriesUrl)
  }

  addProduct(product:any):Observable<any>{
    const addProductUrl = `${this.urlAdmin}/add-product`
    return this.http.post<any>(addProductUrl,product)
  }

  getProducts():Observable<Product[]>{
    const getProductsUrl = `${this.urlAdmin}/products`
    return this.http.get<Product[]>(getProductsUrl)
  }

  getProductsByName(name:string){
    const getProductsByName = `${this.urlAdmin}/search/${name}`;
    return this.http.get<Product[]>(getProductsByName);
  }

  deletedProduct(id:number):Observable<boolean>{
    const deletedProductUrl = `${this.urlAdmin}/product/${id}`;
    return this.http.delete<boolean>(deletedProductUrl);
  }

}
