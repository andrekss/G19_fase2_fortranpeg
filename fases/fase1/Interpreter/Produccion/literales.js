import { Productor} from "../Productor.js";
import  {contenedor} from "./Utils.js"  // Variable a editar

class Literales extends Productor{
    constructor(Identificador, Token,Cadena){
        super(Identificador,Token);
        this.Cadena = Cadena;
    }

    Interpretar(){
        // Empezar a concatenar la cadena contenedor

    }
}

export {Literales};