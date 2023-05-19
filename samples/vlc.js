const VLC = require('vlc-client');
//const readline = require('readline');
const midi = require('@julusian/midi');
const input = new midi.Input();
let looping = 0

//conectar con vlc. IMPORTANTE: tiene que estar activado el html en vlc.
const vlc = new VLC.Client({
    ip: "localhost",
    port: 8080,
    //username: "steve_aoki", //username is optional
    password: "prueba"
});

input.getPortCount()
input.getPortName(0)

//control vlc

input.on('message', async (deltaTime, message ) => {
  console.log(`tecla pulsada ${message}`)

  if(message[1] == 22 && message[2] == 127) {
    await vlc.togglePlay()
    }
  if(message[1] == 21 && message[2] == 127) {
    await vlc.stop()
    }
  if(message[1] == 19 && message[2] == 127) {
    await vlc.next()
    }
  if(message[1] == 18 && message[2] == 127) {
    await vlc.previous()
    }
  if(message[1] == 8 ) {
        await vlc.setVolume(message[2])
    }
  if(message[1] == 20 && message[2]) {
        let control = loop()
        await vlc.setLooping(control)
    }
 
});

input.openPort(0)



function loop () {

    if (looping == 0) {
        looping = 1;
        return true;
    } else {
        looping = 0;
        return false;
    }

}

//readline.emitKeypressEvents(process.stdin);
//if (process.stdin.isTTY) process.stdin.setRawMode(true);
