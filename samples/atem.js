const { Atem } = require('atem-connection')
const myAtem = new Atem()
// para poder realizar el keypresset en node.js
//const readline = require('readline');
// añadimos midi 
const midi = require('@julusian/midi');
const input = new midi.Input();
let opcion = false



input.getPortCount()
input.getPortName(0)

// *******+ codigo puff audio *****


//readline.emitKeypressEvents(process.stdin);
//if (process.stdin.isTTY) process.stdin.setRawMode(true);

myAtem.on('info', console.log)
myAtem.on('error', console.error)

myAtem.connect('192.168.1.148')

myAtem.on('connected', () => {
  console.log(myAtem.state)

})

input.on('message', (deltaTime, message ) => {
  console.log(`tecla pulsada ${message}`)

  if(message[1] == 8 && message[2] == 127) {
    myAtem.changeProgramInput(1).then(() => {
      console.log('Program input set 1')
    })
  }

  if(message[1] == 9 && message[2] == 127) {
    myAtem.changeProgramInput(2).then(() => {
      console.log('Program input set 2')
    })
  }
  if(message[1] == 10 && message[2] == 127) {
    myAtem.changeProgramInput(3).then(() => {
      console.log('Program input set 3')
    })
    }
  
  if(message[1] == 11 && message[2] == 127) {
    myAtem.changeProgramInput(4).then(() => {
      console.log('Program input set 4')
    })
  }
  if(message[1] == 1){
    faderGain = convertirRango(message[2])
    myAtem.setFairlightAudioMixerSourceProps(1,'-65280',{faderGain})

  }
  if(message[1] == 9){
    faderGain = convertirRango(message[2])
    myAtem.setFairlightAudioMixerMasterProps({faderGain})
    }
  
    if(message[1] == 0 && message[2] == 127){
      mixOption = opcionMix() 
      myAtem.setFairlightAudioMixerSourceProps(1,'-65280',{mixOption})
    }

})

input.openPort(0)

//funcion para cambiar de on a off
const opcionMix = () => {
  
  if (opcion){
    opcion = false
    return 2
  }else{
    opcion = true
    return 1
  }   
}

// funcion de conversion de rango de audio
const convertirRango = (valor) => {
  let rangoOriginal = 127;
  let valorMinimoOriginal = 0;
  let rangoNuevo = 1000 - (-10000);
  let valorMinimoNuevo = -10000;

  let valorConvertido = ((valor - valorMinimoOriginal) * rangoNuevo / rangoOriginal) + valorMinimoNuevo;
  return valorConvertido;
}



// codigo an no necesario.

//myAtem.on('stateChanged', (state, pathToChange) => {
//	console.log("cambia") // catch the ATEM state.
//})







