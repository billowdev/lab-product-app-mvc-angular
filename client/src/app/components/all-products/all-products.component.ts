import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/services/crud.service';
import { ProductModel } from '../../models/product.model';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  Products!:ProductModel[]

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService.GetProducts().subscribe(res=>{
      console.log("allproduct",typeof(res))
      this.Products = res
      console.log(res)
    })
  }

  delete(id:any, idx:any){
    console.log(id)
    if(window.confirm("Do you want to delete?")){
      this.crudService.deleteProduct(id).subscribe((res)=>{
        this.Products.splice(idx, 1);
      })
    }
  }

}
