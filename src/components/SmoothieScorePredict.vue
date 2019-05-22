<template>
  <div>
    <h4 class="title is-4">Build a smoothie. The model will predict how much will you like it 🙌</h4>
    <div class="predict-selectors">
      <ul class="predict-list">
        <li class="select is-large">
          <select v-model="predictIngredients[0]">
            <option v-for="(ingredient, key) in ingredients" :key="key" :value="key">{{ingredient}}</option>
          </select>
        </li>
        <li class="select is-large">
          <select v-model="predictIngredients[1]">
            <option v-for="(ingredient, key) in ingredients" :key="key" :value="key">{{ingredient}}</option>
          </select>
        </li>
        <li class="select is-large">
          <select v-model="predictIngredients[2]">
            <option v-for="(ingredient, key) in ingredients" :key="key" :value="key">{{ingredient}}</option>
          </select>
        </li>
        <li class="select is-large">
          <select v-model="predictIngredients[3]">
            <option v-for="(ingredient, key) in ingredients" :key="key" :value="key">{{ingredient}}</option>
          </select>
        </li>
      </ul>
    </div>
    <button
        v-if="!trained"
        disabled
        @click="onClickOnPredict()"
        class="button is-large is-primary"
      >Predict</button>
      <button v-if="trained" @click="onClickOnPredict()" class="button is-large is-primary">Predict</button>
    <StarRating :value="prediction"></StarRating>
    <span class="prediction-score">{{parseInt(prediction * 100)}}%</span>
  </div>
</template>

<script>
    import { Ingredient } from "../constants/Ingredient";
    import { SmoothieScorePredictor } from "../services/SmoothieScorePredictor";
    import StarRating from "../components/StarRating";

    let smoothieScorePredictorInstance;

    export default {
        props: ['trainedData'],
        components: {
          StarRating
        },
        created() {
            smoothieScorePredictorInstance = new SmoothieScorePredictor();
        },
        data() {
            return {
              trained: false,
                predictIngredients: [],
                prediction: 0,
                ingredients: Ingredient
            }
        },
        methods: {
            onClickOnPredict() {
                this.prediction = smoothieScorePredictorInstance.predict(this.predictIngredients).score;
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
    
}
.button {
  margin: 10px;
}
.prediction-score {
    font-size: 30px;
}
</style>