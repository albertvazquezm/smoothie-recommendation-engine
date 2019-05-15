import { Ingredient } from "../constants/Ingredient";
import * as RandomNumber from 'random-number';

export class RandomSmoothieGenerator {
    static generateRandomSmoothie(numIngredients) {
        const ingredients = Object.keys(Ingredient);
        return new Array(numIngredients).fill('').map(() => {
           const randomIndex = RandomNumber({min: 0, max: ingredients.length - 1, integer: true});
           return ingredients.splice(randomIndex, 1)[0];
        })
    }
}