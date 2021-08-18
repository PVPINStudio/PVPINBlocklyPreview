function impt(pkgPaths) {
    for (pkg in pkgPaths) {
        const p = pkgPaths[pkg];
        const arr = p.split(".");
        const clazz = arr.pop();
        Blockly.JavaScript.definitions_["import_" + clazz.toLowerCase()] =
            "var " + clazz + " = Java.type('" + p + "');";
    }
}
