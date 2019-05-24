import {NeuralNetwork} from 'brain.js';

let net;

addEventListener('activate', () => {
    net = new NeuralNetwork({hiddenLayers: [3], activation: 'sigmoid'});
})

onmessage = (event) => {
    const message = event.data;
    console.log('received message', message);
    debugger;
    switch(message.type) {
        case 'train': net.train(message.data); break;
        case 'predict': self.postMessage({type: 'prediction', data: net.run(message.data)}); break;
    }
}