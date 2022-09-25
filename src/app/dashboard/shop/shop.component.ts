import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  shopCategoryList = ['Clothes', 'Shoes', 'Fruits'];
  categoryForm: any = FormGroup;

  fruitList = [
    {
      name: 'Apple',
      price: 200,
      category: 'Fruits',
      imageUrl:
        'https://post.healthline.com/wp-content/uploads/2020/10/apple-basket-apples-732x549-thumbnail-732x549.jpg',
    },
    {
      name: 'Pineapple',
      price: 150,
      category: 'Fruits',
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsgqbDMz3-kHuJbtSFgYYvV7AXiCXE_b8gWQ&usqp=CAU',
    },
    {
      name: 'Orange',
      price: 180,
      category: 'Fruits',
      imageUrl: 'https://cdn.britannica.com/24/174524-050-A851D3F2/Oranges.jpg',
    },
  ];

  clothList = [
    {
      name: 'T-shirt',
      price: 750,
      category: 'Clothes',
      imageUrl:
        'https://www.dedadur.dk/pic-1/Hackensack-b-toppe-tee-t-shirt-brewster-s-team-symbol_pics-55092.jpg',
    },
    {
      name: 'Formal',
      price: 840,
      category: 'Clothes',
      imageUrl:
        'https://cdn.shopify.com/s/files/1/0534/9041/7860/products/08_4d318a4d-b081-4921-9e2f-64eb9d627c40_900x.jpg?v=1645179771',
    },
    {
      name: 'Casual',
      price: 1200,
      category: 'Clothes',
      imageUrl:
        'https://www.dedadur.dk/pic-1/Hackensack-b-toppe-tee-t-shirt-brewster-s-team-symbol_pics-55092.jpg',
    },
  ];

  shoesList = [
    {
      name: 'Nike',
      price: 5000,
      category: 'Shoes',
      imageUrl:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=80',
    },
    {
      name: 'Adidas',
      price: 3220,
      category: 'Shoes',
      imageUrl:
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/run-adidas-running-shoes-1645131039.jpg',
    },
    {
      name: 'Sparx',
      price: 3450,
      category: 'Shoes',
      imageUrl:
        'https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/14009522/2022/7/1/485b3f80-a843-4f47-a73e-2163d678dd051656673588401-Sparx-Men-Grey-Mesh-Running-Shoes-3101656673588028-1.jpg',
    },
  ];

  public shopList: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      category: [''],
    });
    this.shopList = [...this.clothList, ...this.fruitList, ...this.shoesList];
  }

  changeType() {
    if (this.categoryForm.value.category === 'Clothes') {
      this.shopList = this.clothList;
    }
    if (this.categoryForm.value.category === 'Shoes') {
      this.shopList = this.shoesList;
    }
    if (this.categoryForm.value.category === 'Fruits') {
      this.shopList = this.fruitList;
    }
  }

  payNow(item: any) {
    let selectetItem = JSON.stringify({
      productName: item.name,
      price: item.price,
      category: item.category,
    });
    localStorage.setItem('selectetItem', selectetItem);
  }
}
