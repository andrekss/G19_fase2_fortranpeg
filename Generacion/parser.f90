program parser
<<<<<<< HEAD
    use tokenizer
    implicit none

    character(len=*), parameter :: input = "foobarfoofoobar"
    character(len=:), allocatable :: lexeme
    integer :: cursor

    cursor = 1
    do while (lexeme /= "EOF" .and. lexeme /= "ERROR")
        lexeme = nextSym(input, cursor)
        print *, lexeme
=======
    use Main
    implicit none

    character(len=*), parameter :: Cadena = "holaadios"
    character(len=:), allocatable :: lexema
    integer :: indice

    indice = 1
    do while (lexema /= "EOF" .and. lexema /= "ERROR")
        lexema = Nextsym(Cadena, indice)
        print *, lexema
>>>>>>> ba66fe7cff766db8753ef681dc8cdc139f42535f
    end do
end program parser