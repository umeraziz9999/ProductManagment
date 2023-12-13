import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss'],
})
export class ViewProductComponent implements OnInit {
  products: Product[] = [];
  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.initData();
  }

  initData() {
    this.productService.getProducts().subscribe({
      next: (res: any) => {
        console.log('Products fetched:', res);
        this.products = res;
      },
      error: (error) => {
        console.error('Oops!! Failed to fetch products:', error);
      },
    });
  }

  deleteProduct(id: string) {
    this.productService.deleteProducts(id).subscribe({
      next: (res: any) => {
        alert('Product Deleted');
        this.initData();
      },
      error: (error) => {
        console.error('Oops!! Failed to delete product', error);
      },
    });
  }
  editProduct(id: string) {
    this.router.navigate([`/edit/${id}`]);
  }
}
