import { Visitor } from "../Visitante";

class TokenizadorVisitante extends Visitor {

    Generador_Tokens(gramáticas){

        let contenedor ="";

        let Funcion = `
        PROGRAM Main
          IMPLICIT NONE
          CHARACTER(LEN=50) :: Cadena ! variable del mensaje
        
          ! Solicitar un mensaje al usuario
          PRINT *, "Introduce una cadena:"
          READ *, Cadena
        
          CALL Nextsym(Cadena) ! Llamada
        
        CONTAINS ! Permite declarar y definir funciones o subrutinas que estarán disponibles solo dentro del programa o módulo en el que están definidas.
        
          ! Definición de la subrutina Imprimir
          SUBROUTINE Nextsym(Cadena)
        `+contenedor+
        `
          END SUBROUTINE Nextsym
        
        END PROGRAM Main
        `

        gramáticas.forEach(Regla => {
            Regla.accept(this);
        });
    }
    // Reglas

    VisitarProduccion(Regla) {
        return Regla.expresion.accept(this);  // Ejecutamos la expresión
    }

    VisitarOr(Regla) {
      return Regla.expresion.map((expr) => expr.accept(this)).join('\n');
    }

    VisitarUnion(Regla){
      return Regla.expresion.map((expr) => expr.accept(this)).join('\n');
    }

    
}

export{TokenizadorVisitante};