// Good Boy Ninja 2022
// Requires having a .debug file in the extension root folder
// For more information: https://github.com/Adobe-CEP/CEP-Resources/blob/master/CEP_11.x/Documentation/Debugging%20Handbook.md#3-debugging-tools

// Also requires enabling nodejs in manifest.xml, as well as having CSInterface.js loaded prior to requiring this file.
// Default shortcut is Ctrl+Shift+D

const path = require('path');
const fs = require('fs');


const DevToolsLauncher = class {
    constructor() {
        const key = "_GBN_DEV_TOOLS_OPENER";
        if (window[key] !== undefined) { return; } // prevent multiple instances
        window[key] = this; // prevent multiple instances

        this.addListener();
    }

    addListener() {

        window.addEventListener("keydown", function (event) {
            // if key is ctrl/cmd + shift + alt + d then open dev tools
            const correctKeyComboPressed = event.ctrlKey && event.shiftKey && event.altKey && event.code === "KeyD";
            if (!correctKeyComboPressed) { return; }

            if (CSInterface === undefined) {
                console.error("Cannot open DevTools: CSInterface is undefined");
                return;
            }

            const csInterface = new CSInterface();
            const extensionPath = csInterface.getSystemPath(SystemPath.EXTENSION);
            const debugFile = path.join(extensionPath, ".debug");

            if (!fs.existsSync(debugFile)) {
                console.error("Cannot open DevTools: .debug file does not exist");
                return;
            }

            const thisExtensionID = csInterface.getExtensionID();

            // read the debug file
            const debugFileContents = fs.readFileSync(debugFile, "utf8");

            // debug file is xml so we need to parse it
            const debugFileXML = new DOMParser().parseFromString(debugFileContents, "text/xml");
            const debugFileXMLRoot = debugFileXML.documentElement;

            // now that we have a document, let's get the extension tag based on the extension id (the attribute of the tag is "Id")
            const extensionTags = debugFileXMLRoot.getElementsByTagName("Extension");
            var extensionTag = null;
            for (let tag of extensionTags) {
                if (tag.getAttribute("Id") === thisExtensionID) {
                    extensionTag = tag;
                    break;
                }
            }

            if (extensionTag === null) {
                console.error(`Cannot open DevTools: extension tag matching the id: "${thisExtensionID}" was not found`);
                return;
            }

            // now that we have the extension tag, we can get the port of the debug server
            const hostTag = extensionTag.getElementsByTagName("Host")[0];
            if (!hostTag) {
                console.error("Cannot open DevTools: host tag was not found");
                return;
            }

            const port = Number(hostTag.getAttribute("Port"));
            const address = `http://localhost:${port}`;

            // open the dev tools using csInterface interface
            csInterface.openURLInDefaultBrowser(address);


        }, true);

    }
};


module.exports = new DevToolsLauncher();
