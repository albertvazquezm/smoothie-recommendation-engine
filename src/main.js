import Vue from 'vue';
import App from './App.vue';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

import './style/index.scss';
import { SmoothieNeuralNet } from './services/SmoothieNeuralNet';

Vue.config.productionTip = false;

// Register service workers
if ('serviceWorker' in navigator) {
  runtime.register().then((registration) => {
    SmoothieNeuralNet.setOnPredict((data) => {
      registration.active.postMessage({type: 'predict', data});
    });
    SmoothieNeuralNet.setOnTrain((data) => {
      registration.active.postMessage({type: 'train', data});
    });
    registration.active.onmessage = (message) => {
      SmoothieNeuralNet.onResult(message.data)
    }
  });
}

new Vue({
  render: h => h(App),
}).$mount('#app')
