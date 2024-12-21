
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
          
        
      in = indice
      
      
        if (Cadena(in:in) >= "0" .and. Cadena(in:in) <= "9") then
            lexema = Cadena(indice:in)
            indice = in + 1
            return
        end if
            
          

        lexema = "ERROR"
        END function Nextsym

      END module Main
            