import { Visitor } from "../Visitante.js";
import { Rango } from "../Elementos/Reglas.js";

class TokenizadorVisitante extends Visitor {

  constructor(){
    super();
  }
  Generador_Tokens(gramaticas){

    return `
      module Main
        IMPLICIT NONE ! Desactiva la asignación implicita de las variables
        contains
        function Nextsym(Cadena, indice) result(lexema)
          character(len=*), intent(in) :: Cadena
          integer, intent(inout) :: indice
          character(len=:), allocatable :: lexema
          integer :: in

          if (indice > len(Cadena)) then
            allocate( character(len=3) :: lexema )
            lexema = "EOF"
            return
          end if
          
        ${gramaticas.map((produccion) => produccion.accept(this)).join('\n')}

        lexema = "ERROR"
        END function Nextsym

      END module Main
            `;
    }
    // Reglas

    VisitarProduccion(Regla) {
      return Regla.expresion.accept(this);  // Ejecutamos la expresión
    }


    VisitarOr(Regla) {
      return Regla.expresion.map((expr) => expr.accept(this)).join('\n');
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

      return Regla.expresion.accept(this);
    }
    
    // Expresiones
    VisitarLiterales(Regla){
      return `
      if ("${Regla.Literal}" == Cadena(indice:indice + ${Regla.Literal.length - 1})) then
          allocate( character(len=${Regla.Literal.length}) :: lexema)
          lexema = Cadena(indice:indice + ${Regla.Literal.length - 1})
          indice = indice + ${Regla.Literal.length}
          return
      end if
      `;

    }


    generateCaracteres(chars) {
      if (chars.length === 0) return '';
      return `
  if (findloc([${chars
      .map((char) => `"${char}"`)
      .join(', ')}], Cadena(in:in), 1) > 0) then
      lexema = Cadena(indice:in)
      indice = in + 1
      return
  end if
      `;
  }

    VisitarCorchete(Regla) {
      
      //return Regla.Rango.accept(this);
      return `
      in = indice
      ${this.generateCaracteres(
        Regla.Rango.filter((Regla) => typeof Regla === 'string')
      )}
      ${Regla.Rango
          .filter((Regla) => Regla instanceof Rango)
          .map((range) => range.accept(this))
          .join('\n')}
          `;
    }

    VisitarRango(Regla) {
        /*return `
          if ( IACHAR(Cadena) >= IACHAR(${Regla.inicio}) .and. IACHAR(c) <= IACHAR(${Regla.fin}) ) then
            print *, "Es un dígito (opción B)."
          end if         
        `;*/

        return `
        if (Cadena(in:in) >= "${Regla.inicio}" .and. Cadena(in:in) <= "${Regla.fin}") then
            lexema = Cadena(indice:in)
            indice = in + 1
            return
        end if
            `;
    }

    VisitarPunto(Regla){
      return `
        ! Check if the current character is '.'
        if (Cadena(in:in) == ".") then
            ! Accept any single character as a wildcard
            if (indice < len(Cadena)) then
                allocate(character(len=1) :: lexema)
                lexema = Cadena(in:in)  ! Return the wildcard character
                indice = in + 1         ! Advance to the next character
            else
                allocate(character(len=3) :: lexema)
                lexema = "EOF"          ! Handle case where no more characters exist
            end if
            return
        end if
      `
    }

    VisotarEof(Regla){
      return `
        if (Cadena(in:in) >= "0" .and. Cadena(in:in) <= "9") then
          ! Capture the token and advance the index
          allocate(character(len=1) :: lexema)
          lexema = Cadena(indice:in)
          indice = in + 1
          return
        end if


      `;
    }

}

export{TokenizadorVisitante};