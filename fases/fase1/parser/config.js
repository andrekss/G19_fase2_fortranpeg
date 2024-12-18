module.exports = {
    format: 'es',
    input: './gramatica.pegjs'
}



let contenedor ="";






let Funcion = `
PROGRAM Main
  IMPLICIT NONE
  CHARACTER(LEN=50) :: Cadena ! variable del mensaje

  ! Solicitar un mensaje al usuario
  PRINT *, "Introduce una cadena:"
  READ *, Cadena

  CALL Nextsym(Cadena) ! Llamada

CONTAINS ! Permite declarar y definir funciones o subrutinas que estarán disponibles solo dentro del programa o módulo en el que están definidas.

  ! Definición de la subrutina Imprimir
  SUBROUTINE Nextsym(Cadena)
`+contenedor+
`
  END SUBROUTINE Nextsym

END PROGRAM Main
`


module.exports = {contenedor};