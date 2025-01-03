import { Regla } from "../Regla.js";

// Para las gramáticas

class Produccion extends Regla {
    constructor(id,alias, expresion ) {
        super();
        this.id = id;
        this.expresion = expresion;
        this.alias = alias;
    }

    accept(visitor) {
        return visitor.VisitarProduccion(this);
    }
}

class Or extends Regla {
    constructor(expresion) {
        super();
        this.expresion = expresion; // Lista de opciones para hacer la decision del or
    }

    accept(visitor) {
        return visitor.VisitarOr(this);
    }
}

class Union extends Regla {
    constructor(expresion) {
        super();
        this.expresion = expresion; // Lista de concatenación
    }

    accept(visitor) {
        return visitor.VisitarUnion(this);
    }
}



// Prefijos
class Varios extends Regla {
    constructor(prefijo) {
        super();
        this.prefijo = prefijo;
    }

    accept(visitor) {
        return visitor.VisitarUnion(this);
    }
}

class Etiqueta extends Regla {
    constructor(pluck, id, varios) {
        super();
        this.pluck = pluck; // Expresiones
        this.id = id; // Puede ser opcional
        this.varios = varios;
    }

    accept(visitor) {
        return visitor.VisitarUnion(this);
    }
}

// Expresiones

class Expresion extends Regla {
    constructor(prefijo, expresion, conteo){
        super();
        this.prefijo = prefijo;
        this.expresion = expresion
        this.conteo = conteo
    }

    accept(visitor){
        return visitor.VisitarExpresiones(this);
    }
}

class Rango extends Regla {
    constructor(inicio, fin){
        super();
        this.inicio = inicio
        this.fin = fin
    }

    accept(visitor){
        return visitor.VisitarRango(this);
    }
}

class Corchete extends Regla{
    constructor(Rango){
        super()
        this.Rango = Rango;
    }

    accept(visitor){
        return visitor.VisitarCorchete(this);
    }

}


class Literales extends Regla {
    constructor(Literal, case_Letra){
        super();
        this.Literal = Literal;
        this.case_Letra = case_Letra;
    }

    accept(visitor){
        return visitor.VisitarLiterales(this);
    }
}


class Contenido extends Regla {
    constructor(contenido){
        super();
        this.contenido = contenido;
    }

    accept(visitor){
        return visitor.VisitarContenido(this);
    }
}


class Punto extends Regla {
    constructor(){
        super();
    }

    accept(visitor){
        return visitor.VisitarPunto(this);
    }
}

class Eof extends Regla {
    constructor(){
        super();
    }

    accept(visitor){
        return visitor.VisitarEof(this);
    }
}

class Identificador extends Regla{
    constructor(id){
        super();
        this.id = id;
    }

    accept(visitor){
        return visitor.VisitarIdentificador(this);
    }
}


class Grupo extends Regla{
    constructor(expresion){
        this.expresion = expresion;
    }

    accept(visitor){
        return visitor.VisitarGrupos(this);
    }
}

export {Produccion, Or, Union, Varios, Etiqueta, Expresion, Rango, Literales, Corchete, Punto, Eof,Identificador, Grupo, Contenido};
