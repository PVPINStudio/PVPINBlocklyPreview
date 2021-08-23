var options;
var blocklyDiv;
var workspace;
var workspaceSearch;
// Blockly injection

var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", "xml/toolbox_modified.xml", false);
xmlhttp.send();
options = {
    toolbox: xmlhttp.responseText,
    collapse: true,
    comments: true,
    disable: true,
    maxBlocks: Infinity,
    trashcan: true,
    horizontalLayout: false,
    toolboxPosition: "start",
    css: true,
    media: "media/",
    // The default media URL (appspot.com) is not accessible to most users from China
    rtl: false,
    scrollbars: true,
    sounds: true,
    oneBasedIndex: true,
    plugins: {
        'connectionChecker': 'PVPINConnectionChecker'
    }
};
// Toolbox options
blocklyDiv = document.getElementById("blocklyDiv");
workspace = Blockly.inject("blocklyDiv", options);
workspaceSearch = new WorkspaceSearch(workspace);

function initPVPINBlocklyEditor() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "xml/workspace_init.xml", false);
    xmlhttp.send();
    var xml = Blockly.Xml.textToDom(xmlhttp.responseText);
    Blockly.Xml.domToWorkspace(xml, workspace);

    workspaceSearch.init();
}
// Called after the page has been successfully loaded
// Add a function main() block to the workspace and add a search bar

function getMainWorkspace() {
    return workspace;
}

window.addEventListener("message", (event) => {
    if (event.data[0] == "xml") {
        var xml = Blockly.Xml.textToDom(event.data[1]);
        Blockly.Xml.domToWorkspace(xml, workspace);
    } else if (event.data[0] == "resize") {
        Blockly.svgResize(workspace);
    }
});

function svgToPng_(data, width, height, callback) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const img = new Image();
    const pixelDensity = 10;
    canvas.width = width * pixelDensity;
    canvas.height = height * pixelDensity;

    img.onload = function () {
        context.drawImage(img, 0, 0, width, height, 0, 0, canvas.width, canvas.height);

        try {
            const dataUri = canvas.toDataURL("image/png");
            callback(dataUri);
        } catch (err) {
            console.warn("Error converting the workspace svg to a png");
            callback("");
        }
    };

    img.src = data;
}

function workspaceToSvg_(workspace, callback, customCss) {
    // Go through all text areas and set their value.
    const textAreas = document.getElementsByTagName("textarea");

    for (let i = 0; i < textAreas.length; i++) {
        textAreas[i].innerHTML = textAreas[i].value;
    }

    const bBox = workspace.getBlocksBoundingBox();
    const x = bBox.x || bBox.left;
    const y = bBox.y || bBox.top;
    const width = bBox.width || bBox.right - x;
    const height = bBox.height || bBox.bottom - y;
    const blockCanvas = workspace.getCanvas();
    const clone = blockCanvas.cloneNode(true);
    clone.removeAttribute("transform");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.appendChild(clone);
    svg.setAttribute("viewBox", x + " " + y + " " + width + " " + height);
    svg.setAttribute(
        "class",
        "blocklySvg " +
        (workspace.options.renderer || "geras") +
        "-renderer " +
        (workspace.getTheme ? workspace.getTheme().name + "-theme" : "")
    );
    svg.setAttribute("width", width);
    svg.setAttribute("height", height);
    svg.setAttribute("style", "background-color: transparent");
    const css = [].slice
        .call(document.head.querySelectorAll("style"))
        .filter(function (el) {
            return /\.blocklySvg/.test(el.innerText) || el.id.indexOf("blockly-") === 0;
        })
        .map(function (el) {
            return el.innerText;
        })
        .join("\n");
    const style = document.createElement("style");
    style.innerHTML = css + "\n" + customCss;
    svg.insertBefore(style, svg.firstChild);
    let svgAsXML = new XMLSerializer().serializeToString(svg);
    svgAsXML = svgAsXML.replace(/&nbsp/g, "&#160");
    const data = "data:image/svg+xml," + encodeURIComponent(svgAsXML);
    svgToPng_(data, width, height, callback);
}
