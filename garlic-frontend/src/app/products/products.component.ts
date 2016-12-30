import { Component, OnInit } from '@angular/core';
import { Product, ProductsService } from './products.service';

@Component( {
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

    products: Product[];

    constructor( private productsService: ProductsService ) { }

    ngOnInit() {
        this.productsService
            .getAllProducts()
            .subscribe(p => this.products = p);
    }

}
