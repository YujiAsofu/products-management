import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { MatTableDataSource } from '@angular/material/table'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _http: HttpClient) {}

  addProduct(data: any): Observable<any> {
    return this._http.post('https://dummyjson.com/products/add', data)
  }

  updateProduct(id: number, data: any): Observable<any> {
    return this._http.put(`https://dummyjson.com/products/${id}`, data)
  }

  getProductList(): Observable<any> {
    return this._http.get('https://dummyjson.com/products')
  }

  deleteProduct(id: number): Observable<any> {
    return this._http.delete(`https://dummyjson.com/products/${id}`)
  }
}
