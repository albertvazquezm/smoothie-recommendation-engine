<template>
  <div id="app">
    <section class="header has-text-centered">
      <h1 class="title is-1">🍍 Smoothie Recommendation Engine 🍍</h1>
    </section>
    <section class="train">
      <div class="section-content has-text-centered">
        <h2 class="title is-2">Train</h2>
        <h4 class="title is-4">Rate the smoothies according to your taste</h4>
        <ul class="train-list">
          <li v-for="item in trainData" :key="item.uuid">
            <Smoothie :ingredients="item.smoothie"></Smoothie>
            <StarRating v-model="item.score"></StarRating>
          </li>
        </ul>
        <button @click="onClickOnTrain()" class="button is-large is-primary m-5">Train</button>
        <button @click="onClickOnReset()" class="button is-large m-5">Reset</button>
      </div>
    </section>
    <section class="predict">
      <div class="section-content has-text-centered">
        <h2 class="title is-2">Predict</h2>
        <h4 class="title is-4">Build a smoothie. The model will predict how much will you like it 🙌</h4>
        <div class="predict-selectors">
          <ul class="predict-list">
            <li class="select is-large">
              <select v-model="predictIngredients[0]">
                <option
                  v-for="(ingredient, key) in ingredients"
                  :key="key"
                  :value="key"
                >{{ingredient}}</option>
              </select>
            </li>
            <li class="select is-large">
              <select v-model="predictIngredients[1]">
                <option
                  v-for="(ingredient, key) in ingredients"
                  :key="key"
                  :value="key"
                >{{ingredient}}</option>
              </select>
            </li>
            <li class="select is-large">
              <select v-model="predictIngredients[2]">
                <option
                  v-for="(ingredient, key) in ingredients"
                  :key="key"
                  :value="key"
                >{{ingredient}}</option>
              </select>
            </li>
            <li class="select is-large">
              <select v-model="predictIngredients[3]">
                <option
                  v-for="(ingredient, key) in ingredients"
                  :key="key"
                  :value="key"
                >{{ingredient}}</option>
              </select>
            </li>
          </ul>
          <button
            v-if="!trained"
            disabled
            @click="onClickOnPredict()"
            class="button is-large is-primary"
          >Predict</button>
          <button
            v-if="trained"
            @click="onClickOnPredict()"
            class="button is-large is-primary"
          >Predict</button>
        </div>
        <StarRating :value="prediction"></StarRating>
        <span class="prediction-score">{{parseInt(prediction * 100)}}%</span>
      </div>
    </section>
    <section class="section-info has-text-centered">
      <p>
        Made with ❤️ by
        <a href="https://github.com/albertvazquezm" target="_blank">Albert Vàzquez</a> using
        <a href="https://bulma.io/" target="_blank">bulma</a> and
        <a href="https://github.com/BrainJS/brain.js" target="_blank">brain.js</a>
      </p>
      <p>
        Want to give
        <a href="https://forms.gle/oDjfMNcgpmZg92vo9" target="_blank">feedback</a>?
      </p>
    </section>
  </div>
</template>

<script>
import Smoothie from "./components/Smoothie";
import StarRating from "./components/StarRating";
import * as uuid from "uuid";
import { RandomSmoothieGenerator } from "./services/RandomSmoothieGenerator";
import { Ingredient } from "./constants/Ingredient";
import { SmoothieNeuralNet } from "./services/SmoothieNeuralNet";

export default {
  name: "app",
  components: {
    Smoothie,
    StarRating
  },
  data() {
    return {
      net: "",
      trained: false,
      trainData: new Array(20).fill("").map(() => ({
        uuid: uuid.v4(),
        smoothie: RandomSmoothieGenerator.generateRandomSmoothie(4),
        score: 0
      })),
      prediction: 0,
      ingredients: Ingredient,
      predictIngredients: []
    };
  },
  methods: {
    onClickOnTrain() {
      SmoothieNeuralNet.train(this.trainData);
      this.trained = true;
    },
    onClickOnPredict() {
      if (!this.trained) {
        return;
      }
      SmoothieNeuralNet.predict(this.predictIngredients).then(res => {
        console.log('prom resolved', res);
        this.prediction = res;
      })
    },
    onClickOnReset() {
      this.trainData.forEach(item => (item.score = 0));
    }
  }
};
</script>

<style lang="scss">
.m-5 {
  margin: 5px;
}
#app {
  display: flex;
  justify-content: center;
  flex-direction: column;
  section {
    padding: 100px;
    display: flex;
    justify-content: center;
    .section-content {
      max-width: 1250px;
      width: 1250px;
    }
  }
  .header {
    background: #ff9f80;
    display: flex;
    flex-direction: column;
    h1 {
    }
  }
  section.train {
    .train-list {
      display: flex;
      flex-wrap: wrap;
      > li {
        flex: 1;
        padding: 10px;
        display: flex;
        justify-content: center;
        > div {
          margin: 0 10px;
        }
      }
    }
    .button {
      margin: 20px 5px 0 5px;
    }
  }
  section.predict {
    background: #effab4;
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
  }
  section.section-info {
    display: flex;
    flex-direction: column;
    p {
      font-size: 14px;
      padding: 5px;
    }
  }
}

@media (max-width: 750px) {
  #app {
    section {
      padding: 20px;
    }
    font-size: 10px;
  }
}
</style>
