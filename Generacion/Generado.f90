
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
          

          
        
      DO WHILE (.true.)
        SELECT CASE(opcion)
          CASE (1) 
      
      if ("ha" == Cadena(indice:indice + 1) .and. len(Cadena) == len("ha")) then
          allocate( character(len=2) :: lexema)
          lexema = Cadena(indice:indice + 1)
          indice = indice + 2
          return
      end if
      
      
CASE (2) 
      
      if ("he" == Cadena(indice:indice + 1) .and. len(Cadena) == len("he")) then
          allocate( character(len=2) :: lexema)
          lexema = Cadena(indice:indice + 1)
          indice = indice + 2
          return
      end if
case default
lexema = "ERROR"
      
        END SELECT
        opcion = opcion+1
      END DO  
    

        lexema = "ERROR"
        END function Nextsym

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
            