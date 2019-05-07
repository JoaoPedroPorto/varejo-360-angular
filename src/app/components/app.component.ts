import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// SERVICE
import { ProductService } from '../services/product.service';
import { NotificationService } from '../services/notification.service';

// MODEL
import { Product } from '../models/Product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  public search: string;
  public products: Array<Product> = [];

  constructor(
    public productServive: ProductService,
    public activateRoute: ActivatedRoute,
    public notificationService: NotificationService
  ) {}

  public ngOnInit(): void {
    this.search = '';
    // this.products = this.activateRoute.snapshot.data.products;
    this.listOfProducts();
  }

  public async listOfProducts(): Promise<void> {
    try {
      const response: any = await this.productServive.listAllProducts(this.search).toPromise();
      this.products = response.data;
      if (this.products.length !== 0) {
        this.notificationService.notify('Listagem de produtos retornada com sucesso...', 200);
      }
    } catch (err) {
      console.log(err);
    }
  }

  public filter(): void {
    if (this.search.length > 0 && this.search.trim().length === 0) {
      this.products = [];
      return;
    }
    this.listOfProducts();
  }

  public ngOnDestroy(): void {}

}
