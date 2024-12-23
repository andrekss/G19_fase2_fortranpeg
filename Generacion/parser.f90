
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

      
        
      if (opciones(1))then
      
      
      lexema = Identificador(Cadena, indice)
      return
      
      

      
      lexema = _(Cadena, indice)
      return
      
      

      
      if (":" == Cadena(indice:indice + 0) .and. caso(1)) then
          allocate( character(len=1) :: lexema)
          lexema = Cadena(indice:indice + 0)
          indice = indice + 1
          caso(1) = .false.
          control = control + 1
          return
      end if
      
      

      
      lexema = _(Cadena, indice)
      return
      
      

      
      lexema = Expresion(Cadena, indice)
      return
      
      

          if (control == 1-0)then
            lexema = "ERROR"
            return
          else
           opciones(1) = .false.
           control = 0
          end if
      
      end if  

      
       
    
      lexema = "ERROR"
      END function StructProp
      

      function Identificador(Cadena, indice) result(lexema)
          character(len=*), intent(in) :: Cadena
          integer, intent(inout) :: indice
          character(len=:), allocatable :: lexema
          integer :: in

      
        
      if (opciones(2))then
      
      
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
      
      

          if (control == 2-1)then
            lexema = "ERROR"
            return
          else
           opciones(3) = .false.
           control = 0
          end if
      
      end if  

      
       
    
      lexema = "ERROR"
      END function _
      

      function Expresion(Cadena, indice) result(lexema)
          character(len=*), intent(in) :: Cadena
          integer, intent(inout) :: indice
          character(len=:), allocatable :: lexema
          integer :: in

      
        
      if (opciones(4))then
      
      
      if ("5" == Cadena(indice:indice + 0) .and. caso(3)) then
          allocate( character(len=1) :: lexema)
          lexema = Cadena(indice:indice + 0)
          indice = indice + 1
          caso(3) = .false.
          control = control + 1
          return
      end if
      
      

          if (control == 3-2)then
            lexema = "ERROR"
            return
          else
           opciones(4) = .false.
           control = 0
          end if
      
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
            