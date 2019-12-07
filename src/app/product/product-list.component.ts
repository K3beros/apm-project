import { Component, OnInit } from '@angular/core';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})



export class ProductListComponent implements OnInit {
    private _productService;

    pageTitle = 'Product List'
    imageWidth = 50;
    imageMargin = 2;
    _listFilter: string;
    errorMessage: string;
    get listFilter(){
      return this._listFilter;
    }
    set listFilter(value: string) {
      this._listFilter = value;
      this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }
    showImage = false;
    filteredProducts: IProduct[];
    products: IProduct[];


      //alternate option is to declare private accessor in constructor like:(private productService: ProductService)
      //constructor is executed before ngOnInit()
      constructor(productService: ProductService) {
        this._productService = productService;
      }

      performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => 
              product.productName.toLocaleLowerCase().indexOf(filterBy) !=-1 );
      }

      toggleImage(): void {
          this.showImage = !this.showImage;
      }
      
      onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;

      }

      ngOnInit(): void {
        this._productService.getProducts().subscribe(
          products => {
            this.products = products;
            this.filteredProducts = this.products;
          },
          error => this.errorMessage = <any>error
        );
      }
}
