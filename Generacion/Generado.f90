
      module Main
        IMPLICIT NONE ! Desactiva la asignación implicita de las variables
        contains
        function Nextsym(Cadena, indice)
          character(len=*), intent(in) :: Cadena
          integer, intent(inout) :: indice
          character(len=:), allocatable :: lexema

          INTEGER :: opcion = 1 ! Iniciamos con la primer instruccion del or
        
        DO WHILE (.true.)
          SELECT CASE(opcion)
            CASE 1: 
            if (",s" == input(indice:indice + 0)) then
              allocate( character(len=1) :: lexeme)
              lexeme = input(indice:indice + 0)
              indice = indice + 1
              return
            end if
      
      CASE 2: 
      if (",s" == input(indice:indice + 0)) then
          allocate( character(len=1) :: lexeme)
          lexeme = input(indice:indice + 0)
          indice = indice + 1
          return
      end if
      
          END SELECT
          opcion = opcion+1
        END DO  
      
        END function Nextsym

      END module Main
            