/**
 * src/app/category/category.component.ts
 *
 * @author Bryan Henry <bryanhenry1980@gmail.com>
 * @license MIT
 * @since 04/23/2018
 */

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IItem} from "../interfaces/IItem";
import {CategoriesService} from "../categories.service";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {

  items: IItem[];
  category: string;
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private _categoriesService: CategoriesService, private http:HttpClient) {

    this.subscription = this._categoriesService.getItemList().subscribe(list => this.items = list);

    this.route.params.subscribe( params => {

      this.category = params['category'];
      this._categoriesService.getCategoryItems(params['category']);

    });


  }

  ngOnInit() {

  }

}
