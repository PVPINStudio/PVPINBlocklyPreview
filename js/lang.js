function generate() {
    var code_js = generateJS();
    var code_ms = generateMS();
    var xml_text = generateXML();

    document.getElementById("jsUncompressed").innerHTML = code_js;
    document.getElementById("msUncompressed").innerHTML = code_ms;
    document.getElementById("xmlPretty").innerHTML = xml_text.replace(/</g, "&lt;");
}
// Update Code & XML
function generateXML() {
    return Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(workspace));
}
function generateJS() {
    Blockly.JavaScript.addReservedWords('code');
    Blockly.JavaScript.addReservedWords('name');
    Blockly.JavaScript.addReservedWords('version');
    Blockly.JavaScript.addReservedWords('author');
    Blockly.JavaScript.finish = finishJS;
    return Blockly.JavaScript.workspaceToCode(workspace);
}
function generateMS() {
    Blockly.JavaScript.addReservedWords('code');
    Blockly.JavaScript.addReservedWords('name');
    Blockly.JavaScript.addReservedWords('version');
    Blockly.JavaScript.addReservedWords('author');
    Blockly.JavaScript.finish = finishMS;
    return Blockly.JavaScript.workspaceToCode(workspace);
}

function generateImports(definitions) {
    var patt = new RegExp("import_", "i");
    var imports = [];
    for (var name in definitions) {
        if (patt.test(name)) {
            imports.push(definitions[name]);
            // Select definitions that begins with 'import_'. 
            // Actually the Reg Expression matches any string that contains 'import_'.
            var key = definitions[name].split(" ")[1];
            Blockly.JavaScript.addReservedWords(key);
            definitions[name] = undefined;
        }
    }
    return imports;
}

var finishMS = function (code) {
    var plugin_info = "var name = '" + Blockly.JavaScript.definitions_['plugin_info'][0] + "';\n"
        + "var version = '" + Blockly.JavaScript.definitions_['plugin_info'][1] + "';\n"
        + "var author = '" + Blockly.JavaScript.definitions_['plugin_info'][2] + "';\n";
    Blockly.JavaScript.definitions_['plugin_info'] = undefined;
    var imports = generateImports(Blockly.JavaScript.definitions_);
    var definitions = [];
    for (var name in Blockly.JavaScript.definitions_) {
        var func = Blockly.JavaScript.definitions_[name];
        if (func) {
            definitions.push(func);
        }
    }
    // Clean up temporary data.
    delete Blockly.JavaScript.definitions_;
    delete Blockly.JavaScript.functionNames_;
    Blockly.JavaScript.nameDB_.reset();

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "js/lang/miaoscript.js", false);
    xmlhttp.send();
    var ret = imports.join('\n') + '\n\n' + definitions.join('\n\n') + '\n\n' + code + '\n' + plugin_info;
    ret += "\n";
    ret += xmlhttp.responseText;
    return ret;
};

var finishJS = function (code) {
    // var plugin_info = Blockly.JavaScript.definitions_['plugin_info'];
    var plugin_info = "var name = '" + Blockly.JavaScript.definitions_['plugin_info'][0] + "';\n"
        + "var version = '" + Blockly.JavaScript.definitions_['plugin_info'][1] + "';\n"
        + "var author = '" + Blockly.JavaScript.definitions_['plugin_info'][2] + "';\n";
    Blockly.JavaScript.definitions_['plugin_info'] = undefined;
    var imports = generateImports(Blockly.JavaScript.definitions_);
    var definitions = [];
    for (var name in Blockly.JavaScript.definitions_) {
        var func = Blockly.JavaScript.definitions_[name];
        if (func) {
            definitions.push(func);
        }
    }
    // Clean up temporary data.
    delete Blockly.JavaScript.definitions_;
    delete Blockly.JavaScript.functionNames_;
    Blockly.JavaScript.nameDB_.reset();

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "js/lang/pvpin.js", false);
    xmlhttp.send();
    var ret = imports.join('\n') + '\n\n' + definitions.join('\n\n') + '\n\n' + code + '\n' + plugin_info;
    ret += "\n";
    ret += xmlhttp.responseText;

    return ret;
};
