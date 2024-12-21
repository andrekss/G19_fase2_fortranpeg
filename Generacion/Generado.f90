
      module Main
        IMPLICIT NONE ! Desactiva la asignación implicita de las variables
        contains
        function Nextsym(Cadena, indice) result(lexema)
          character(len=*), intent(in) :: Cadena
          integer, intent(inout) :: indice
          character(len=:), allocatable :: lexema

          INTEGER :: opcion = 1 ! Iniciamos con la primer instruccion del or
        
        DO WHILE (.true.)
          SELECT CASE(opcion)
            CASE (1) 
      if ("hoa" == Cadena(indice:indice + 2)) then
          allocate( character(len=3) :: lexema)
          lexema = Cadena(indice:indice + 2)
          indice = indice + 3
          return
      end if
      
CASE (2) 
      if ("fuke" == Cadena(indice:indice + 4)) then
          allocate( character(len=5) :: lexema)
          lexema = Cadena(indice:indice + 4)
          indice = indice + 5
          return
      end if
      
CASE (3) 
      if ("there" == Cadena(indice:indice + 4)) then
          allocate( character(len=5) :: lexema)
          lexema = Cadena(indice:indice + 4)
          indice = indice + 5
          return
      end if
      
          END SELECT
          opcion = opcion+1
        END DO  
      
        END function Nextsym

      END module Main
            