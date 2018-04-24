/**
 * src/categories.service.ts
 *
 * @author Bryan Henry <bryanhenry1980@gmail.com>
 * @license MIT
 * @since 04/23/2018
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import {Observable} from 'rxjs/Observable';
import {IItem} from "./interfaces/IItem";
import {Subject} from "rxjs/Subject";
import {IResponse} from "./interfaces/IResponse";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CategoriesService {

  private items = new Subject<IItem[]>();
  private _items: IItem[];

  constructor(private http:HttpClient) {
  }

  /**
   * Get observable for list.
   * @returns {Observable<any>}
   */
  getItemList(): Observable<any> {
    return this.items.asObservable();
  }

  /**
   * Send message to observable.
   * @param {IItem[]} items
   */
  setItemList(items: IItem[]): void {

    this._items = items;
    this.items.next(items);

  }

  /**
   * Clear items observable.
   */
  clearItemList(): void {

    this.items.next();

  }

  /**
   * Return a collection of all categories.
   *
   * @returns {Observable<any>}
   */
  getCategories(): Observable<any> {

    return this.http.get(`${environment.apiUrl}/api/categories`);

  }

  /**
   * Return collection of items in a category.
   *
   * @param {string} id
   * @returns {Observable<any>}
   */
  getCategoryItems(id: string): void {

    this.http.get(`${environment.apiUrl}/api/categories/${id}`).toPromise().then((res: IResponse) => this.setItemList(res.items));

  }

  /**
   * Return a single item
   *
   * @param {string} categoryId
   * @param {number} recipeId
   * @returns {Observable<any>}
   */
  getCategoryItem(categoryId: string, recipeId: number): Observable<any> {

    return this.http.get(`${environment.apiUrl}/api/categories/${categoryId}/${recipeId}`);

  }

  /**
   * Send a new recipe to the server.
   *
   * @param {string} name
   * @param {string} categoryId
   * @param {string} description
   * @returns {Promise<any>}
   */
  async postCategoryItem(name: string, categoryId: string, description: string): Promise<any>
  {

    this.http.post(`${environment.apiUrl}/api/categories/${categoryId}`, {name: name, description: description})
             .toPromise()
             .then((x: IItem) => {

               if(categoryId.toLowerCase() === this._items[0].category) {
                 this._items.push(x);
                 this.setItemList(this._items);
               }
             }
             );

  }

}
