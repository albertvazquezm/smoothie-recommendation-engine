import {NeuralNetwork} from 'brain.js';
import { Ingredient } from '../constants/Ingredient';

export class FavoriteSmoothiePredictor {
    constructor() {
        this.net = new NeuralNetwork({hiddenLayers: [3], activation: 'sigmoid'});
    }
    train(smoothies) {
        const trainingData = smoothies.map(smoothie => {
            const output = {};
            Object.keys(Ingredient).forEach((key) => {
                output[key] = smoothie.smoothie.indexOf(key) !== -1 ? 1 : 0;
            });
            return {
                input: {score: smoothie.score},
                output
            }
        });
        this.net.train(trainingData);
    }
    predict() {
        return this.net.run({score: 1})
    }
}

