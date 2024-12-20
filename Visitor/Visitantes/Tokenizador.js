import { Visitor } from "../Visitante.js";

class TokenizadorVisitante extends Visitor {

  constructor(){
    super();
  }
  Generador_Tokens(gramáticas){


    return `
      module Main
        IMPLICIT NONE ! Desactiva la asignación implicita de las variables
        contains
        function Nextsym(Cadena, indice)
          character(len=*), intent(in) :: Cadena
          integer, intent(inout) :: indice
          character(len=:), allocatable :: lexema

          INTEGER :: opcion = 1 ! Iniciamos con la primer instruccion del or
        ${gramáticas.map((produccion) => produccion.accept(this)).join('\n')}
        END function Nextsym

      END module Main
            `;
    }
    // Reglas

    VisitarProduccion(Regla) {
      return Regla.expresion.accept(this);  // Ejecutamos la expresión
    }


    VisitarOr(Regla) {
      return `
        DO WHILE (.true.)
          SELECT CASE(opcion)
            ${Regla.expresion.map((expr, caso) => `CASE ${caso + 1}: ${expr.accept(this)}`).join('\n')}
          END SELECT
          opcion = opcion+1
        END DO  
      `;
    }    

    VisitarUnion(Regla){ // Concatenaciones
      Regla.expresion.map((expr) => expr.accept(this)).join('\n');
      return`
      
      `
    }

    // Prefijos
    VisitarVarios(Regla){
      return Regla
    }

    VisitarEtiqueta(Regla){
      return Regla
    }

    
    VisitarExpresiones(Regla){
      return Regla.expresion.accept(this);
    }

    VisitarExpresionParseada(Regla){
      return Regla.expresion.accept(this);
    }
    
    // Expresiones
    VisitarLiterales(Regla){
      
      return `
      if ("${node.val}" == input(cursor:cursor + ${node.val.length - 1})) then
          allocate( character(len=${node.val.length}) :: lexeme)
          lexeme = input(cursor:cursor + ${node.val.length - 1})
          cursor = cursor + ${node.val.length}
          return
      end if
      `;

    }

}

export{TokenizadorVisitante};