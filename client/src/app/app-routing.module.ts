import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { AllProductsComponent } from './components/all-products/all-products.component';

const routes: Routes = [
  { path: '', pathMatch: 'full',  redirectTo: 'add-product' },
  { path: 'all-product', component: AllProductsComponent },
  { path: 'add-product', component: AddProductComponent },
  { path: 'edit-proudct/:id', component: ProductDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
