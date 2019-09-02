import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import {NgSelectModule, NgOption} from '@ng-select/ng-select';

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
  public symptoms: Array<string>;
  public selectedSymptoms: Array<string> = [];

  constructor(
    public productServive: ProductService,
    public activateRoute: ActivatedRoute,
    public notificationService: NotificationService
  ) {}

  public ngOnInit(): void {
    this.search = '';
    this.mountSymptoms();
    this.selectedSymptoms = [];
    // this.products = this.activateRoute.snapshot.data.products;
    // this.listOfProducts();
  }

  private mountSymptoms(): void {
    this.symptoms = [];
    this.symptoms.push('FEBRE ALTA');
    this.symptoms.push('DOR DE CABEÇA');
    this.symptoms.push('DORES NOS MÚSCULOS');
    this.symptoms.push('DORES NAS ARTICULAÇÕES');
    this.symptoms.push('CALAFRIOS');
    this.symptoms.push('TOSSE');
    this.symptoms.push('FALTA DE APETITE');
    this.symptoms.push('VÔMITO');
    this.symptoms.push('FALTA DE AR');
    this.symptoms.push('DESCONFORTO RESPIRATÓRIO');
    this.symptoms.push('DIARREIA');
    this.symptoms.push('VISÃO BORRADA');
    this.symptoms.push('ZUMBIDO NO OUVIDO');
    this.symptoms.push('TONTURA');
    this.symptoms.push('DORES NO PEITO');
    this.symptoms.push('VONTADE FREQUENTE DE URINA');
    this.symptoms.push('FOME EXCESSIVA');
    this.symptoms.push('SEDE EXCESSIVA');
    this.symptoms.push('EMAGRECIMENTO');
    this.symptoms.push('NÁUSEA');
    this.symptoms.push('MUDANÇAS DE HUMOR');
    this.symptoms.push('NERVOSISMO');
    this.symptoms.push('FADIGA');
    this.symptoms.push('FRAQUEZA');
    this.symptoms.push('IRRITAÇÃO');
    this.symptoms.push('CORIZA');
    this.symptoms.push('ESPIRRO');
    this.symptoms.push('CONGESTÃO NASAL');
    this.symptoms.push('INCHAÇO NOS OLHOS');
    this.symptoms.push('PURIDO NASAL INTENSO');
    this.symptoms.push('CHAIDO NO PEITO');
    this.symptoms.push('COCEIRA NA GARGANTA');
    this.symptoms.push('BOCA SECA');
    this.symptoms.push('CALAFRIOS');
    this.symptoms.push('FADIGA');
    this.symptoms.push('INDIGESTÃO');
    this.symptoms.push('QUEIMAÇÃO');
    this.symptoms.push('PERDA DE APETITE');
    this.symptoms.push('DORES ABDOMINAIS');
    this.symptoms.push('FEZES ESCURAS');
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
    this.notificationService.setServerIndisponible();
    this.listOfProducts();
  }

  public ngOnDestroy(): void {}

}
