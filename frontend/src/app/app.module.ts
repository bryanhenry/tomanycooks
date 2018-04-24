/**
 * src/app/app.module.ts
 *
 * @author Bryan Henry <bryanhenry1980@gmail.com>
 * @license MIT
 * @since 04/23/2018
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule, MatDialogModule, MatGridListModule,
  MatIconModule, MatInputModule,
  MatMenuModule, MatOptionModule, MatSelectModule,
  MatSidenavModule
} from "@angular/material";
import {MatToolbarModule} from '@angular/material/toolbar';
import { RecipeComponent } from './recipe/recipe.component';
import { CategoriesService} from "./categories.service";
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FilterSearchPipe } from './filter-search.pipe';
import { CategoryComponent } from './category/category.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { HighlightPipe } from './highlight.pipe';


const appRoutes: Routes = [
  { path: '', redirectTo: '/all-recipes', pathMatch: 'full'},
  { path: ':category',      component: CategoryComponent },
  { path: ':category/:recipeId',      component: RecipeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    CategoryComponent,
    FilterSearchPipe,
    CategoryComponent,
    AddRecipeComponent,
    HighlightPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    MatGridListModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )

  ],
  providers: [CategoriesService],
  bootstrap: [AppComponent],
  entryComponents: [
    AddRecipeComponent,
    CategoryComponent
  ]
})
export class AppModule { }
