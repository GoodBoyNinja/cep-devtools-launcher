# cep-devtools-launcher-
For adobe CEP extensions: Quickly open the dev-tools debugger with the correct port using a keyboard shortcut

## Usage
After requiring this module, hitting ``Ctrl + Shift + Alt + D`` (D for debugging) on your keyboard will automatically open ``localhost:xxxx`` in the browser, with the correct port number attatched.


## usage
Place **devToolsLauncher.js** somewhere in your project, then require it like so:

```js
const path = require('path');
const DevToolsOpener = require(path.join("devToolsOpener.js")); // Make sure path is correct ofc
```

Then open your extension and hit ``Ctrl + Shift + Alt + D``. Your browser window should pop up.
