function exportJS() {
    if (window.confirm("是否将项目以 JavaScript 形式导出?")) {
        var blob = new Blob(
            [document.getElementById('blocklyArea').contentWindow.generateJS()],
            { type: "text/plain;charset=utf-8" }
        );
        saveAs(blob, "project.js");
    }
}
function exportMS() {
    if (window.confirm("是否将项目以 MiaoScript 形式导出?")) {
        var blob = new Blob(
            [document.getElementById('blocklyArea').contentWindow.generateMS()],
            { type: "text/plain;charset=utf-8" }
        );
        saveAs(blob, "project.js");
    }
}
function exportXML() {
    if (window.confirm("是否将项目以 XML 形式导出?")) {
        var blob = new Blob(
            [document.getElementById('blocklyArea').contentWindow.generateXML()],
            { type: "text/plain;charset=utf-8" }
        );
        saveAs(blob, "project.xml");
    }
}
function importXML(files) {
    if (window.confirm("是否加载该 XML? 现有项目将被清空!")) {
        var fileReader = new FileReader();
        var file = files[0];
        fileReader.readAsText(file);
        fileReader.onloadend = function (e) {
            frame.contentWindow.postMessage(['xml', e.target.result], "*");
        }
        document.getElementById("xml_input_container").value = null;
    }
}

function updateCode() {
    document.getElementById('blocklyArea').contentWindow.generate();
    document.getElementById("jsUncompressed").innerHTML
        = document.getElementById('blocklyArea').contentWindow.document.getElementById('jsUncompressed').innerHTML;
    document.getElementById("msUncompressed").innerHTML
        = document.getElementById('blocklyArea').contentWindow.document.getElementById('msUncompressed').innerHTML;
    document.getElementById("xmlPretty").innerHTML
        = document.getElementById('blocklyArea').contentWindow.document.getElementById('xmlPretty').innerHTML;
    document.querySelectorAll('pre code').forEach((block) => {
        hljs.highlightBlock(block);
        hljs.lineNumbersBlock(block, { });
    });
}

function initProjectManagement() {
    document.getElementById('blocklyArea').contentWindow.workspaceToSvg_(
        document.getElementById('blocklyArea').contentWindow.getMainWorkspace(),
        function (datauri) {
            document.getElementById('overview_img').src = datauri;
        }
    );
    resizeScreenshot();
    function resizeScreenshot() {
        if (document.getElementById('overview_img').width == 1) {
            setTimeout(() => { resizeScreenshot(); }, 1000);
            // Img not loaded yet
        }
        var img = new Image();
        img.src = document.getElementById('overview_img').src;
        var originalWidth = img.width;
        var maxWidth = parseInt(window.innerWidth.toString().replace("px", "")) * 0.4;
        if (originalWidth / 10 >= maxWidth) {
            document.getElementById('overview_img').width = maxWidth;
        } else {
            document.getElementById('overview_img').width = originalWidth / 10;
        }
        // Changes only the width
        // If height is taken into consideration, the img will be too small
    }
}