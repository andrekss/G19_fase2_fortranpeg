program parser
    use Main
    implicit none

    character(len=*), parameter :: Cadena = "7"
    character(len=:), allocatable :: lexema
    integer :: indice

    indice = 1
    do while (lexema /= "EOF" .and. lexema /= "ERROR")
        lexema = Nextsym(Cadena, indice)
        print *, lexema
    end do
end program parser