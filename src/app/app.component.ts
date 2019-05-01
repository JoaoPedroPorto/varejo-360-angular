import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// SERVICE
import { ProductService } from './product.service';
import { ToastrService } from 'ngx-toastr';

// MODEL
import { Product } from './Product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  public search: string;
  public loading: boolean;
  public products: Array<Product> = [];

  constructor(
    public toastrService: ToastrService,
    public productServive: ProductService,
    public activateRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.search = '';
    // this.products = this.activateRoute.snapshot.data.products;
    this.filterListOfProducts();
  }

  public async filterListOfProducts(): Promise<void> {
    try {
      this.loading = true;
      const response: any = await this.productServive.listAllProducts(this.search).toPromise();
      this.products = response.data;
      this.loading = false;
      this.toastrService.success('Listagem de produtos retornada com sucesso...', 'Sucesso!');
    } catch (err) {
      console.log(err);
      this.toastrService.error('', '');
      console.log(err);
    }
  }

  public ngOnDestroy(): void {}

}
