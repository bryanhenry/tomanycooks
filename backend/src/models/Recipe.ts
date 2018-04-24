/**
 * src/models/Recipe.ts
 *
 * @author Bryan Henry <bryanhenry1980@gmail.com>
 * @copyright MIT
 * @since 04/24/2018
 *
 */

import mongoose from "mongoose";

// Type script def.
export type RecipeModel = mongoose.Document & {
    name: string;
    description: string;
    imageUrl: string;
    category: string;
    save(): string;

};

// Define mongoose schema.
const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    }
}, { timestamps: true });

// Build exportable.
const Recipe = mongoose.model("RecipeModel", recipeSchema);

export default Recipe;
