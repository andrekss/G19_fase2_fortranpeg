class Visitor {
    visitProduccion(Regla){} // Inicial
	visitOr(Regla){} // 1
	visitUnion(Regla){} // 2
	visitPluck(Regla){}
	visitLabel(Regla){} // 3 
	visitExpresiones(Regla){} // 4
	visitQuantifier(Regla){}
	visitParsingExpression(Regla){}
	visitGrupos(Regla){}  // 5
	visitLiterales(Regla){} // 6
	visitRango(Regla){} // 7
	visitEntradaRango(Regla){} // 8
	visitIdentificador(Regla){} // 9
	visitNumber(Regla){}
}

export {Visitor};