const midi = require('@julusian/midi');
const input = new midi.Input();
input.getPortCount()
input.getPortName(0)

input.on('message', (deltaTime, message ) => {
  console.log(`tecla pulsada ${message}`)
});

input.openPort(0)
