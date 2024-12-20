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

class ExpresionParseada extends Regla {
    constructor(expresion){
        super();
        this.expresion = expresion;
    }

    accept(visitor){
        return visitor.VisitarExpresionParseada(this);
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


class Literales extends Regla {
    constructor(Literal){
        super();
        this.Literal = Literal;
    }

    accept(visitor){
        return visitor.VisitarLiterales(this);
    }
}


export {Produccion, Or, Union, Varios, Etiqueta, Expresion, ExpresionParseada, Rango, Literales};

// Seguir escribiendo clases ...