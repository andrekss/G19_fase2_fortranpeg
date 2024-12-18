PROGRAM Main 
  IMPLICIT NONE ! Desactiva la asignación implicita de las variables

  CHARACTER(LEN=50) :: CadenaE ! variable tipo caracter del mensaje

  ! Solicitar un mensaje al usuario
  PRINT *, "Introduce una cadena:"
  READ *, CadenaE

  CALL Nextsym(CadenaE) ! Llamada

CONTAINS ! Permite declarar y definir funciones o subrutinas que estarán disponibles solo dentro del programa o módulo en el que están definidas.

  ! Definición de la subrutina
  SUBROUTINE Nextsym(Cadena)
    IMPLICIT NONE

    ! Len=* <- Se adapta  al tamaño del mensaje  INTENT(IN) <-- Variable de entrada
    CHARACTER(LEN=*), INTENT(IN) :: Cadena
    
    IF (TRIM(ADJUSTL(Cadena)) == "hola") THEN
        PRINT *, "Funcionó"
    ELSE
      PRINT *, "No funcionó"
    END IF


  END SUBROUTINE Nextsym

END PROGRAM Main
