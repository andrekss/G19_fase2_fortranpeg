PROGRAM Main
  IMPLICIT NONE ! Desactiva la asignación implicita de las variables

  CHARACTER(LEN=50) :: CadenaE ! Variable tipo caracter del mensaje

  ! Solicitar un mensaje al usuario
  PRINT *, "Introduce una cadena:"
  READ *, CadenaE

  CALL Nextsym(CadenaE) ! Llamada

  CONTAINS ! Permite declarar y definir funciones o subrutinas que estarán disponibles solo dentro del programa o módulo en el que están definidas.

  ! Definición de la subrutina
  SUBROUTINE Nextsym(Cadena)
    IMPLICIT NONE
    CHARACTER(LEN=50), INTENT(IN) :: Cadena ! Declarar Cadena como entrada (solo lectura)
    INTEGER :: opcion = 1

    PRINT *, "Cadena: ", TRIM(Cadena)
    PRINT *, "Ingrese un número (0 para salir):"

    ! Bucle tipo while
    DO WHILE (.true.)
        SELECT CASE(opcion)
            CASE(1)
                PRINT *, "La opción es 1"
            CASE(2)
                PRINT *, "La opción es 2"
            CASE(3)
                PRINT *, "La opción es 3"
                exit
            CASE DEFAULT
                PRINT *, "Opción no reconocida"
                exit
        END SELECT
        opcion = opcion+1
    END DO

  END SUBROUTINE Nextsym

END PROGRAM Main
