/**
 * src/app/add-recipe/add-recipe.component.ts
 *
 * @author Bryan Henry <bryanhenry1980@gmail.com>
 * @license MIT
 * @since 04/23/2018
 */

import {Component, Inject, Input, OnInit} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CategoriesService} from "../categories.service";
import {ICategory} from "../interfaces/ICategory";

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {

  categories: ICategory[];
  @Input() title: string;
  @Input() category: string;
  @Input() description: string;

  constructor(
    private _categoriesService: CategoriesService,
    public dialogRef: MatDialogRef<AddRecipeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.getCategories();
  }

  save() {

     this._categoriesService.postCategoryItem(this.title, this.category, this.description).then(res => {
         this.dialogRef.close();
     });

  }

  getCategories() {
    this._categoriesService.getCategories().subscribe(
      data => { this.categories = data.categories},
      err => console.error(err),
      () => console.log('done loading categories')
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
