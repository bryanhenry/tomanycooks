/**
 * src/app/app.component.ts
 *
 * @author Bryan Henry <bryanhenry1980@gmail.com>
 * @license MIT
 * @since 04/23/2018
 */

import {AfterViewInit, Component, Input, ViewEncapsulation} from '@angular/core';
import {CategoriesService} from "./categories.service";
import {ICategory} from "./interfaces/ICategory";
import {AddRecipeComponent} from "./add-recipe/add-recipe.component";
import {MatDialog} from "@angular/material";

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @Input() searchText: string;
  categories: ICategory[];

  constructor(private _categoriesService: CategoriesService, public dialog: MatDialog) { }

  addRecipe(): void {
    let dialogRef = this.dialog.open(AddRecipeComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }


  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
       this._categoriesService.getCategories().subscribe(
            data => { this.categories = data.categories},
          err => console.error(err),
            () => console.log('done loading categories')
        );
   }

}
