import { Visitor } from "../Visitante.js";
import { Contenido, Rango } from "../Elementos/Reglas.js";

class TokenizadorVisitante extends Visitor {

  constructor(){
    super();
    this.tamaño_Concatenado=0;
    this.Orden_Concatenacion = 0;
  }
  Generador_Tokens(gramaticas){

    return `
      module parser
        IMPLICIT NONE ! Desactiva la asignación implicita de las variables

        !integer :: tamaño = 100
        logical, dimension(100) :: opciones = .true. ! control de or
        logical, dimension(100) :: caso = .true.  ! control concatenacion
        contains

      subroutine parse(input)
        integer :: cursor = 1
        character(len=:), intent(inout), allocatable :: input
        character(len=:), allocatable :: lexema
        do while (lexema /= "EOF" .and. lexema /= "ERROR")
          lexema = nextsym(input, cursor)
          print *, lexema
        end do
      end subroutine parse

        function nextsym(Cadena, indice) result(lexema)
          character(len=*), intent(in) :: Cadena
          integer, intent(inout) :: indice
          character(len=:), allocatable :: lexema
          integer :: in

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

      END module parser
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
          integer :: control = 0

      ${Regla.expresion.accept(this)}
      lexema = "ERROR"
      END function ${Regla.id}
      `
    }


    VisitarOr(Regla) { // Una produccion
      return `
        ${Regla.expresion.map((expr) =>expr.accept(this)
        ).join('\n')} 
    `;


      //return Regla.expresion.map((expr) => expr.accept(this)).join('\n');
    }    

    VisitarUnion(Regla){ // Concatenaciones


      this.tamaño_Concatenado++;
      let cierre = this.tamaño_Concatenado;
      let inicio = this.Orden_Concatenacion;
      return `
      if (opciones(${this.tamaño_Concatenado}))then
      ${Regla.expresion.map((expr) => expr.accept(this)).join('\n')}
      opciones(${cierre}) = .false.
      end if  
          if (control == ${this.Orden_Concatenacion}-${inicio+1})then
            lexema = "ERROR"
            return
          else
           
          end if
      
      `
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

      this.Orden_Concatenacion++;
          //if (Cadena(indice:indice + 3) == "hola" .and. len(Cadena) == len("hola")) 
      return `
      if (${funcion}"${Regla.Literal}"${cierre} == ${funcion}Cadena(indice:indice + ${Regla.Literal.length - 1})${cierre} .and. caso(${this.Orden_Concatenacion})) then
          allocate( character(len=${Regla.Literal.length}) :: lexema)
          lexema = Cadena(indice:indice + ${Regla.Literal.length - 1})
          indice = indice + ${Regla.Literal.length}
          caso(${this.Orden_Concatenacion}) = .false.
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

        this.tamaño_Concatenado++;
        let cierre = this.tamaño_Concatenado;
        return `
        if (opciones(${this.tamaño_Concatenado})) then
          if (Cadena(indice:indice) >= "${Regla.inicio}" .and. Cadena(indice:indice) <= "${Regla.fin}") then
              lexema = Cadena(indice:indice)
              indice = indice + 1
              opciones(${cierre}) = .false.
              return
          end if
        end if
            `;
    }

    VisitarContenido(Regla){
      this.tamaño_Concatenado++;
      let cierre = this.tamaño_Concatenado;
      console.log(Regla.contenido)

      const replacements = {
        "t": "\\t",
        "\\": "\\\\",
        "n": "\\n",
        "r": "\\r"
      }

      for (let i = 0; i < Regla.contenido.length - -1; i++){
        if (Regla.contenido[i] === "\\" && replacements[Regla.contenido[i+1]]){
          Regla.contenido[i] = replacements[Regla.contenido[i+1]]
          Regla.contenido.splice(i+1, 1);
          i--;
        }
      }


      let cadena = Regla.contenido.map((char) => `
      if (opciones(${this.tamaño_Concatenado}))then
        if ("${char}" == Cadena(indice:indice) .and. Cadena(indice:indice) <= "$") then
            allocate( character(len=${Regla.contenido.length}) :: lexema)
            lexema = Cadena(indice:indice + ${Regla.contenido.length - 1})
            indice = indice + ${Regla.contenido.length}
            opciones() = .false.
            return
        end if
      end if
      `);

      return `
      if (opciones(${this.tamaño_Concatenado}))then
        if ("${Regla.Literal}" == Cadena(indice:indice) then
            allocate( character(len=${Regla.contenido.length}) :: lexema)
            lexema = Cadena(indice:indice + ${Regla.contenido.length - 1})
            indice = indice + ${Regla.contenido.length}
            opciones(${cierre}) = .false.
            return
        end if
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

    VisitarIdentificador(Regla){
      return`
      lexema = ${Regla.id}(Cadena, indice)
      return
      `;
    }

    VisitarGrupos(Regla){

      return Regla.expresion.accept(this); // or

    }

}

export{TokenizadorVisitante};