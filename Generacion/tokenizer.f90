
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
      

    ! Check if the current character exists in the range and is a single character
    if (indice <= len(Cadena)) then
        if (len(trim(Cadena)) == 1) then
            allocate(character(len=1) :: lexema)
            lexema = Cadena(indice:indice)  ! Return the single character
            indice = indice + 1             ! Advance to the next character
        else
            ! If the current substring is not a single character
            allocate(character(len=6) :: lexema)
            lexema = "ERROR"                ! Mark as error
        end if
        return
    else
        allocate(character(len=3) :: lexema)
        lexema = "EOF"                      ! Handle case where no more characters exist
        return
    end if
      
      
CASE (2) 
      
      if ("hola" == Cadena(indice:indice + 3) .and. len(Cadena) == len("hola")) then
          allocate( character(len=4) :: lexema)
          lexema = Cadena(indice:indice + 3)
          indice = indice + 4
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

      END module Main
            