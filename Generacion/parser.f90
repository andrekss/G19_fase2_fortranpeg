
      module parser
        IMPLICIT NONE ! Desactiva la asignación implicita de las variables

        ! Declarar el arreglo global y persistente
        logical, dimension(100) :: opciones = .true.
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

          if (indice > len(Cadena)) then
            allocate( character(len=3) :: lexema )
            lexema = "EOF"
            return
          end if

          lexema = hu(Cadena, indice)  ! produccion inicial
          return
        END function Nextsym
     
          
      function hu(Cadena, indice) result(lexema)
          character(len=*), intent(in) :: Cadena
          integer, intent(inout) :: indice
          character(len=:), allocatable :: lexema
          integer :: in
      
        
      if (opciones(1))then
      
      
      if ("hola" == Cadena(indice:indice + 3) .and. len(Cadena) == len("hola")) then
          allocate( character(len=4) :: lexema)
          lexema = Cadena(indice:indice + 3)
          indice = indice + 4
          return
      end if
      
      
      opciones(1) = .false.
      
      end if
      
      

      if (opciones(2))then
      
      
      if ("hola1" == Cadena(indice:indice + 4) .and. len(Cadena) == len("hola1")) then
          allocate( character(len=5) :: lexema)
          lexema = Cadena(indice:indice + 4)
          indice = indice + 5
          return
      end if
      
      
      opciones(2) = .false.
      
      end if
      
       
    
      lexema = "ERROR"
      END function hu
              

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
            