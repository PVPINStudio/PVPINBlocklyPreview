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

function gtv(block, fieldName) {
    return Blockly.JavaScript.valueToCode(block, fieldName, ORD_ATOM);
}

function bbk(id, con) {
    Blockly.Blocks[id] = con;
}

function bjs(id, func) {
    Blockly.JavaScript[id] = func;
}
