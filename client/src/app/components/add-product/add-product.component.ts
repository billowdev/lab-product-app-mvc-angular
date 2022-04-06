import { Component, OnInit, NgZone } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CrudService } from 'src/app/services/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm!: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private curdService: CrudService
  ) {
    this.productForm = this.formBuilder.group({
      name: [''],
      price: [''],
      detail: ['']
    })
  }

  ngOnInit(): void {
  }

  onSubmit(): any {
    this.curdService.AddProduct(this.productForm.value).subscribe(()=>{
      console.log("add product successfuly")
      this.ngZone.run(()=>this.router.navigateByUrl('/all-product'))
    }, (err)=>{console.log(err)});
  }

}
