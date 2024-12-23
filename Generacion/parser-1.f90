module parser
    implicit none

contains

subroutine parse(input)
        integer :: cursor = 1
        character(len=:), intent(inout), allocatable :: input
    do while (input /= "EOF" .and. input /= "ERROR")
        input = nextsym(input, cursor)
        print *, input
    end do
end subroutine parse

function nextsym(input, cursor) result(lexeme)
    character(len=*), intent(in) :: input
    integer, intent(inout) :: cursor
    character(len=:), allocatable :: lexeme
    integer :: i

    if (cursor > len(input)) then
        allocate( character(len=3) :: lexeme )
        lexeme = "EOF"
        return
    end if

    
    i = cursor
    
    if (findloc(["a", "s", "d", "f"], input(i:i), 1) > 0) then
        lexeme = input(cursor:i)
        cursor = i + 1
        return
    end if
        
    
    if (input(i:i) >= "a" .and. input(i:i) <= "z") then
        lexeme = input(cursor:i)
        cursor = i + 1
        return
    end if
        
        

    print *, "error lexico en col ", cursor, ', "'//input(cursor:cursor)//'"'
    lexeme = "ERROR"
end function nextSym

end module parser