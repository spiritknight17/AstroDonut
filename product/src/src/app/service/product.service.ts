import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Product } from '../model/product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseHttpService{

  constructor(protected override http: HttpClient) { 
    super(http, '/api/product')
  }
  getTopRatedProducts(): Observable<Product[]> {
    return this.findAll().pipe(
      map((products: Product[]) => (products || [])
        .sort((a, b) => (b.ratings ?? 0) - (a.ratings ?? 0))
        .slice(0, 5)
      )
    );
  }
 }
