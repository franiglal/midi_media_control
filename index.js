const AtemMini = require('./src/atemMiniPro.js')
const midi = require('@julusian/midi')
const VLC = require('vlc-client');

const atemMini = new AtemMini('192.168.1.148',false)
const input = new midi.Input()
//conectar con vlc. IMPORTANTE: tiene que estar activado el html en vlc.
const vlc = new VLC.Client({
  ip: "localhost",
  port: 8080,
  //username: "steve_aoki", //username is optional
  password: "prueba"
});
let looping = 0

input.getPortCount()
input.getPortName(0)

atemMini.connect()

input.on('message', async (deltaTime, message ) => {
  console.log(`tecla pulsada ${message}`)
    
    let tipo  = message[0]
    let tecla = message[1]
    let valor = message[2]

    //Tecla pulsada

  if (tipo == 154){

    // - VLC -

    // play pause 
    if(tecla == 22 && valor == 127) await vlc.togglePlay()
    // stop 
    if(tecla == 21 && valor == 127) await vlc.stop()
    // siguiente 
    if(tecla == 19 && valor == 127) await vlc.next()
    // atras 
    if(tecla == 18 && valor == 127)  await vlc.previous()
    // loop  
    if(tecla == 20 && valor) {
      let control = loop()
      await vlc.setLooping(control)
    }

    // - ATEM MINI PRO -
    
    // camara 1
    if(tecla == 8 && valor == 127) atemMini.channelInput(1)
    // camara 2  
    if(tecla == 9 && valor == 127) atemMini.channelInput(2)
    // camara 3  
    if(tecla == 10 && valor == 127) atemMini.channelInput(3)
    // camara 4
    if(tecla == 11 && valor == 127) atemMini.channelInput(4)
    // downkey
    if(tecla == 16 && valor == 127) atemMini.downKey()

  } 

  // fader
  if (tipo == 186 ){

    // - VLC -

    // volumen de 0 a 100
    if(tecla == 8 ) await vlc.setVolume((rangoFader(valor)))

    // - Atem Mini Pro -

    // volumen cam 1
    if(tecla == 1) atemMini.faderChannel(1,valor)
    // volumen cam 2
    if(tecla == 2) atemMini.faderChannel(2,valor)
    // volumen cam 3
    if(tecla == 3) atemMini.faderChannel(3,valor)
    // volumen cam 4
    if(tecla == 4) atemMini.faderChannel(4,valor)
    // volumen mic/line 1
    if(tecla == 5) atemMini.faderChannel(4,valor)
    // volumen mic/line 2
    if(tecla == 6) atemMini.faderChannel(4,valor)
    // volumen maxter
    if(tecla == 9) atemMini.faderMaxter(valor)

  }
})

const rangoFader = (dato) => {
  
  let rangoOriginal = 127;
  let valorMinimoOriginal = 0;
  let rangoNuevo = 100;
  let valorMinimoNuevo = 0;

  let valorConvertido = ((dato - valorMinimoOriginal) * rangoNuevo / rangoOriginal) + valorMinimoNuevo;
  return valorConvertido;

}

const loop = () => {

  if (looping == 0) {
      looping = 1;
      return true;
  } else {
      looping = 0;
      return false;
  }

}

input.openPort(0)
