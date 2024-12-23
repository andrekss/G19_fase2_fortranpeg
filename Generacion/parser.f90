
      module parser
        IMPLICIT NONE ! Desactiva la asignación implicita de las variables
        contains

      subroutine parse(input)
        integer :: cursor = 1
        character(len=:), intent(inout), allocatable :: input
        do while (input /= "EOF" .and. input /= "ERROR")
          input = nextsym(input, cursor)
          print *, input
        end do


      end subroutine parse

        function nextsym(Cadena, indice) result(lexema)
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

          lexema = hola(Cadena, indice)  ! produccion inicial
          return
        END function Nextsym
     
          
      function hola(Cadena, indice) result(lexema)
          character(len=*), intent(in) :: Cadena
          integer, intent(inout) :: indice
          character(len=:), allocatable :: lexema
          integer :: in
          INTEGER :: opcion
          opcion = 1 ! Iniciamos con la primer instruccion del or

      
      DO WHILE (.true.)
        SELECT CASE(opcion)
          CASE (1) 
      
      if ("tengo frio" == Cadena(indice:indice + 9) .and. len(Cadena) == len("tengo frio")) then
          allocate( character(len=10) :: lexema)
          lexema = Cadena(indice:indice + 9)
          indice = indice + 10
          return
      end if
      
       
          case default
            lexema = "ERROR"
            return
        END SELECT
        opcion = opcion+1
      END DO  
    

      lexema = "ERROR"
      END function hola
              

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
            