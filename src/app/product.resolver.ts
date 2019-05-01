import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

// SERVICE
import { ProductService } from './product.service';

// MODEL
import { Product } from './Product';

@Injectable({ providedIn: 'root' })
export class ProductResolver implements Resolve<Observable<Array<Product>>> {

	constructor(private productService: ProductService) {}
	
	public resolve(): any {
		return this.productService.listAllProducts('');
	}

}
