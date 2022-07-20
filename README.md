# cep-devtools-launcher
For Adobe CEP extensions: Quickly opens the dev-tools debugger with the correct port using a keyboard shortcut

## Description
After requiring this module, hitting ``Ctrl + Shift + Alt + D`` (D for debugging) on your keyboard will automatically open ``localhost:xxxx`` in the browser, with the correct port number attached.


## Usage
Place **devToolsLauncher.js** somewhere in your project, then require it like so:

```js
const path = require('path');
const DevToolsLauncher = require(path.join("devToolsLauncher.js")); // Make sure path is correct ofc
```

Then open your extension and hit ``Ctrl + Shift + Alt + D``. Your browser window should pop up.

## Requirements
1. Requires enabling nodejs in your ``manifest.xml``, inside the ``<Resources></Resources>`` tag:
```xml
<CEFCommandLine>
    <Parameter>--enable-nodejs</Parameter>
    <Parameter>--mixed-context</Parameter>
</CEFCommandLine>
```
2. Requires ``CSInterface.js``, you can find it in [CEP Resources](https://github.com/Adobe-CEP/CEP-Resources) by choosing the correct version folder (in my case CEP_11.x)
