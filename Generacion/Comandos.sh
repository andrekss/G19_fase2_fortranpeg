#!/bin/bash

# Compilar el módulo tokenizer.f90
gfortran -c tokenizer.f90
if [ $? -ne 0 ]; then
    echo "Error al compilar tokenizer.f90"
    exit 1
fi

# Compilar el programa principal parser.f90 y enlazarlo con el módulo tokenizer.o
gfortran -o parser parser.f90 tokenizer.o
if [ $? -ne 0 ]; then
    echo "Error al compilar parser.f90"
    exit 1
fi

# Ejecutar el ejecutable generado
echo "Ejecutando el programa..."
./parser