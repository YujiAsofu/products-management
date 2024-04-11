import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { Observable, first } from 'rxjs'
import { Product, ProductDeleted } from '../interfaces/product.interface'

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _http: HttpClient) {}

  addProduct(data: any): Observable<Product> {
    return this._http
      .post<Product>('https://dummyjson.com/products/add', data)
      .pipe(first())
  }

  updateProduct(id: number, data: any): Observable<Product> {
    return this._http
      .put<Product>(`https://dummyjson.com/products/${id}`, data)
      .pipe(first())
  }

  getProductList(): Observable<{ products: Product[] }> {
    return this._http
      .get<{ products: Product[] }>('https://dummyjson.com/products')
      .pipe(first())
  }

  deleteProduct(id: number): Observable<ProductDeleted> {
    return this._http
      .delete<ProductDeleted>(`https://dummyjson.com/products/${id}`)
      .pipe(first())
  }
}
