// La cadena donde se generará el codigo fortran es en la variable contenedor del archivo config

class Opcion{
    constructor(Identificador, Token){
        this.Identificador = Identificador;
        this.Token = Token;
    }

    Interpretar(){}
}

const TipoProductor = {
    Literales: 'Literales'
}

export {Opcion, TipoProductor};