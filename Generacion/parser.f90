program parser
    use Main
    implicit none

<<<<<<< HEAD
    character(len=*), parameter :: Cadena = "adios"
=======
    character(len=*), parameter :: Cadena = "holahola"
>>>>>>> 9c76848c7d2ba7d6eb8e0fe8797baf83e2693bc8
    character(len=:), allocatable :: lexema
    integer :: indice

    indice = 1
    do while (lexema /= "EOF" .and. lexema /= "ERROR")
        lexema = Nextsym(Cadena, indice)
        print *, lexema
    end do
end program parser