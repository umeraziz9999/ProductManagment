import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  addProductForm: FormGroup;
  isSubmitted: boolean = false;
  isEdit: boolean = false;
  editId: string = '';
  btnText : string = 'Add Product'
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.params.subscribe((res) => {
      this.editId = res.id;
      console.log("this.editId");
      console.log(this.editId);
      if (this.editId) {
        this.isEdit = true;
        this.btnText = 'Update Product'

      }
    });
    this.addProductForm = this.formBuilder.group({
      productName: ['', Validators.required],
      price: [
        null,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      quantity: [
        null,
        [
          Validators.required,
          Validators.min(0),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
    });
  }

  ngOnInit(): void {
    if (this.isEdit) {
      this.getEditProduct();
    }
  }

  getEditProduct() {
    this.productService.getProductById(this.editId).subscribe({
      next: (res: any) => {
        this.addProductForm.controls['productName'].setValue(res.productName);
        this.addProductForm.controls['price'].setValue(parseInt(res.price));
        this.addProductForm.controls['quantity'].setValue(
          parseInt(res.quantity)
        );
      },
    });
  }

  addproduct() {
    this.isSubmitted = true;
    if (!this.addProductForm.invalid) {
      if (this.isEdit) {
        this.productService
          .editProducts(this.editId, this.addProductForm.value)
          .subscribe({
            next: (res) => {
              console.log('Product Updated');
              alert('Product Updated');
              this.router.navigate(['/'])
            },
          });
      } else {
        this.productService.addProducts(this.addProductForm.value).subscribe({
          next: (res) => {
            console.log('Product Added');
            alert('Product Added');
            this.router.navigate(['/'])
          },
        });
      }
    }
  }
}
