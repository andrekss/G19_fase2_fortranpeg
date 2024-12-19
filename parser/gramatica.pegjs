{{

    // Importacion
    
    // let identificadores = []

    // import { identificadores } from '../index.js'
    import { ids, usos} from '../index.js'
    import { ErrorReglas } from './error.js';
    import { errores } from '../index.js'
    
    // Importaciones Visitor
    import { Produccion, Or, Union, Varios, Etiqueta, Expresion, ExpresionParseada, Literales } from "../Visitor/Elementos/Reglas.js";
}}

gramatica = _ prods:producciones+ _ {   

    let duplicados = ids.filter((item, index) => ids.indexOf(item) !== index);
    if (duplicados.length > 0) {
        errores.push(new ErrorReglas("Regla duplicada: " + duplicados[0]));
    }

    // Validar que todos los usos están en ids
    let noEncontrados = usos.filter(item => !ids.includes(item));
    if (noEncontrados.length > 0) {
        errores.push(new ErrorReglas("Regla no encontrada: " + noEncontrados[0]));
    }

    return prods;
}

producciones = _ id:identificador _ a:(literales)? _ "=" _ o:opciones (_";")? {  ids.push(id);  return new Produccion(id,a,o); } // instruccion

opciones = inicio:union final:(_ "/" _ union)* { return new Or([inicio, ...final]); }

union = inicio:expresion final:(_ expresion !(_ literales? _ "=") )* { return new Union([inicio, ...final]); }

expresion  = a:(etiqueta/varios)? _ exp:expresiones _ cont:([?+*]/conteo)?  { return new Expresion(a, exp, cont)}

etiqueta = pluck:("@")? _ id:identificador _ ":" varios:(varios)? { return new Etiqueta(pluck, id, varios) }

varios = pre:("!"/"$"/"@"/"&") { return new Varios(pre) }
// queso
expresiones  =  exp:identificador { usos.push(id); return new ExpresionParseada(exp)}
                / exp:literales "i"? { return new ExpresionParseada(exp);}
                / "(" _ exp:opciones _ ")" { return new ExpresionParseada(exp); }
                / exp:corchetes "i"? { return new ExpresionParseada(exp); }
                / exp:"." { return new ExpresionParseada(exp)}
                / exp:"!." { return new ExpresionParseada(exp)}

// conteo = "|" parteconteo _ (_ delimitador )? _ "|"


conteo = "|" _ (numero / id:identificador) _ "|"
        / "|" _ (numero / id:identificador)? _ ".." _ (numero / id2:identificador)? _ "|"
        / "|" _ (numero / id:identificador)? _ "," _ opciones _ "|"
        / "|" _ (numero / id:identificador)? _ ".." _ (numero / id2:identificador)? _ "," _ opciones _ "|"

// parteconteo = identificador
//             / [0-9]? _ ".." _ [0-9]?
// 			/ [0-9]

// delimitador =  "," _ expresion

// Regla principal que analiza corchetes con contenido
corchetes
    = "[" contenido:(rango / contenido)+ "]" {
        return `Entrada válida: [${input}]`;
    }

// Regla para validar un rango como [A-Z]
rango
    = inicio:caracter "-" fin:caracter {
        if (inicio.charCodeAt(0) > fin.charCodeAt(0)) {
            throw new Error(`Rango inválido: [${inicio}-${fin}]`);

        }
        return `${inicio}-${fin}`;
    }

// Regla para caracteres individuales
caracter
    = [a-zA-Z0-9_ ] { return text()}

// Coincide con cualquier contenido que no incluya "]"
contenido
    = (corchete / texto)+

corchete
    = "[" contenido "]"

texto
    = [^\[\]]+

literales = '"' cadena:stringDobleComilla* '"'     { return new Literales(cadena); }
            / "'" cadena:stringSimpleComilla* "'"  { return new Literales(cadena); }

stringDobleComilla = !('"' / "\\" / finLinea) .
                    / "\\" escape
                    / continuacionLinea

stringSimpleComilla = !("'" / "\\" / finLinea) .
                    / "\\" escape
                    / continuacionLinea

continuacionLinea = "\\" secuenciaFinLinea

finLinea = [\n\r\u2028\u2029]

escape = "'"
        / '"'
        / "\\"
        / "b"
        / "f"
        / "n"
        / "r"
        / "t"
        / "v"
        / "u"

secuenciaFinLinea = "\r\n" / "\n" / "\r" / "\u2028" / "\u2029"

// literales = 
//     "\"" [^"]* "\""
//     / "'" [^']* "'"
    

numero = [0-9]+

identificador = [_a-z]i[_a-z0-9]i* { return text() }


_ = (Comentarios /[ \t\n\r])*


Comentarios = 
    "//" [^\n]* 
    / "/*" (!"*/" .)* "*/"
