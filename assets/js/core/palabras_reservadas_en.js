// ======== CONSTANTES ========

//EXPRESIONES REGULARES
const EX_PRINT = /(print)(|\s+)[(](|\s+)(|["])(.+)(|["])(|\s+)(|\s+|,+|.+|\s+)(|\s+)[)]/g;
const EX_FOR = /(for)(\s+)(\w+)(\s+)(from)(\s+)(\w+)(\s+)(to)(\s+)(\d+)(\s+)(do)/g;
const EX_WHILE = /(while)(|\s+)[(](|\s+)(\w+)(|\s+)(|(<|>|<=|>=|=>|=<|==|!=|<>)(|\s+)(\w+))(|\s+)[)](|\s+)(then)/g;
const EX_IF = /(if)(|\s+)[(](|\s+)(\w+)(|\s+)(|(<|>|<=|>=|=>|=<|==|!=|<>)(|\s+)(\w+))(|\s+)[)](|\s+)(then)/g;
const EX_READ = /(read)(|\s+)[(](|\s+)(\w+)(|\s+)[)]/g;

//INICIO Y FIN
const INICIO = "<begin>"; 
const END = "<end>"; 

//COMENTARIOS
const COMMENT = "--"

//VARIABLES
const DECLARE = "<declare>"; 
const END_DECLARE = "<end declare>"; 
var VARIABLES = ["integer", "text", "real", "boolean"];
const INT = "integer"; 
const STRING = "text"; 
const FLOAT = "real"; 
const BOOLEAN = "boolean";

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

// PASOS FOR

const STEP_FOR_VARIABLE = 1;
const STEP_FOR_VALOR_DESDE = 3;
const STEP_FOR_HASTA = 4;
const STEP_FOR_VALUE_HASTA = 5;

//CONDICIONALES
const IF = "if";
const IF_THEN = "then";
const ELSE_IF = "else if";
const ELSE = "else";
const END_IF = "end if";

//CICLOS
const FOR = "for";
const FOR_DESDE = "from";
const FOR_HASTA = "to";
const FOR_WHILE_HACER = "do";
const END_FOR = "end for";
const WHILE = "while";
const END_WHILE = "end while";

//FUNCIONES
const PRINT = "print";
const READ = "read";

//EXITO
const SUCCESS = "successful execution";

//ERRORES GENERALES
// &lt;declare&gt;: = <declare> 
const ERROR_INIT = "";
const ERROR_MISS_END_DECLARE = "Tag missing &lt;end declare&gt;";
const ERROR_MISS_DECLARE = "Tag missing &lt;end declare&gt;";
const ERROR_MISS_INICIO = "Tag missing &lt;begin&gt;";
const ERROR_MISS_END = "Tag missing &lt;end&gt;";
const ERROR_MISS_COMILLA = "Missing quotes (\") in the line: ";
const ERROR_ESTRUCTURE_INCOMPLETE = "The structure %1% is not complete, in the line: ";
const ERROR_MISS_WORD_RESERVE = "Word foul reserved %1%,  in the line: ";
const ERROR_MISS_DECLARE_VARIABLE = "Missing declare variable %1%, in the line: ";
const ERROR_MISS_FOR_HASTA_VALUE = "the value until the line is missing, in the line: ";
const ERROR_INICIO = "Missing closing the tag &lt;begin&gt; (&lt;begin&gt;)";
const ERROR_END = "Missing closing the tag, &lt;begin&gt; (&lt;end&gt;)";
const ERROR_MISS_PC_DECLARE = "In block &lt;declare&gt; missing semicolon (;) to finish line";
const ERROR_MISS_WORD_RESERVE_2 = "No reserved word was found: ";
const ERROR_MISS_VARIABLE = "did not find the variable %1%, in the line: ";
const ERROR_WHILE_INFINITO = "Error while infinite cycle must change expression.";
const ERROR_WHILE_NOT_INFINITO = "The cycle will never be used as recommended delete it or comment on it.";
const ERROR_WHILE_DONT_EVALUATE_EXPRESSION = "Expression cycle while can not be assessed.";
const ERROR_WHILE_DONT_DECLARE_VAR = "Variable cycle (while) until it has been declared";
const ERROR_WHILE_DONT_VALUE_VAR = "Variable cycle while not a Boolean or not been initialized value.";
const ERROR_WHILE_DIFFERENT_TIPE_DATA = "Variables while cycle are not the same type.";
const ERROR_VARIABLE_NOT_FOUND = "Variable %1% has not been declared.";
const ERROR_VARIABLE_NOT_TYPE_DATA = "The value of the variable %1% does not correspond to their data type.";
const ERROR_VARIABLE_YA_DECLARADA = "The variable %1% has already been declared.";
// ======== FIN CONSTANTES ========

