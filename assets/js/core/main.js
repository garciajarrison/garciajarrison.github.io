// Variables para errores y mensajes;
var errores;
var mensajes;

//Arreglos de variables
var variableTexto = [];
var variableEntero = [];
var variableReal = [];
var variableBooleano = [];

//Arreglos de valores de las variables
var variableTextoValor = [];
var variableEnteroValor = [];
var variableRealValor = [];
var variableBooleanoValor = [];

//Arreglo de lineas de codigo
var lineasCodigo = [];

//Indice de la estructura
var codLineaInitInicio = -1;
var codLineaEndInicio = -1;
var codLineaInitDeclare = -1;
var codLineaEndDeclare = -1;

//Variable de control de errores
var continuar = true;

// Inicializa las variables y componentes
function inicializar() {

    //inicializamos las variables
    document.getElementById("consolaCod").innerHTML = "";
    document.getElementById("variablesCod").innerHTML = "";
    document.getElementById("divMensajeID").style.display = "none";
    document.getElementById("divErrorID").style.display = "none";
    errores = [ERROR_INIT];
    mensajes = [SUCCESS];
    
    //arreglos
    lineasCodigo = [];
    variableTexto = [];
    variableEntero = [];
    variableReal = [];
    variableBooleano = [];
    variableTextoValor = [];
    variableEnteroValor = [];
    variableRealValor = [];
    variableBooleanoValor = [];
    
    //indices
    codLineaInitInicio = -1;
    codLineaEndInicio = -1;
    codLineaInitDeclare = -1;
    codLineaEndDeclare = -1;
    
    //control de errores
    continuar = true;

    //Se carga cada linea para ser analizada
    cargarLineas();
    //validamos la estructura
    validarEstructura();
    //mostramos mensajes de error o exito
    mostrarMensajes();
}

//se carga cada linea para ser analizada
function cargarLineas() {
    var lineas = document.getElementById('lineasCod').value.toLowerCase();
    lineas = lineas.split("\n");
    for (var i = 0;i < lineas.length;i++) {
        var lineaTexto = quitarEspacios(lineas[i]).trim();
        var lineaTexto = lineaTexto.replace(/(--.*)/g, '');
        lineasCodigo.push(lineaTexto); //anexo replace para quitar los comentarios
    }
}

//quita espacios al inicio medio o final
function quitarEspacios(texto) {
    return texto.replace(/([\ \t]+(?=[\ \t])|^\s+|\s+$)/g, '');
}

/* =================================================== VALIDACION DE LA ESTRUCTURA ============================================== */
//validamos la estructura del codigo
function validarEstructura() {

    // recorremos cada linea de codigo para obtener la estructura
    for (var i = 0;i < lineasCodigo.length;i++) {
        //validamos la declaracion de variables
        if (lineasCodigo[i].indexOf(INICIO) != -1) {
            codLineaInitInicio = i;
        }
        if (lineasCodigo[i].indexOf(END) != -1) {
            codLineaEndInicio = i;
        }
        if (lineasCodigo[i].indexOf(DECLARE) != -1) {
            codLineaInitDeclare = i;
        }
        if (lineasCodigo[i].indexOf(END_DECLARE) != -1) {
            codLineaEndDeclare = i;
        }
    }

    // mostramos errores por estructura
    if (codLineaInitDeclare == -1) {
        continuar = false;
        errores.push(ERROR_MISS_DECLARE);
    }
    if (codLineaEndDeclare == -1) {
        continuar = false;
        errores.push(ERROR_MISS_END_DECLARE);
    }
    if (codLineaInitInicio == -1) {
        continuar = false;
        errores.push(ERROR_MISS_INICIO);
    }
    if (codLineaEndInicio == -1) {
        continuar = false;
        errores.push(ERROR_MISS_END);
    }

    //obtenemos las variables solo si no hay errores
    if (continuar) {
        //validamos la estrucutura declarar
        validarDeclarar();
        //imprime las variables en la consola de variables y valores
        imprimirVariables();

        //ejecucion de las lineas si no se encontraron errores
        if (continuar) {
            //validacion de estructura inicio - fin
            validarInicioFin((codLineaInitInicio+1), (codLineaEndInicio-1));
        }

    }
}

/* Validamos la estrucutra del Declarar 
   Donde se declaran todas las variables */ 
function validarDeclarar(){
            
    //Recorremos solo el bloque declare
    for (var i = codLineaInitDeclare;i <= codLineaEndDeclare;i++) {

        //consultamos las variables declaradas
        for (var j = 0;j < VARIABLES.length;j++) {
            if (lineasCodigo[i].indexOf(VARIABLES[j]) != -1) {

                var script = lineasCodigo[i].substring((lineasCodigo[i].indexOf(VARIABLES[j]) + VARIABLES[j].length));
                //if(script.indexOf(";") != -1){
                //validamos el tipo y lo asignamos al arreglo de variables
                if (VARIABLES[j] == INT) {
                    if (script.indexOf(",") != -1) {
                        // si las variables son separadas por coma se separan
                        var valores = script.split(",");
                        for (var s = 0;s < valores.length;s++) {
                            if (valores[s].indexOf("=") != -1) {
								if(validarVariableDeclarada(valores[s].substring(0, valores[s].indexOf("=")).trim())){
									variableEntero.push(valores[s].substring(0, valores[s].indexOf("=")).trim());
									variableEnteroValor.push(valores[s].substring(valores[s].indexOf("=") + 1).trim());
								}
                            }else {
								if(validarVariableDeclarada(valores[s].trim())){
									variableEntero.push(valores[s].trim());
									variableEnteroValor.push("");
								}
                            }
                        }
                    }else {
                        if (script.indexOf("=") != -1) {
							if(validarVariableDeclarada(script.substring(0, script.indexOf("=")).trim())){
								variableEntero.push(script.substring(0, script.indexOf("=")).trim());
								variableEnteroValor.push(script.substring(script.indexOf("=") + 1).trim());
							}
                        }else {	
							if(validarVariableDeclarada(script.trim())){
								variableEntero.push(script.trim());
								variableEnteroValor.push("");
							}
                        }

                    }
                }else if (VARIABLES[j] == STRING) {
                    if (script.indexOf(",") != -1) {
                        // si las variables son separadas por coma se separan
                        var valores = script.split(",");
                        for (var s = 0;s < valores.length;s++) {
                            if (valores[s].indexOf("=") != -1) {
								if(validarVariableDeclarada(valores[s].substring(0, valores[s].indexOf("=")).trim())){
									variableTexto.push(valores[s].substring(0, valores[s].indexOf("=")).trim());
									variableTextoValor.push(valores[s].substring(valores[s].indexOf("=") + 1).trim());
								}
                            }else {
								if(validarVariableDeclarada(valores[s].trim())){
									variableTexto.push(valores[s].trim());
									variableTextoValor.push("''");
								}
                            }
                        }
                    }else {
                        if (script.indexOf("=") != -1) {
							if(validarVariableDeclarada(script.substring(0, script.indexOf("=")).trim())){
								variableTexto.push(script.substring(0, script.indexOf("=")).trim());
								variableTextoValor.push(script.substring(script.indexOf("=") + 1).trim());
							}
                        }else {
							if(validarVariableDeclarada(script.trim())){
								variableTexto.push(script.trim());
								variableTextoValor.push("''");
							}
                        }

                    }
                }
                else if (VARIABLES[j] == FLOAT) {
                    if (script.indexOf(",") != -1) {
                        // si las variables son separadas por coma se separan
                        var valores = script.split(",");
                        for (var s = 0;s < valores.length;s++) {
                            if (valores[s].indexOf("=") != -1) {
								if(validarVariableDeclarada(valores[s].substring(0, valores[s].indexOf("=")).trim())){
									variableReal.push(valores[s].substring(0, valores[s].indexOf("=")).trim());
									variableRealValor.push(valores[s].substring(valores[s].indexOf("=") + 1).trim());
								}
                            }else {
								if(validarVariableDeclarada(valores[s].trim())){
									variableReal.push(valores[s].trim());
									variableRealValor.push("");
								}
                            }
                        }
                    }else {
                        if (script.indexOf("=") != -1) {
							if(validarVariableDeclarada(script.substring(0, script.indexOf("=")).trim())){
								variableReal.push(script.substring(0, script.indexOf("=")).trim());
								variableRealValor.push(script.substring(script.indexOf("=") + 1).trim());
							}
                        }else {
							if(validarVariableDeclarada(script.trim())){
								variableReal.push(script.trim());
								variableRealValor.push("");
							}
                        }

                    }
                }else if (VARIABLES[j] == BOOLEAN) {
                    if (script.indexOf(",") !=  - 1) {
                        // si las variables son separadas por coma se separan
                        var valores = script.split(",");
                        for (var s = 0;s < valores.length;s++) {
                            if (valores[s].indexOf("=") != -1) {
								if(validarVariableDeclarada(valores[s].substring(0, valores[s].indexOf("=")).trim())){
									variableBooleano.push(valores[s].substring(0, valores[s].indexOf("=")).trim());
									variableBooleanoValor.push(valores[s].substring(valores[s].indexOf("=") + 1).trim());
								}
                            }else {
								if(validarVariableDeclarada(valores[s].trim())){
									variableBooleano.push(valores[s].trim());
									variableBooleanoValor.push("''");
								}
                            }
                        }
                    }else {
                        if (script.indexOf("=") != -1) {
							if(validarVariableDeclarada(script.substring(0, script.indexOf("=")).trim())){
								variableBooleano.push(script.substring(0, script.indexOf("=")).trim());
								variableBooleanoValor.push(script.substring(script.indexOf("=") + 1).trim());
							}
                        }else {
							if(validarVariableDeclarada(script.trim())){
								variableBooleano.push(script.trim());
								variableBooleanoValor.push("''");
							}
                        }

                    }
                }
            }
        }
    }
}

// Metodo que valida si una variable ya habia sido declarada
function validarVariableDeclarada(variableDecl){
	if(consultarTipoDatoVariable(variableDecl) != null){
		errores.push(ERROR_VARIABLE_YA_DECLARADA.replace("%1%", variableDecl ));
		return false;
	}else{
		return true;
	}
}

/* Validamos la estrucutra de INICIO - FIN
   Donde se ejecutan las impresiones, ciclos y condicionales  */ 
function validarInicioFin(indexInicio, indexFin){

    //valida si entro a alguna funcion, ciclo o condicional
    var encontro;
    
    //recorremos solo las lineas de inicio a fin
    for (var i = indexInicio ;i <= indexFin;i++) {
    
        encontro = false;
        //ejecuta la linea solo si no esta vacia
        if(lineasCodigo[i].trim() != ''){
            
            //validamos funciones impresion
            if(validarRegexp(PRINT, i, lineasCodigo[i])){
                validaImpresion(lineasCodigo[i], i);
                encontro = true;
            }
			
			//validamos si es una funcion READ
            if(!encontro && validarRegexp(READ, i, lineasCodigo[i])){
                validaLecturaDatos(lineasCodigo[i], i);
                encontro = true;
            }
            
            //validamos ciclos FOR
            if(!encontro && validarRegexp(FOR, i, lineasCodigo[i])){
                i = validaCicloFor(lineasCodigo, i, indexFin);
                encontro = true;
            }
            
            //validamos ciclos WHILE
            if(!encontro && validarRegexp(WHILE, i, lineasCodigo[i])){
                i = validaCicloWhile(lineasCodigo, i, indexFin);
                encontro = true;
            }
            
            //validamos condicional IF
            if(!encontro && validarRegexp(IF, i, lineasCodigo[i])){
                i = validaCondIf(lineasCodigo, i, indexFin);
                encontro = true;
            }

            //asignacion variable
            if(!encontro){
                validarAsignacionVariable(lineasCodigo[i], i);
            }
        }
    }
}

/* =================================================== FIN VALIDACION DE LA ESTRUCTURA ============================================== */

/* =================================================== ASIGNACION VALOR VARIABLE ============================================== */

function validarAsignacionVariable(linea, indice){

    //almacena la cantidad de variables encontradas
    var variableEnc = [];
    //almacena la cantidad de operaciones a realizar
    var operacion = [];
    //se unen las letras para buscar las variables
    var palabra = "";
    //variable asignacion
    var asignacion;
    
    //se divide la linea de codigo por letras
    var letra = linea.split(""); 
    
    //se reccore cada letra para la asignación
    for (var i = 0;i < letra.length ;i++) {
        
        //se toma la variable de asignacion
        if(letra[i].trim() == "="){
            asignacion = palabra;
            palabra = "";
            
        // se toman las demas variables o valores
        }else if(letra[i].trim() == SUMA || 
                 letra[i].trim() == RESTA ||
                 letra[i].trim() == MULTIPLICACION ||
                 letra[i].trim() == DIVISION || 
                 letra[i].trim() == CONCAT){
            variableEnc.push(palabra);
            operacion.push(letra[i].trim());
            palabra = "";
        }else{
            palabra = palabra + letra[i].trim();
        }
    }
    
    //anexamos la ultima palabra encontrada
    if(palabra != ''){
        variableEnc.push(palabra);
    }
    
    //numero de variables encontradas
    var numeroVariables = variableEnc.length;
    //numero de operadores encontrados
    var numeroOperadores = operacion.length;
    
    var var1Variable = false;
    var contadorOp = 0;
    var operaciones = 0;
    var opera1, opera2;
    var acumulado;
    
    
    
    //cuando solo asigna un valor o texto
    if(numeroVariables == 1 && numeroOperadores == 0){
    
        //asignar valor a una variable 
        asignarValorVarible(asignacion, variableEnc[0]);
    
    //cuando hay mas valores    
    }else{
        
       //verificamos las variables encontradas
       for (var i = 0;i < variableEnc.length ;i++) {

            if(contadorOp == 0){
                contadorOp++;
                opera1 = variableEnc[i];
            }else if(contadorOp > 0){
                contadorOp = 0;
                opera2 = variableEnc[i];
                acumulado = realizarOperacion(opera1, opera2, operacion[operaciones]);
                operaciones++;
            }
       }
       
        //Validamos si quedo una operacion pendiente
        if(contadorOp == 1){
            acumulado = realizarOperacion(opera1, acumulado, operacion[operaciones]);
        }
        
       // asignacion
       asignarValorVarible(asignacion, acumulado);
    }

    imprimirVariables();
    
}

//asigna un valor a una variable 
function asignarValorVarible(variableConsultar, valor){
    
    var encuentra = false;

    // recorremos cada variable entero
    for(var i = 0; i < variableEntero.length; i++){
        if(variableConsultar == variableEntero[i]){
			encuentra = true;
			if(!isNaN(valor)){
				variableEnteroValor[i] = valor;
			}else{
				 errores.push(ERROR_VARIABLE_NOT_TYPE_DATA.replace("%1%", ((variableConsultar != '' && variableConsultar != undefined)?variableConsultar:'' ) ));
			}
        }
    }
	
    
    if(!encuentra){
        // recorremos cada variable texto
        for(var i = 0; i < variableTexto.length; i++){
            if(variableConsultar == variableTexto[i]){
				variableTextoValor[i] = valor;
				encuentra = true;
            }
        }
    }
    
    if(!encuentra){
        // recorremos cada variable real
        for(var i = 0; i < variableReal.length; i++){
            if(variableConsultar == variableReal[i]){
				encuentra = true;
				if(!isNaN(valor)){
					variableRealValor[i] = valor;
				}else{
					errores.push(ERROR_VARIABLE_NOT_TYPE_DATA.replace("%1%", ((variableConsultar != '' && variableConsultar != undefined)?variableConsultar:'' ) ));
				}
            }
        }
    }
    
    if(!encuentra){
        // recorremos cada variable boolean
        for(var i = 0; i < variableBooleano.length; i++){
            if(variableConsultar == variableBooleano[i]){
				encuentra = true;
				var valorConvert = valor.toLowerCase();
				valorConvert = valorConvert.trim();
				if(valorConvert == "true" || valorConvert == "false"){
					variableBooleanoValor[i] = valor;
				}else{
					errores.push(ERROR_VARIABLE_NOT_TYPE_DATA.replace("%1%", ((variableConsultar != '' && variableConsultar != undefined)?variableConsultar:'' ) ));
				}
            }
        }
    }
    
    if(!encuentra){
          errores.push(ERROR_VARIABLE_NOT_FOUND.replace("%1%", ((variableConsultar != '' && variableConsultar != undefined)?variableConsultar:'' ) ));
    }
}

//REALIZA LAS OPERACIONES ENVIADAS
function realizarOperacion(valorV2, valorV1 , operacion){
    var retorno;

    //valiamos si la variable existe
    var a = consultarValorVariable(valorV1);
    var b = consultarValorVariable(valorV2);
    
    if(a != null ){
        valorV1 = a;
    }
    if(b != null ){
        valorV2 = b;
    }
    
    if(operacion == SUMA){
        retorno = parseInt(valorV1) + parseInt(valorV2);
    }else if(operacion == MULTIPLICACION){
        retorno = parseInt(valorV1) * parseInt(valorV2);
    }else if(operacion == DIVISION){
        retorno = parseInt(valorV1) / parseInt(valorV2);
    }else if(operacion == RESTA){
        retorno = parseInt(valorV1) - parseInt(valorV2);
    }else if(operacion == CONCAT){
        retorno = valorV2 + valorV1;
    }
    
    return retorno;
}

/* =================================================== FIN ASIGNACION VALOR VARIABLE ============================================== */

/* =========================================================== VALIDAR CICLO FOR ===================================================== */

//Metodo que valida el ciclo for
function validaCicloFor(linea, indice, indiceMax) {

    //indica donde termina el for
    var retorno = indiceMax;
    //posicion de la variable a contar
    var posicionVariable = -1;
    var indiceFinPara = -1;
    var cantidadRepeticiones = 0;
    var encontroVariable = true;
    //si encontramos otro for dentro se aumenta el contador
    var cantidadFinPara = 0;
    // cuenta la cantidad de fin para encontrados
    var finParaEncontrados = 0;
    //estructura del para
    var estructuraFor = linea[indice].split(" ");
    
    for (var i = 1;i < estructuraFor.length ;i++) {
        
        if(i == STEP_FOR_VARIABLE){ // variable
            //buscamos la variable en la declaracion
            for(var k = 0; k < variableEntero.length; k++){
                if(estructuraFor[i].trim() == variableEntero[k]){
                    posicionVariable = k;
                    break;
                }
            } 
            if(posicionVariable == -1){
                encontroVariable = false;
                errores.push( ERROR_MISS_DECLARE_VARIABLE.replace("%1%", estructuraFor[i].trim()) + (indice + 1));
                break;
            }
        }
        
        //continuamos solo si encontro la variable del for
        if(encontroVariable){
            // asignacion de valor a la variable del for
            if(i == STEP_FOR_VALOR_DESDE){
                variableEnteroValor[posicionVariable] = estructuraFor[i].trim();
                imprimirVariables();
            }
            
            //validacion de numero de repeciones
            if(i == STEP_FOR_VALUE_HASTA){
                 cantidadRepeticiones = parseInt(estructuraFor[i]); 
                  //Compruebo si es un valor numérico 
                  if (isNaN(cantidadRepeticiones)) { 
                     errores.push(ERROR_MISS_FOR_HASTA_VALUE + (indice + 1));
                  }
            }
        }
    }
    
    //validacion linea del fin para
    for(var i = (indice + 1); i < (indiceMax + 1); i++){
        if(linea[i].indexOf(FOR) != -1 && linea[i].indexOf(END_FOR) != -1){
            cantidadFinPara++;
        }
        if(linea[i].indexOf(END_FOR) != -1){
            finParaEncontrados++;
            indiceFinPara = i;
            retorno = i+1;
        }
    }
    //verificamos la cantidad de fin para encontrados
    //si no esta el fin para muestra error
    if(indiceFinPara == -1 || (cantidadFinPara != finParaEncontrados)){
        errores.push(ERROR_MISS_WORD_RESERVE_2 + END_FOR);
    }else{
        // si esta el fin para ejecuta el ciclo
        ejecutarFor(posicionVariable, cantidadRepeticiones, (indice+1), (indiceFinPara-1));
    }
    return retorno;
}

// Metodo que itera el ciclo para ingresado
function ejecutarFor(posicionVariable, cantidadRepeticiones, indiceInicio, indiceFin ){
    //recorremos el ciclo de para a fin para
    for(var i = variableEnteroValor[posicionVariable]; i <= cantidadRepeticiones; i++ ){
        //incrementamos la variable
        variableEnteroValor[posicionVariable] = i;
        validarInicioFin(indiceInicio,indiceFin);
        imprimirVariables();
    }
}


/* ========================================================= FIN VALIDAR CICLO FOR =================================================== */

/* =========================================================== VALIDAR CICLO WHILE ===================================================== */

//Metodo que valida el ciclo while
function validaCicloWhile(linea, indice, indiceMax) {

    //indica donde termina el Mientras
    var retorno = indiceMax;
    var indiceFinMientras = -1;
    //si encontramos otro Mientras dentro se aumenta el contador
    var cantidadFinMientras = 0;
    // cuenta la cantidad de fin Mientras encontrados
    var finMientrasEncontrados = 0;
    //almacena el valor resultado de la expresion (BOOLEAN)
    var resultadoExpresion = false;
    //almacena la expresion
    var valorExpresion;

    //asignamos la estructura
    valorExpresion = linea[indice].substring((linea[indice].indexOf("(")+1), 
                                                (linea[indice].indexOf(")"))).trim();
    
    //validacion linea del fin mientras
    for(var i = (indice + 1); i < (indiceMax + 1); i++){
        if(linea[i].indexOf(WHILE) != -1 && linea[i].indexOf(END_WHILE) != -1){
            cantidadFinMientras++;
        }
        if(linea[i].indexOf(END_WHILE) != -1){
            finMientrasEncontrados++;
            indiceFinMientras = i;
            retorno = i+1;
        }
    }
    //verificamos la cantidad de fin mientras encontrados
    //si no esta el fin mientras muestra error
    if(indiceFinMientras == -1 || (cantidadFinMientras != finMientrasEncontrados)){
        errores.push(ERROR_MISS_WORD_RESERVE_2 + END_WHILE);
    }else{
        
        // si esta el fin mientras ejecuta el ciclo
        ejecutarWhile(valorExpresion, (indice), (indiceFinMientras));
    }
    return retorno;
}

// Metodo que itera el ciclo para ingresado
function ejecutarWhile(valorExpresion, indiceInicio, indiceFin ){

    //se ejecuta solo si la expresion es positiva
    while(validarExpresion(valorExpresion)){
        validarInicioFin((indiceInicio+1),(indiceFin-1));
    }
}


/* ========================================================= FIN VALIDAR CICLO WHILE =================================================== */



/* =========================================================== VALIDAR CONDICIONAL IF ===================================================== */

//Metodo que valida la condicional si
function validaCondIf(linea, indice, indiceMax) {

    //indica donde termina el Mientras
    var retorno = indiceMax;
    var indiceFinSi = -1;
    //si encontramos otro Mientras dentro se aumenta el contador
    var cantidadFinSi = 0;
    // cuenta la cantidad de fin Mientras encontrados
    var finSiEncontrados = 0;
    //almacena el valor resultado de la expresion (BOOLEAN)
    var resultadoExpresion = false;
    //almacena la expresion
    var valorExpresion;
    
    //asignamos la estructura
    valorExpresion = linea[indice].substring((linea[indice].indexOf("(")+1), 
                                                (linea[indice].indexOf(")"))).trim();
    
    //validacion linea del fin si
    for(var i = (indice + 1); i < (indiceMax + 1); i++){
        if(linea[i].indexOf(IF) != -1 && linea[i].indexOf(END_IF) != -1){
            cantidadFinSi++;
        }
        if(linea[i].indexOf(END_IF) != -1){
            finSiEncontrados++;
            indiceFinSi = i;
            retorno = i+1;
        }
    }
    
    //verificamos la cantidad de fin mientras encontrados
    //si no esta el fin mientras muestra error
    if(indiceFinSi == -1 || (cantidadFinSi != finSiEncontrados)){
        errores.push(ERROR_MISS_WORD_RESERVE_2 + END_IF);
    }else{
    
        // si esta el fin mientras ejecuta el ciclo
        ejecutarIf(valorExpresion, (indice+1), (indiceFinSi-1));
    }
    return retorno;
}

// Metodo que ejecuta el condicional si 
function ejecutarIf(valorExpresion, indiceInicio, indiceFin ){
    //se ejecuta solo si la expresion es positiva
    if(validarExpresion(valorExpresion)){
        validarInicioFin(indiceInicio,indiceFin);
    }
}


/* ========================================================= FIN VALIDAR CONDICIONAL IF =================================================== */


//validar expresion (BOOLEAN)
function validarExpresion(valorExpresion) {
    var variable;
    var valorV1;
    var comparacionVariable;
    valorExpresion = valorExpresion.replace(/[\(\)]/g, '');
    //validamos un ciclo infinito
    if (valorExpresion.trim() == "true") {
        errores.push(ERROR_WHILE_INFINITO);
        return false;
    }else if (valorExpresion.trim() == "false") {
        errores.push(ERROR_WHILE_NOT_INFINITO);
        return false;
    }

    var patt = new RegExp(/(<)|(>)|(=)|(!)/g);
    var ress = patt.exec(valorExpresion);

    //validamos si hay una o mas variables en la condicion
    if (ress == null){
        //una variable
        //validamos si es un numero
        variable = parseInt(valorExpresion);
        //Compruebo si es un valor numérico 
        if (isNaN(variable)){
            //si no es numero validamos las variables
            valorV1 = consultarValorVariable(valorExpresion);
            if (valorV1 == null){
                //no existe la variable
                errores.push(ERROR_WHILE_DONT_DECLARE_VAR);
            }else if (valorV1 == '' || (valorV1 != 'true' && valorV1 != 'false')){
                //no tiene un valor asignado o booleano
                errores.push(ERROR_WHILE_DONT_VALUE_VAR);
            }else if (valorV1 == true || valorV1.indexOf('true') != -1){
                return true;
            }else if (valorV1 == false || valorV1.indexOf('false') != -1){
                return false;
            }
        }else{
            // es un numero y no es comparado (no puede ser evaluado como vnrdadero o falso)
            errores.push(ERROR_WHILE_DONT_EVALUATE_EXPRESSION);
        }
    }else {
        //dos variables
        /* Dos Variables
         * Validaciones: No se permite validar dos variables de tipos diferente, excepto numeros
         * Texto : solo permite evaluar (==, !=) 
         * numero (entero o real): solo permite evaluar (==, <, >, <>, <=, >=, =>, =<)
         * booleano: solo permite evaluar (==, !=) */
        
        var variablePorPartes = valorExpresion.split(/(<)|(>)|(=)|(!)/g);
        var variablePorPartesR = [];
        var variablePP = [];
        var tipoDatoV1;
        var tipoDatoV2;
        var cont = 0;
        
        for(var i = 0; i < variablePorPartes.length; i++){
            if(variablePorPartes[i] != '' && variablePorPartes[i] != undefined){
                // validaciones 
                variablePorPartesR[cont] = variablePorPartes[i];
                cont++;
            }
        }
        
        variablePP[0] = variablePorPartesR[0].trim();
        if(variablePorPartesR.length == 3){
            variablePP[1] = variablePorPartesR[1].trim();
            variablePP[2] = variablePorPartesR[2].trim();
        }else{
            variablePP[1] = variablePorPartesR[1].trim() + variablePorPartesR[2].trim();
            variablePP[2] = variablePorPartesR[3].trim();
        }
        
        tipoDatoV1 = consultarTipoDatoVariable(variablePP[0]);
        tipoDatoV2 = consultarTipoDatoVariable(variablePP[2]);
        
        //validamos q las variables sean del mismo tipo de dato
        if(tipoDatoV1 != tipoDatoV2){
             errores.push(ERROR_WHILE_DIFFERENT_TIPE_DATA);
        }else{
            
            //validamos la comparacion de variable
            if(variablePP[1] == EQUAL){
                comparacionVariable = EQUAL;
            }else if(variablePP[1] == "!=" || variablePP[1] == "<>"){
                comparacionVariable = DIFFERENT;
            }else if(variablePP[1] == MAJOR){
                comparacionVariable = MAJOR;
            }else if(variablePP[1] == LESS){
                comparacionVariable = LESS;
            }else if(variablePP[1] == ">=" || variablePP[1] == "=>"){
                comparacionVariable = MAJOR_OR_EQUAL;
            }else if(variablePP[1] == "<=" || variablePP[1] == "=<"){
                comparacionVariable = LESS_OR_EQUAL;
            }
            
            var valor1 = consultarValorVariable(variablePP[0]);
            var valor2 = consultarValorVariable(variablePP[2]);
            
            return compararDatos(valor1, valor2, comparacionVariable);
        }
        
    }

    return false;
}

function compararDatos(dato1, dato2, comparador){
    var retorno;
    
    if(comparador == EQUAL){
        retorno = (dato1 == dato2);
    }else if(comparador == DIFFERENT){
        retorno = (dato1 != dato2);
    }else if(comparador == MAJOR){
        retorno = (parseInt(dato1) > parseInt(dato2));
    }else if(comparador == LESS){
        retorno = (parseInt(dato1) < parseInt(dato2));
    }else if(comparador == MAJOR_OR_EQUAL){
        retorno = (parseInt(dato1) >= parseInt(dato2));
    }else if(comparador == LESS_OR_EQUAL){
        retorno = (parseInt(dato1) <= parseInt(dato2));
    }

    return retorno;
}

//valida la estructura de  ciclos y condicionales
function validarRegexp(tipo, indice, linea){

    //variables de la expresion regular
    var patt;
    var retorno = false;
    var res;
    
    if(linea.indexOf(IF) != -1 && tipo == IF){
        retorno = true;
        patt = new RegExp(EX_IF);
        res = patt.exec(linea);
        if(res == null){
            errores.push(ERROR_ESTRUCTURE_INCOMPLETE.replace('%1%',IF) + (indice + 1));
            retorno = false;
        }
    }else if(linea.indexOf(FOR) != -1 && tipo == FOR){
        retorno = true;
        patt = new RegExp(EX_FOR);
        res = patt.exec(linea);
        if(res == null){
            errores.push(ERROR_ESTRUCTURE_INCOMPLETE.replace('%1%',FOR) + (indice + 1));
            retorno = false;
        }
    }else if(linea.indexOf(WHILE) != -1 && tipo == WHILE){
        retorno = true;
        patt = new RegExp(EX_WHILE);
        res = patt.exec(linea);
        if(res == null){
            errores.push(ERROR_ESTRUCTURE_INCOMPLETE.replace('%1%',WHILE) + (indice + 1));
            retorno = false;
        }
    }else if(linea.indexOf(PRINT) != -1 && tipo == PRINT){
        retorno = true;
        patt = new RegExp(EX_PRINT);
        res = patt.exec(linea);
        if(res == null){
            errores.push(ERROR_ESTRUCTURE_INCOMPLETE.replace('%1%',PRINT) + (indice + 1));
            retorno = false;
        }
    }else if(linea.indexOf(READ) != -1 && tipo == READ){
        retorno = true;
        patt = new RegExp(EX_READ);
        res = patt.exec(linea);
        if(res == null){
            errores.push(ERROR_ESTRUCTURE_INCOMPLETE.replace('%1%',READ) + (indice + 1));
            retorno = false;
        }
    }
    
    return retorno;
 
}

//validar funciones PRINT
function validaImpresion(linea, indice) {
    //quitamos los parentesis
    linea = linea.replace(/[\(\)]/g, '');
    if (linea.indexOf("\"") != -1) {
        var textoTemp = linea.substring((linea.indexOf("\"") + 1));
        if (textoTemp.indexOf("\"") != -1) {
            imprimirConsola(textoTemp.substring(0, textoTemp.indexOf("\"")));
        }else {
            errores.push(ERROR_MISS_COMILLA + (indice + 1));
        }
    }else {
        //es una variable y no un texto en comillas
        variableConsultar = linea.replace(PRINT, '').trim();
        variableValor = consultarValorVariable(variableConsultar);
        if(variableValor == null){
            errores.push(ERROR_MISS_VARIABLE.replace("%1%", variableConsultar) + (indice + 1));
        }else{
            imprimirConsola(variableValor);
        }
        
    }
}

//validar funciones READ
function validaLecturaDatos(linea, indice) {
    //quitamos los parentesis
    linea = linea.replace(/[\(\)]/g, '');
	
	variableConsultar = linea.replace(READ, '').trim();
	variableValor = consultarValorVariable(variableConsultar);
	
	if(variableValor == null){
		errores.push(ERROR_MISS_VARIABLE.replace("%1%", variableConsultar) + (indice + 1));
	}else{
		var temporalValor = prompt('Escribir un valor', '');
		asignarValorVarible(variableConsultar, temporalValor);
		imprimirVariables();
	}
        
}

/* ========================================== IMPRESIONES DE CONSOLAS Y TEXTAREAS ==============================================================*/

// consulta el valor de una variable si no existe retorna null
function consultarValorVariable(variableConsultar){
    var retorno = null;
    // recorremos cada variable entero
    for(var i = 0; i < variableEntero.length; i++){
        if(variableConsultar == variableEntero[i]){
            return variableEnteroValor[i];
        }
    }
    
    // recorremos cada variable texto
    for(var i = 0; i < variableTexto.length; i++){
        if(variableConsultar == variableTexto[i]){
            return variableTextoValor[i];
        }
    }
    
    // recorremos cada variable real
    for(var i = 0; i < variableReal.length; i++){
        if(variableConsultar == variableReal[i]){
            return variableRealValor[i];
        }
    }
    
    // recorremos cada variable boolean
    for(var i = 0; i < variableBooleano.length; i++){
        if(variableConsultar == variableBooleano[i]){
            return variableBooleanoValor[i];
        }
    }

    return retorno;
}

// consulta el tipo de dato de una variable
function consultarTipoDatoVariable(variableConsultar){
    var retorno = null;
    // recorremos cada variable entero
    for(var i = 0; i < variableEntero.length; i++){
        if(variableConsultar == variableEntero[i]){
            return INT;
        }
    }
    
    // recorremos cada variable texto
    for(var i = 0; i < variableTexto.length; i++){
        if(variableConsultar == variableTexto[i]){
            return STRING;
        }
    }
    
    // recorremos cada variable real
    for(var i = 0; i < variableReal.length; i++){
        if(variableConsultar == variableReal[i]){
            return INT;
        }
    }
    
    // recorremos cada variable boolean
    for(var i = 0; i < variableBooleano.length; i++){
        if(variableConsultar == variableBooleano[i]){
            return BOOLEAN;
        }
    }

    return retorno;
}

function imprimirConsola(valorImprime) {
    document.getElementById("consolaCod").innerHTML = document.getElementById("consolaCod").value + valorImprime + "\n";
}

//imprime las variables en la consola de variables y valores
function imprimirVariables() {
    document.getElementById("variablesCod").innerHTML = "";
    //enteros
    for (var i = 0;i < variableEntero.length;i++) {
        document.getElementById("variablesCod").innerHTML = document.getElementById("variablesCod").value + INT + " " + variableEntero[i] + " = " + variableEnteroValor[i] + "\n";
    }
    //texto
    for (var i = 0;i < variableTexto.length;i++) {
        document.getElementById("variablesCod").innerHTML = document.getElementById("variablesCod").value + STRING + " " + variableTexto[i] + " = " + variableTextoValor[i] + "\n";
    }
    //real
    for (var i = 0;i < variableReal.length;i++) {
        document.getElementById("variablesCod").innerHTML = document.getElementById("variablesCod").value + FLOAT + " " + variableReal[i] + " = " + variableRealValor[i] + "\n";
    }
    //boolean
    for (var i = 0;i < variableBooleano.length;i++) {
        document.getElementById("variablesCod").innerHTML = document.getElementById("variablesCod").value + BOOLEAN + " " + variableBooleano[i] + " = " + variableBooleanoValor[i] + "\n";
    }
}

// mostrar mensajes informativos o de error
function mostrarMensajes() {
    if (errores.length > 1) {
        document.getElementById("divErrorID").style.display = "";
        document.getElementById("errorID").innerHTML = errores.toString().replace(",", "<br/>* ");
    }else {
        document.getElementById("divMensajeID").style.display = "";
        document.getElementById("mensajeID").innerHTML = mensajes.toString();
    }
    window.scrollTo(0, 0);
}

//limpia la consola y la salida de variables y valores
function resetCampos() {
    document.getElementById("variablesCod").innerHTML = "";
    document.getElementById("consolaCod").innerHTML = "";
}

// ======== FUNCIONES GENERALES DE JQUERY =========
// Numero de lineas para textArea	
$(function () {
    $(".lined").linedtextarea( {
        selectedLine : 1
    });
});


// Scroll-auto para textArea lineasCod	
/*var textarea = document.getElementById('lineasCod');
setInterval(function () {
    textarea.scrollTop = textarea.scrollHeight;
},
1000);*/