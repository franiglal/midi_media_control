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

//constantes de configuracion de teclado midi
// atem mini
const CAMARA1_CUT = 32
const CAMARA2_CUT = 33
const CAMARA3_CUT = 34
const CAMARA4_CUT = 36
const DOWN_KEY = 40
const VOL1 = 11
const VOL2 = 12
const VOL3 = 13
const VOL4 = 14
const MIC1 = 15
const MIC2 = 16
const MASTER = 10
const VOL_ON1 = 24
const VOL_ON2 = 25
const VOL_ON3 = 26
const VOL_ON4 = 27 
const MIC_ON1 = 28
const MIC_ON2 = 29 

// vlc

const PLAY = 46
const STOP = 45
const LOOP = 44
const FF = 43
const REW = 42
const VOL = 18


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
    if(tecla == PLAY && valor == 127) await vlc.togglePlay()
    // stop 
    if(tecla == STOP && valor == 127) await vlc.stop()
    // siguiente 
    if(tecla == FF && valor == 127) await vlc.next()
    // atras 
    if(tecla == REW && valor == 127)  await vlc.previous()
    // loop  
    if(tecla == LOOP && valor) {
      let control = loop()
      await vlc.setLooping(control)
    }

    // - ATEM MINI PRO -
    
    // camara 1
    if(tecla == CAMARA1_CUT && valor == 127) atemMini.channelInput(1)
    // camara 2  
    if(tecla == CAMARA2_CUT && valor == 127) atemMini.channelInput(2)
    // camara 3  
    if(tecla == CAMARA3_CUT && valor == 127) atemMini.channelInput(3)
    // camara 4
    if(tecla == CAMARA4_CUT && valor == 127) atemMini.channelInput(4)
    // downkey
    if(tecla == DOWN_KEY && valor == 127) atemMini.downKey()
    // volumen on off
    if(tecla = VOL_ON1 && valor == 127) atemMini.audioOnOff(1)
    if(tecla = VOL_ON2 && valor == 127) atemMini.audioOnOff(2)
    if(tecla = VOL_ON3 && valor == 127) atemMini.audioOnOff(3)
    if(tecla = VOL_ON4 && valor == 127) atemMini.audioOnOff(4)
    if(tecla = MIC_ON1 && valor == 127) atemMini.audioOnOff()
    if(tecla = MIC_ON2 && valor == 127) atemMini.audioOnOff()


  } 

  // fader
  if (tipo == 186 ){

    // - VLC -

    // volumen de 0 a 100
    if(tecla == VOL ) await vlc.setVolume((rangoFader(valor)))

    // - Atem Mini Pro -

    // volumen cam 1
    if(tecla == VOL1) atemMini.faderChannel(1,valor)
    // volumen cam 2
    if(tecla == VOL2) atemMini.faderChannel(2,valor)
    // volumen cam 3
    if(tecla == VOL3) atemMini.faderChannel(3,valor)
    // volumen cam 4
    if(tecla == VOL4) atemMini.faderChannel(4,valor)
    // volumen mic/line 1
    if(tecla == MIC1) atemMini.faderChannel(4,valor)
    // volumen mic/line 2
    if(tecla == MIC2) atemMini.faderChannel(4,valor)
    // volumen maxter
    if(tecla == MASTER) atemMini.faderMaxter(valor)

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
