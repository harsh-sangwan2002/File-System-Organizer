const inputArr = process.argv.slice(2);

const helpObj = require('./help');
const organizeObj = require('./organize');
const treeObj = require('./tree');

//node main.js tree dirPath
//node main.js organize dirPath
//node main.js help

let command = inputArr[0];
switch (command) {

    case "tree":
        treeObj.treeKey(inputArr[1]);
        break;

    case "organize":
        organizeObj.organizeKey(inputArr[1]);
        break;

    case "help":
        helpObj.helpKey()
        break;

    default:
        console.log("Please enter a valid command.");
}