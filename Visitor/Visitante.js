class Visitor {
    VisitarProduccion(Regla){} // Inicial
	VisitarOr(Regla){} // 1
	VisitarUnion(Regla){} // 2
	VisitarEtiqueta(Regla){}
	VisitarVarios(Regla){}
	VisitarExpresiones(Regla){} // 4
	VisitarQuantifier(Regla){}
	VisitarParsingExpression(Regla){}
	VisitarGrupos(Regla){}  // 5
	VisitarLiterales(Regla){} // 6
	VisitarRango(Regla){} // 7
	VisitarEntradaRango(Regla){} // 8
	VisitarIdentificador(Regla){} // 9
	VisitarNumber(Regla){}
}

export {Visitor};