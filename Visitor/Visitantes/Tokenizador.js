import { Visitor } from "../Visitante.js";

class TokenizadorVisitante extends Visitor {

  constructor(){
    super();
  }
  Generador_Tokens(gramaticas){

    return `
      module Main
        IMPLICIT NONE ! Desactiva la asignación implicita de las variables
        contains
        function Nextsym(Cadena, indice)
          character(len=*), intent(in) :: Cadena
          integer, intent(inout) :: indice
          character(len=:), allocatable :: lexema

          INTEGER :: opcion = 1 ! Iniciamos con la primer instruccion del or
        ${gramaticas.map((produccion) => produccion.accept(this)).join('\n')}
        END function Nextsym

      END module Main
            `;
    }
    // Reglas

    VisitarProduccion(Regla) {
      return Regla.expresion.accept(this);  // Ejecutamos la expresión
    }


    VisitarOr(Regla) {

      console.log(Regla.expresion)
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
      return Regla.expresion.map((expr) => expr.accept(this)).join('\n');

    }

    // Prefijos
    VisitarVarios(Regla){
      return Regla
    }

    VisitarEtiqueta(Regla){
      return Regla
    }

    // Busqueda
    VisitarExpresiones(Regla){
      //console.log(Regla.expresion.accept(this))
      return Regla.expresion.accept(this);
    }

    VisitarExpresionParseada(Regla){
      
      return Regla.expresion.accept(this);
    }
    
    // Expresiones
    VisitarLiterales(Regla){
      return `
      if ("${Regla.Literal}" == input(indice:indice + ${Regla.Literal.length - 1})) then
          allocate( character(len=${Regla.Literal.length}) :: lexeme)
          lexeme = input(indice:indice + ${Regla.Literal.length - 1})
          indice = indice + ${Regla.Literal.length}
          return
      end if
      `;

    }

    generadorCaracteres(caracteres) {
        if (caracteres.length === 0) return '';
        return `
      if (findloc([${caracteres
        .map((char) => `"${char}"`)
        .join(', ')}], input(i:i), 1) > 0) then
        lexeme = input(indice:i)
        indice = i + 1
        return
      end if
        `;
    }


    VisitarClase(Regla) {
        return `
      i = indice
      ${this.generadorCaracteres(
        Regla.chars.filter((Regla) => typeof Regla === 'string')
      )}
      ${Regla.chars
        .filter((Regla) => Regla instanceof Rango)
        .map((range) => range.accept(this))
        .join('\n')}
        `;
    }

    VisitarRango(Regla) {
        return `
      if (input(i:i) >= "${Regla.bottom}" .and. input(i:i) <= "${Regla.top}") then
        lexeme = input(indice:i)
        indice = i + 1
        return
      end if
        `;
    }

}

export{TokenizadorVisitante};