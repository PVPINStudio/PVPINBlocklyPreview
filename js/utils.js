const ORD_NONE = Blockly.JavaScript.ORDER_NONE;
const ORD_ATOM = Blockly.JavaScript.ORDER_ATOMIC;

function impt(pkgPaths) {
    var pkg;
    for (pkg of pkgPaths) {
        const arr = pkg.split(".");
        const clazz = arr.pop();
        Blockly.JavaScript.definitions_["import_" + clazz.toLowerCase()] =
            "var " + clazz + " = Java.type('" + pkg + "');";
    }
}
