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
          <li v-for="item in trainingData" :key="item.uuid">
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
        <div class="predict-examples">
          <div class="predict-example">
            <SmoothieScorePredict :trainedData="trainedData"></SmoothieScorePredict>
          </div>
          <div class="predict-example">
            <FavoriteSmoothiePredict :trainedData="trainedData"></FavoriteSmoothiePredict>
          </div>
        </div>
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
import SmoothieScorePredict from "./components/SmoothieScorePredict";
import FavoriteSmoothiePredict from "./components/FavoriteSmoothiePredict";
import * as uuid from "uuid";
import { RandomSmoothieGenerator } from "./services/RandomSmoothieGenerator";
import { Ingredient } from "./constants/Ingredient";

export default {
  name: "app",
  components: {
    Smoothie,
    StarRating,
    SmoothieScorePredict,
    FavoriteSmoothiePredict
  },
  data() {
    return {
      trained: false,
      trainingData: new Array(20).fill("").map(() => ({
        uuid: uuid.v4(),
        smoothie: RandomSmoothieGenerator.generateRandomSmoothie(4),
        score: 0
      })),
      trainedData: [],
      ingredients: Ingredient,
    };
  },
  methods: {
    onClickOnTrain() {
      this.trainedData = [...this.trainingData];
    },
    onClickOnReset() {
      this.trainingData.forEach(item => (item.score = 0));
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
    .predict-examples {
      display: flex;
      .predict-example {
        flex: 1;
        padding: 40px;
      }
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
