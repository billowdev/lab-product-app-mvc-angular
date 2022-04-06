import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

export class Products {
  id!: String;
  name!: String;
  price!: Number;
  detail!: String;
}

@Injectable({
  providedIn: 'root'
})

export class CrudService {

  // Node API
  REST_API: String = 'http://localhost:5000/api'

  // HTTP HEADERS
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');


  constructor(private httpClient: HttpClient) { }
  // Add
  AddProduct(data: Products): Observable<any> {
    let API_URL = `${this.REST_API}/product/create`
    return this.httpClient.post(API_URL, data).pipe(
      catchError(this.handleError)
    )
  }

  // get all product
  GetProducts() {
    return this.httpClient.get(`${this.REST_API}/product/get`)
  }
    // get all product
    GetProduct(id: any) {
      let API_URL = `${this.REST_API}/product/get/${id}`
      return this.httpClient.get(API_URL, {headers: this.httpHeaders}).pipe(((res: any)=>{
        return res || {}
      }),
      catchError(this.handleError)
      )
    }


    updateProduct(id:any, data:any):Observable<any>{
      let API_URL = `${this.REST_API}/product/update/${id}`
      return this.httpClient.patch(API_URL, data, {headers:this.httpHeaders}).pipe(
        catchError(this.handleError)
      )
    }

    deleteProduct(id: any):Observable<any>{
      let API_URL = `${this.REST_API}/product/delete/${id}`
      return this.httpClient.delete(API_URL,{headers:this.httpHeaders}).pipe(
        catchError(this.handleError)
      )
    }
    
    // error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client error
      errorMessage = error.error.message;
    } else {
      // server error
      errorMessage = `Error : ${error.status}\n Message: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
