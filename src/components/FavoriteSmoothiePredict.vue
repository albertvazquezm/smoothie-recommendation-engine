<template>
  <div>
    <h4 class="title is-4">Generate 4 you will love 😇. And 4 you will hate 👹</h4>
    <button
        v-if="!trained"
        disabled
        @click="onClickOnPredict()"
        class="button is-large is-primary"
      >Generate</button>
    <button v-if="trained" @click="onClickOnPredict()" class="button is-large is-primary">Generate</button>
    <div v-if="predictionLove.length" class="smoothie-list-wrapper">
        <div class="smoothie-list is-love">
            <h5 class="title is-5">You will love 😇</h5>
            <ul>
                <li v-for="(prediction, idx) in predictionLove" :key="idx"><Smoothie :ingredients="prediction.smoothie"></Smoothie></li>
            </ul>
        </div>
        <div class="smoothie-list is-hate">
            <h5 class="title is-5">You will hate 👹</h5>
            <ul>
                <li v-for="(prediction, idx) in predictionHate" :key="idx"><Smoothie :ingredients="prediction.smoothie"></Smoothie></li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
import { Ingredient } from "../constants/Ingredient";
import { RandomSmoothieGenerator } from '../services/RandomSmoothieGenerator';
import { SmoothieScorePredictor } from '../services/SmoothieScorePredictor';
import Smoothie from "./Smoothie";

let smoothieScorePredictorInstance;

export default {
    props: ['trainedData'],
    components: {
        Smoothie
    },
    created() {
        smoothieScorePredictorInstance = new SmoothieScorePredictor();
    },
    data() {
        return {
            trained: false,
            predictIngredients: [],
            predictionLove: [],
            predictionHate: [],
            ingredients: Ingredient
        }
    },
    methods: {
        onClickOnPredict() {
            const predictedResults = new Array(40).fill("").map(() => ({
                smoothie: RandomSmoothieGenerator.generateRandomSmoothie(4),
                score: 0
            })).map(smoothie => {
                smoothie.score = smoothieScorePredictorInstance.predict(smoothie.smoothie).score;
                return smoothie
            }).sort((a, b) => {
                return a.score - b.score
            });
            this.predictionHate = predictedResults.slice(0, 4);
            this.predictionLove = predictedResults.slice(-4);
        }
    },
    watch: {
        trainedData(trainedData) {
            this.trained = true
            smoothieScorePredictorInstance.train(trainedData);
        }
    }
}
</script>

<style lang="scss" scoped>
.predict-selectors {
    display: flex;
    justify-content: center;
    align-items: center;
    .predict-list {
        li {
            margin: 10px;
        }
    }
    .button {
    margin: 10px;
    }
}
.prediction-score {
    font-size: 30px;
}
.smoothie-list-wrapper {
    display: flex;
    margin-top: 20px;
    .title {
        margin-bottom: 10px;
    }
    .smoothie-list {
        flex: 1;
    }
}
</style>