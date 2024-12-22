#!/bin/bash

# Compilar el módulo Generado.f90
gfortran -c Generado.f90
if [ $? -ne 0 ]; then
    echo "Error al compilar Generado.f90"
    exit 1
fi

# Compilar el programa principal parser.f90 y enlazarlo con el módulo Generado.o
gfortran -o parser parser.f90 Generado.o
if [ $? -ne 0 ]; then
    echo "Error al compilar parser.f90"
    exit 1
fi

# Ejecutar el ejecutable generado
echo "Ejecutando el programa..."
./parser
