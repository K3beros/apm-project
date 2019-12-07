import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';


import { IProduct } from './product';
import { ProductService } from './product.service';


@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  errorMessage = '';
  product: IProduct;
  imageWidth = 150;
  imageMargin = 2;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) { }

  ngOnInit() {
    let id =  + this.route.snapshot.paramMap.get('id');
    if(id) {
     this.getProduct(id)
    }
    console.log(this);
    }

  getProduct(id: number) {
    console.log(this)
    this.productService.getProduct(id).subscribe(
      products=>this.product = products,
      error=>this.errorMessage = <any>error

    )
  }

    onBack(): void {
      this.router.navigate(['/products']);
    }

}
