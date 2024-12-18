import { Regla } from "../Regla";

// Para las gramáticas

class Or extends Regla {
    constructor(id) {
        super();
        this.id = id;
    }

    accept(visitor) {
        visitor.visitOr(this);
    }
}

class Union extends Regla {
    constructor() {
        super();
    }

    accept(visitor) {
        visitor.visitUnion(this);
    }
}

export {Or, Union};

// Seguir escribiendo clases ...