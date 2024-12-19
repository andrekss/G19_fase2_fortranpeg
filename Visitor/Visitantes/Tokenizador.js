import { Visitor } from "../Visitante.js";

class TokenizadorVisitante extends Visitor {

  constructor(){
    super();
  }
  Generador_Tokens(gramáticas){


    return `
    module tokenizador
    implicit none
    
    contains
    function nextSym(input, cursor) result(lexeme)
    
        ${gramáticas.map((produccion) => produccion.accept(this)).join('\n')}
    
        print *, "error lexico en col ", cursor, ', "'//input(cursor:cursor)//'"'
        lexeme = "ERROR"
    end function nextSym
    end module tokenizador 
            `;
    }
    // Reglas

    VisitarProduccion(Regla) {
      return Regla.expresion.accept(this);  // Ejecutamos la expresión
    }


    VisitarOr(Regla) {

      let or =`
      
      
      `

      Regla.expresion.map((expr) => expr.accept(this)).join('\n');

      return or
    }

    VisitarUnion(Regla){
      return Regla.expresion.map((expr) => expr.accept(this)).join('\n');
    }

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

    VisitarRango(Regla){
      return ;
    }



}

export{TokenizadorVisitante};