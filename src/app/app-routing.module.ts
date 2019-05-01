import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// COMPONENT
import { AppComponent} from './app.component';

// RESOLVER

import { ProductResolver } from './product.resolver';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    resolve: { products: ProductResolver }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
