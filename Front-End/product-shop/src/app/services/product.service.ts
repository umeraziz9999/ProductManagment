import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) {}

  getProducts() {
    return this.httpClient.get(`${this.baseUrl}/GetProductList`)
  }

  getProductById(id: string) {
    return this.httpClient.get(`${this.baseUrl}/${id}`);
  }

  addProducts(data: Product) {
    return this.httpClient.post(`${this.baseUrl}/AddProduct`, data);
  }

  editProducts(id: string, data: Product) {
    data.productId = id;
    return this.httpClient.put(`${this.baseUrl}/${id}`, data);
  }

  deleteProducts(productId: string) {
    return this.httpClient.delete(`${this.baseUrl}/${productId}`);
  }
}
