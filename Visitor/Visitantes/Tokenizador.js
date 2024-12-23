import { Visitor } from "../Visitante.js";
import { Contenido, Rango } from "../Elementos/Reglas.js";

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
          INTEGER :: opcion
          opcion = 1 ! Iniciamos con la primer instruccion del or

          if (indice > len(Cadena)) then
            allocate( character(len=3) :: lexema )
            lexema = "EOF"
            return
          end if

          lexema = ${gramaticas[0].id+"(Cadena, indice)"}  ! produccion inicial
          return
        END function Nextsym
     
          ${gramaticas.map((produccion) => produccion.accept(this)).join('\n')}        

            ! Función para convertir una cadena de texto a mayúsculas
    function ToUpperCase(Cadena) result(UpperCaseCadena)
        character(len=*), intent(in) :: Cadena
        character(len=len(Cadena)) :: UpperCaseCadena
        integer :: i, charCode

        UpperCaseCadena = Cadena
        do i = 1, len(Cadena)
            charCode = iachar(Cadena(i:i))
            if (charCode >= iachar('a') .and. charCode <= iachar('z')) then
                UpperCaseCadena(i:i) = achar(charCode - 32)
            end if
        end do
    end function ToUpperCase

      END module Main
            `;
    }
    // Reglas

    VisitarProduccion(Regla) {
      return `
      function ${Regla.id}(Cadena, indice) result(lexema)
          character(len=*), intent(in) :: Cadena
          integer, intent(inout) :: indice
          character(len=:), allocatable :: lexema
          integer :: in
          INTEGER :: opcion
          opcion = 1 ! Iniciamos con la primer instruccion del or

      ${Regla.expresion.accept(this)}

      lexema = "ERROR"
      END function ${Regla.id}
      `
    }


    VisitarOr(Regla) { // Una produccion
      return `
      DO WHILE (.true.)
        SELECT CASE(opcion)
          ${Regla.expresion.map((expr, caso) => `CASE (${caso + 1}) ${expr.accept(this)}`).join('\n')} 
          case default
            lexema = "ERROR"
            return
        END SELECT
        opcion = opcion+1
      END DO  
    `;
      //return Regla.expresion.map((expr) => expr.accept(this)).join('\n');
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
      return `
      ${Regla.expresion.accept(this)}
      `
      
    }
    
    // Expresiones
    VisitarLiterales(Regla){
      let funcion;
      let cierre; 
      if (Regla.case_Letra == "i"){  // case insensitive
        funcion= "ToUpperCase("
        cierre = ")"
      }else if (Regla.case_Letra == null){
        funcion = ""
        cierre = ""
      }

          //if (Cadena(indice:indice + 3) == "hola" .and. len(Cadena) == len("hola")) 
      return `
      if (${funcion}"${Regla.Literal}"${cierre} == ${funcion}Cadena(indice:indice + ${Regla.Literal.length - 1})${cierre} .and. len(Cadena) == len("${Regla.Literal}")) then
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
      ${Regla.Rango
          .filter((Regla) => Regla instanceof Contenido)
          .map(range => range.accept(this))
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
        if (Cadena(indice:indice) >= "${Regla.inicio}" .and. Cadena(indice:indice) <= "${Regla.fin}") then
            lexema = Cadena(indice:inndice)
            indice = in + 1
            return
        end if
            `;
    }

    VisitarContenido(Regla){
      console.log("carmen");
      console.log(Regla);
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

    VisitarEof(Regla){
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