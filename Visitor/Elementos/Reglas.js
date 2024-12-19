import { Regla } from "../Regla.js";

// Para las gramáticas

class Produccion extends Regla {
    constructor(id,alias, expresion ) {
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
        this.expresion = expresion; // Lista de opciones para hacer la decision del or
    }

    accept(visitor) {
        visitor.VisitarOr(this);
    }
}

class Union extends Regla {
    constructor(expresion) {
        this.expresion = expresion; // Lista de concatenación
    }

    accept(visitor) {
        visitor.VisitarUnion(this);
    }
}


class Expresion extends Regla {
    constructor(prefijo, expresiones, conteo){
        this.prefijo = prefijo;
        this.expresiones = expresiones
        this.conteo = conteo
    }

    accept(visitor){
        visitor.VisitarExpresiones(this);
    }
}

class Varios extends Regla {
    constructor(prefijo) {
        this.prefijo = prefijo;
    }

    accept(visitor) {
        visitor.VisitarUnion(this);
    }
}

class Etiqueta extends Regla {
    constructor(pluck, id, varios) {
        this.pluck = pluck; // Expresiones
        this.id = id; // Puede ser opcional
        this.varios = varios;
    }

    accept(visitor) {
        visitor.VisitarUnion(this);
    }
}

class ExpresionParseada extends Regla {
    constructor(expresion){
        this.expresion = expresion;
    }

    accept(visitor){
        visitor.VisitarExpresionParseada(this);
    }
}



export {Produccion, Or, Union, Varios, Etiqueta, Expresion, ExpresionParseada};

// Seguir escribiendo clases ...