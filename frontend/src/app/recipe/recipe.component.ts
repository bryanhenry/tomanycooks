/**
 * src/app/recipe/recipe.component.ts
 *
 * @author Bryan Henry <bryanhenry1980@gmail.com>
 * @license MIT
 * @since 04/23/2018
 */

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CategoriesService} from "../categories.service";
import {IItem} from "../interfaces/IItem";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  categoryId: string;
  recipeId: number;
  item: IItem;

  constructor(private route: ActivatedRoute, private _categoriesService: CategoriesService) {
    this.route.params.subscribe( params => { this.categoryId = params['category']; this.recipeId = params['recipeId']; });
  }

  ngOnInit() {

    this.getCategoryItem(this.categoryId, this.recipeId);

  }

  getCategoryItem(categoryId: string, recipeId: number) {
    this._categoriesService.getCategoryItem(categoryId, recipeId).subscribe(
      data => { this.item = data},
      err => console.error(err),
      () => console.log('done loading item')
    );
  }
}
