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

class Varios extends Regla {
    constructor( Varios,expresion) {
        this.expresion = expresion; // Expresiones
        this.Varios = Varios; // Puede ser opcional
    }

    accept(visitor) {
        visitor.VisitarUnion(this);
    }
}

class Etiqueta extends Regla {
    constructor(id,expresion) {
        this.expresion = expresion; // Expresiones
        this.id = id; // Puede ser opcional
    }

    accept(visitor) {
        visitor.VisitarUnion(this);
    }
}



export {Produccion, Or, Union, Varios, Etiqueta};

// Seguir escribiendo clases ...