import {NeuralNetwork} from 'brain.js';
import { Ingredient } from '../constants/Ingredient';

let onTrain;
let onPredict;
let globRes;

export class SmoothieNeuralNet {
    static setOnTrain(cb) {
        onTrain = cb;
    }
    static setOnPredict(cb) {
        onPredict = cb;
    }
    static train(smoothies) {
        const trainingData = smoothies.map(smoothie => {
            const input = {};
            Object.keys(Ingredient).forEach((key) => {
                input[key] = smoothie.smoothie.indexOf(key) !== -1 ? 1 : 0;
            });
            return {
                input,
                output: {score: smoothie.score}
            }
        });
        onTrain(trainingData);
    }
    static predict(smoothie) {
        const input = {};
        Object.keys(Ingredient).forEach((key) => {
            input[key] = smoothie.indexOf(key) !== -1 ? 1 : 0;
        });
        onPredict(input);
        return new Promise(res => globRes = res);
    }
    static onResult(score) {
        globRes(score);
    }
}

