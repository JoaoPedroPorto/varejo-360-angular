import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// MODEL
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}
  private path = 'http://localhost:8080/api';

  private setHeader(): any {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options: any = headers;
    return options;
  }

  // LISTAR TODOS OS PRODUTOS OU PESQUISA
  public listAllProducts(search?: string): Observable<Array<Product>> {
    const options: any = this.setHeader();

    return this.http.post<any[]>(`${this.path}/product`, JSON.stringify({ keyword: search }), { headers: options })
      .pipe(map(result => {
        return result;
      })
    );
  }

}
