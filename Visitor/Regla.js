class Regla {
    accept(visitor) {
        throw new Error("El método 'accept' debe ser implementado por las subclases.");
    }
}

export {Regla}