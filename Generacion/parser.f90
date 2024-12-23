
      module parser
        IMPLICIT NONE ! Desactiva la asignación implicita de las variables

        !integer :: tamaño = 100
        logical, dimension(100) :: opciones = .true. ! control de or
        logical, dimension(100) :: caso = .true.  ! control concatenacion
        integer :: control = 0
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

          lexema = StructProp(Cadena, indice)  ! produccion inicial
          return
        END function Nextsym
     
          
      function StructProp(Cadena, indice) result(lexema)
          character(len=*), intent(in) :: Cadena
          integer, intent(inout) :: indice
          character(len=:), allocatable :: lexema
          integer :: in
          integer :: control = 0

      
        
      if (opciones(1))then
      
      
      if ("amor" == Cadena(indice:indice + 3) .and. caso(1)) then
          allocate( character(len=4) :: lexema)
          lexema = Cadena(indice:indice + 3)
          indice = indice + 4
          caso(1) = .false.
          return
      end if
      
    end if
      
      opciones(1) = .false.

      if (opciones(2))then
      
      
      if ("carmen" == Cadena(indice:indice + 5) .and. caso(2)) then
          allocate( character(len=6) :: lexema)
          lexema = Cadena(indice:indice + 5)
          indice = indice + 6
          caso(2) = .false.
          return
      end if
      lexema = _(Cadena, indice)
      return
      
      

      
      lexema = Expresion(Cadena, indice)
      return
      
      
      opciones(2) = .false.

          if (control == 1-0)then
            lexema = "ERROR"
            return
          else
           opciones(1) = .false.
           control = 0
          end if
      
    end if

      if (opciones(3))then
      
      
      if ("bella" == Cadena(indice:indice + 4) .and. caso(3)) then
          allocate( character(len=5) :: lexema)
          lexema = Cadena(indice:indice + 4)
          indice = indice + 5
          caso(3) = .false.
      in = indice
      
      
        if (Cadena(indice:indice) >= "a" .and. Cadena(indice:indice) <= "z") then
            lexema = Cadena(indice:inndice)
            indice = in + 1
            return
        end if
            
      
          
      

          if (control == 1-1)then
            lexema = "ERROR"
            return
          else
           opciones(2) = .false.
           control = 0
          end if
      
      end if  

      
       
    
      lexema = "ERROR"
      END function Identificador
      

      function _(Cadena, indice) result(lexema)
          character(len=*), intent(in) :: Cadena
          integer, intent(inout) :: indice
          character(len=:), allocatable :: lexema
          integer :: in

      
        
      if (opciones(3))then
      
      
      if ("si" == Cadena(indice:indice + 1) .and. caso(2)) then
          allocate( character(len=2) :: lexema)
          lexema = Cadena(indice:indice + 1)
          indice = indice + 2
          caso(2) = .false.
          control = control + 1
          return
      end if
      
      
      opciones(3) = .false.
      end if  

      
       
    
      lexema = "ERROR"
      END function Expresion
              

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
            