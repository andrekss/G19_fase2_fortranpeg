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

class Pluck extends Regla {
    constructor(expresion, pluck) {
        this.expresion = expresion;
        this.pluck = pluck; // Puede ser opcional
    }

    accept(visitor) {
        visitor.VisitarUnion(this);
    }
}




export {Produccion, Or, Union, Pluck};

// Seguir escribiendo clases ...