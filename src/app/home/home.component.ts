import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormArray } from '@angular/forms';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public products = [
    'bottle of wine',
    'box of headache pills',
    'box of pens',
    'book',
    'chocolate'
  ];
  public finalPrice:Number = 0;
  public finalTax:Number = 0;
  public isInvoice = false;
  public isList = true;

  productForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.isInvoice = false;
    this.isList = true;
    this.productForm = this.fb.group({
      items: this.fb.array([this.createItem()])
    });
  }

  createItem(): FormGroup {
    return this.fb.group({
      name: new FormControl('name', Validators.required),
      quantity: new FormControl('quantity', Validators.required),
      price: new FormControl('price', Validators.required)
    });
  }

  addItem(): void {
    (<FormArray>this.productForm.controls.items).push(this.createItem());
    console.log(this.productForm.controls.items['controls']);
  }

  removeItem(control, index) {
    (<FormArray>this.productForm.controls.items).removeAt(index);
  }

  public backToList = () => {
    this.isInvoice = false;;
    this.isList = true;

  }


  public generateInvoice = () => {
    this.isInvoice = true;
    this.isList = false;
    for (const i of this.productForm.value.items) {
      if (i.name === this.products[1]) {
        i.tax = 0;
        i.totalPrice = i.quantity * i.price + i.quantity * i.tax;
        i.totalTax = i.quantity * i.tax;
        this.finalPrice = this.finalPrice + i.totalPrice;
        this.finalTax = this.finalTax + i.totalTax;
      } else {
        i.tax = 0.2 * i.price;
        i.totalPrice = i.quantity * i.price + i.quantity * i.tax;
        i.totalTax = i.quantity * i.tax;
        this.finalPrice = this.finalPrice + i.totalPrice;
        this.finalTax = this.finalTax + i.totalTax;
      }
    }
  }
}

