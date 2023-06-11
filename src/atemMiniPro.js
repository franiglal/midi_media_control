const { Atem } = require('atem-connection')
const myAtem = new Atem()

class AtemMiniPro{
    

    constructor(ip){
        this.ip = ip
        
    }
    
    connect(){
        myAtem.connect(`${this.ip}`)
    }    
    channelInput(canal){
        myAtem.changeProgramInput(canal)
    }

    faderChannel(canal, datos){
        
        let faderGain = this.convertirRango(datos)
        myAtem.setFairlightAudioMixerSourceProps(canal,'-65280',{faderGain})

    }

    faderMaxter(datos){

        let faderGain = this.convertirRango(datos)
        myAtem.setFairlightAudioMixerMasterProps({faderGain})

    }

    balanceChanel(canal, datos){
        let balance = this.convertirValance(datos)
        myAtem.setFairlightAudioMixerProps(canal,{balance})
    }

    balanceMaxter(datos){
        let balance = this.convertirRango(datos)
        myAtem.setClassicAudioMixerMasterProps({balance})
    }
    
    faderChannelReset(canal){
        let faderGain = 0
        myAtem.setFairlightAudioMixerSourceProps(canal,'-65280',{faderGain})  
    }

    faderMixerReset(){
        
        let faderGain = 0
        myAtem.setFairlightAudioMixerMasterProps({faderGain})
    }

    downKey(status){
        myAtem.setDownstreamKeyOnAir(status,0)

    }

    upKey(){
        myAtem.setUpstreamKeyerOnAir()
    } 

    macro(numeroMacro){
        numeroMacro
        myAtem.macroRun(numeroMacro)
    }

    audioOnOff(canal,mixOption){
      mixOption = this.opcionMix(mixOption)
      myAtem.setFairlightAudioMixerSourceProps(canal,'-65280',{mixOption})
      return mixOption
    }  

    // funcion de conversion de rango de audio
    convertirRango (valor){
        
        let rangoOriginal = 127;
        let valorMinimoOriginal = 0;
        let rangoNuevo = 1000 - (-10000);
        let valorMinimoNuevo = -10000;
  
        let valorConvertido = ((valor - valorMinimoOriginal) * rangoNuevo / rangoOriginal) + valorMinimoNuevo;
        return valorConvertido;
  }

    convertirValance(valor){
        let rangoOriginal = 127;
        let valorMinimoOriginal = 0;
        let rangoNuevo = 0 - (-65280);
        let valorMinimoNuevo = -65280;
  
        let valorConvertido = ((valor - valorMinimoOriginal) * rangoNuevo / rangoOriginal) + valorMinimoNuevo;
        return valorConvertido;
    }

    opcionMix(opcion){
  
      if (opcion == 2 ){
       return  1
      }else{
        return 2
      }   
    }
        
}

module.exports = AtemMiniPro





// codigo no es necesario.

//myAtem.on('stateChanged', (state, pathToChange) => {
//	console.log("cambia") // catch the ATEM state.
//})