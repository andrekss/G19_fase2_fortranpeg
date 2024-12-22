
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

      if ("hola" == Cadena(indice:indice + 3)) then
          allocate( character(len=4) :: lexema)
          lexema = Cadena(indice:indice + 3)
          indice = indice + 4
          return
      end if
      
        lexema = "ERROR"
        END function Nextsym

        

      END module Main
            