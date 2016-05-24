// ======== CONSTANTES ========

//EXPRESIONES REGULARES
const EX_PRINT = /(imprima)(|\s+)[(](|\s+)(|["])(.+)(|["])(|\s+)(|\s+|,+|.+|\s+)(|\s+)[)]/g;
const EX_FOR = /(para)(\s+)(\w+)(\s+)(desde)(\s+)(\w+)(\s+)(hasta)(\s+)(\d+)(\s+)(hacer)/g;
const EX_WHILE = /(mientras)(|\s+)[(](|\s+)(\w+)(|\s+)(|(<|>|<=|>=|=>|=<|==|!=|<>)(|\s+)(\w+))(|\s+)[)](|\s+)(entonces)/g;
const EX_IF = /(si)(|\s+)[(](|\s+)(\w+)(|\s+)(|(<|>|<=|>=|=>|=<|==|!=|<>)(|\s+)(\w+))(|\s+)[)](|\s+)(entonces)/g;
const EX_READ = /(lea)(|\s+)[(](|\s+)(\w+)(|\s+)[)]/g;

//INICIO Y FIN
const INICIO = "<inicio>"; 
const END = "<fin>"; 

//COMENTARIOS
const COMMENT = "--"

//VARIABLES
const DECLARE = "<declarar>"; 
const END_DECLARE = "<fin declarar>"; 
var VARIABLES = ["entero", "texto", "real", "booleano"];
const INT = "entero"; 
const STRING = "texto"; 
const FLOAT = "real"; 
const BOOLEAN = "booleano";

//COMPARADORES
const EQUAL = "==";
const DIFFERENT = "!=";
const MAJOR = ">";
const LESS = "<";
const MAJOR_OR_EQUAL = ">=";
const LESS_OR_EQUAL = "<=";

//OPERAICONES
const SUMA = "+";
const MULTIPLICACION = "*";
const DIVISION = "/";
const RESTA = "-";
const CONCAT = "|";

//TIPOS EJECUCION
const TIPO_IF = "1";
const TIPO_CICLO_FOR = "2";
const TIPO_CICLO_WHILE = "3";

/* PASOS FOR
 * pasos: 0 para, 1 variable (i), 2  desde, 3 numero, 4 hasta, 5 cantidad, 6 hacer */
const STEP_FOR_VARIABLE = 1;
const STEP_FOR_VALOR_DESDE = 3;
const STEP_FOR_HASTA = 4;
const STEP_FOR_VALUE_HASTA = 5;

//CONDICIONALES
const IF = "si";
const IF_THEN = "entonces";
const ELSE_IF = "sino si";
const ELSE = "sino";
const END_IF = "fin si";

//CICLOS
const FOR = "para";
const FOR_DESDE = "desde";
const FOR_HASTA = "hasta";
const FOR_WHILE_HACER = "hacer";
const END_FOR = "fin para";
const WHILE = "mientras";
const END_WHILE = "fin mientras";

//FUNCIONES
const PRINT = "imprima";
const READ = "lea";

//EXITO
const SUCCESS = "Ejecución exitosa";

//ERRORES GENERALES
// &lt;declarar&gt;: = <declarar>   expresion regular para final de palabra con punto y coma \w(;)
const ERROR_INIT = "El codigo no pudo ser procesado por que:";
const ERROR_MISS_END_DECLARE = "Falta la etiqueta &lt;fin declarar&gt;";
const ERROR_MISS_DECLARE = "Falta la etiqueta &lt;fin declarar&gt;";
const ERROR_MISS_INICIO = "Falta la etiqueta &lt;inicio&gt;";
const ERROR_MISS_END = "Falta la etiqueta &lt;fin&gt;";
const ERROR_MISS_COMILLA = "Falta comillas (\") en la linea: ";
const ERROR_ESTRUCTURE_INCOMPLETE = "La estructura %1% no esta completa, en la linea: ";
const ERROR_MISS_WORD_RESERVE = "Falta palabra reservada %1%,  en la linea: ";
const ERROR_MISS_DECLARE_VARIABLE = "Falta declarar la variable %1%, en la linea: ";
const ERROR_MISS_FOR_HASTA_VALUE = "Falta el valor para hasta en la linea: ";
const ERROR_INICIO = "Falta cerrar la etiqueta &lt;inicio&gt; (&lt;inicio&gt;)";
const ERROR_END = "Falta cerrar la etiqueta &lt;inicio&gt; (&lt;fin&gt;)";
const ERROR_MISS_PC_DECLARE = "En el bloque &lt;declarar&gt; falta punto y coma (;) para finalizar linea";
const ERROR_MISS_WORD_RESERVE_2 = "No se encontro la palabra reservada: ";
const ERROR_MISS_VARIABLE = "No se encontro la variable '%1%', en la linea: ";
const ERROR_WHILE_INFINITO = "Error el ciclo mientras es infinito debe cambiar la expresion.";
const ERROR_WHILE_NOT_INFINITO = "El ciclo mientras nunca sera utilizado se recomienda borrarlo o comentarlo.";
const ERROR_WHILE_DONT_EVALUATE_EXPRESSION = "La expresion del ciclo mientras no puede ser evaluada.";
const ERROR_WHILE_DONT_DECLARE_VAR = "La variable del ciclo mientras no ha sido declarada.";
const ERROR_WHILE_DONT_VALUE_VAR = "La variable del ciclo mientras no tiene un valor booleano o no a sido inicializada.";
const ERROR_WHILE_DIFFERENT_TIPE_DATA = "Las variables del ciclo mientras no son del mismo tipo.";
const ERROR_VARIABLE_NOT_FOUND = "La variable '%1%' no ha sido declarada.";
const ERROR_VARIABLE_NOT_TYPE_DATA = "El valor de la variable %1% no corresponde a su tipo de dato.";
const ERROR_VARIABLE_YA_DECLARADA = "La variable '%1%' ya ha sido declarada.";
// ======== FIN CONSTANTES ========




