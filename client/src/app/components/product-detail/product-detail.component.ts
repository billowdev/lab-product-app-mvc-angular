import { Component, NgZone, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router'
import { CrudService } from 'src/app/services/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  getId: any;
  updateForm!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
     private router: Router, 
     private ngZone: NgZone,
    private activatedRoute : ActivatedRoute,
    private crudService: CrudService) 
    {
      this.getId = this.activatedRoute.snapshot.paramMap.get('id');

      // this.crudService.GetProduct(this.getId).subscribe(res=>{
      //   this.updateForm.setValue({
      //     name: res['name'],
      //     detail: res['detail'],
      //     price: res['price']
      //   })
      // })

      
    }

  ngOnInit(): void {
  }

}
