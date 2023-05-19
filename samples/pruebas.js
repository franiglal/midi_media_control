const readline = require('readline');

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) process.stdin.setRawMode(true);

// listen to keypress

process.stdin.on("keypress", (str, key) => {
    if(key.name == "s") console.log("save")
})
