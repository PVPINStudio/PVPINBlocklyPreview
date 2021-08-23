const frame = document.getElementById("blocklyArea");

// Tab Navigator
(function () {
    function main() {
        var tabButtons = [].slice.call(document.querySelectorAll('ul.tab-nav li a.button'));

        tabButtons.map(function (button) {
            button.addEventListener('click', function () {
                // Added to display blockly workspace correctly
                if (!checkDisplayWorkspace(button)) {
                    updateCode();
                }

                document.querySelector('li a.active.button').classList.remove('active');
                button.classList.add('active');

                document.querySelector('.tab-pane.active').classList.remove('active');
                document.querySelector(button.getAttribute('href')).classList.add('active');

            })
        })
    }

    if (document.readyState !== 'loading') {
        main();
    } else {
        document.addEventListener('DOMContentLoaded', main);
    }
})();


function resize() {
    var width = parseInt(window.innerWidth.toString().replace("px", "")) - 65;
    var height = parseInt(window.innerHeight.toString().replace("px", "")) - 120;
    document.getElementById('blocklyArea').style.width = width + 50 + 'px';
    document.getElementById('blocklyArea').style.height = height + 60 + 'px';
    document.getElementById('jsUncompressed').style.width = width + 'px';
    document.getElementById('jsUncompressed').style.height = height + 'px';
    document.getElementById('msUncompressed').style.width = width + 'px';
    document.getElementById('msUncompressed').style.height = height + 'px';
    document.getElementById('xmlPretty').style.width = width + 'px';
    document.getElementById('xmlPretty').style.height = height + 'px';
}

/**
 * @returns true when the user clicks the 'Blockly' button 
 * @returns true when the user is clicking the same button as the div displayed currently 
 */
function checkDisplayWorkspace(button) {
    // Note that even when the Blockly content is active
    // Clicking the Blockly button will call this method
    // So if simply code 'workspace.setVisible(!workspace.isVisible())'
    // The workspace will disappear if you click the Blockly Tab
    // Regardless of whether or not the Blockly content is active
    if (document.getElementById(button.getAttribute("href").replace("#", "")).className.match("active")) {
        return true;
        // Prevent the code from being re-highlighted 
        // Highlighting is time consuming and may cause the sudden flash of pre code 
    }
    resize();
    if (button.getAttribute("href") == "#blocklyAreaHolder") {
        document.getElementById('blocklyArea').contentWindow.getMainWorkspace().setVisible(true);
        document.getElementById('blocklyArea').contentWindow.document.getElementById('blocklyDiv').style.height
            = parseInt(window.innerHeight.toString().replace("px", "")) - 60 + 'px';
        frame.contentWindow.postMessage(['resize', true], "*");
        return true;
    } else {
        document.getElementById('blocklyArea').contentWindow.getMainWorkspace().setVisible(false);
        if (button.getAttribute("href") == "#func") {
            initProjectManagement();
        }
        return false;
    }
}

function init() {
    document.getElementById('blocklyArea').contentWindow.document.getElementById('blocklyDiv').style.height
        = parseInt(window.innerHeight.toString().replace("px", "")) - 60 + 'px';
    resize();
}
