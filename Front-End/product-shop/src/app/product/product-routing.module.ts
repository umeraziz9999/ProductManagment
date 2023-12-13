import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ViewProductComponent } from './components/view-product/view-product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent,
    children: [
      {
        path:'',
        redirectTo:'view',
        pathMatch:'full'
      },
      {
        path:'add',
        component:AddProductComponent
      },
      {
        path:'edit/:id',
        component:AddProductComponent
      },
      {
        path:'view',
        component:ViewProductComponent
      }
     
  ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
