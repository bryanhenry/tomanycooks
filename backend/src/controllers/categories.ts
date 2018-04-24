/**
 * src/controllers/categories.ts
 *
 * @author Bryan Henry <bryanhenry1980@gmail.com
 * @license MIT
 * @since 04/28/2018
 */


"use strict";

import { Response, Request, NextFunction } from "express";
import { category } from '../types/category';
import {RecipeComponent} from "../../../frontend/src/app/recipe/recipe.component";
import Recipe, {RecipeModel} from "../models/Recipe";

/**
 * GET /api/categories
 *
 * List all categories.
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
export const getCategories = (req: Request, res: Response) => {

  let categories: object = {
      categories: [
          {id: "1", name: "Breakfast", imageUrl: "http://localhost:3000/img/breakfast.jpg"},
          {id: "2", name: "Lunch", imageUrl: "http://localhost:3000/img/lunch.jpg"},
          {id: "3", name: "Dinner", imageUrl: "http://localhost:3000/img/dinner.jpeg"},
          {id: "4", name: "Snacks", imageUrl: "http://localhost:3000/img/snacks.jpeg"},
          {id: "5", name: "Soups", imageUrl: "http://localhost:3000/img/soups.jpeg"},
          {id: "6", name: "Vegetarian", imageUrl: "http://localhost:3000/img/vegetarian.jpg"},
          {id: "7", name: "Salads", imageUrl: "http://localhost:3000/img/salads.jpg"},
          {id: "8", name: "Baking", imageUrl: "http://localhost:3000/img/baking.jpg"},
          {id: "9", name: "Desserts", imageUrl: "http://localhost:3000/img/desserts.jpg"},
          {id: "10", name: "Drinks", imageUrl: "http://localhost:3000/img/drinks.jpeg"}
      ]
  };

  res.send(categories);

};

/**
 * GET /api/categories/{name}
 *
 * @param {e.Request} req
 * @param {e.Response} res
 * @returns {Promise<void>}
 */
export const getCategoryItems = async (req: Request, res: Response) => {


    let items: string[];

    if(req.params.category === 'all-recipes') {
        items = await Recipe.find({});
    } else {
       items = await Recipe.find({'category': req.params.category});
    }

    res.send({items: items});

};

/**
 * GET /api/categories/{name}/{id}
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
export const getCategoryItem = async (req: Request, res: Response) : void => {

    try {

        let item: Recipe = await Recipe.findById(req.params.id);
        res.send(item);

    } catch (err) {

        res.sendStatus(404);

    }

};

/**
 * POST /api/categories/{$name}
 *
 * @param {e.Request} req
 * @param {e.Response} res
 */
export const postCategoryItem = async (req: Request, res: Response) : void => {

    let recipe: RecipeModel = new Recipe();

    recipe.name = req.body.name;  // Set recipe name
    recipe.description = req.body.description; // Set recipe description.
    recipe.category = req.params.category.toLowerCase(); // Force lowercase.
    recipe.imageUrl = "https://marketplace.canva.com/MACO7RgxpQw/1/thumbnail_large/canva-chef-hat-silhouette-icon-MACO7RgxpQw.png"; // Set default image.

    await recipe.save();

    res.send(recipe);

};
