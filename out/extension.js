"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const rakeTaskProvider_1 = require("./rakeTaskProvider");
const customTaskProvider_1 = require("./customTaskProvider");
let rakeTaskProvider;
let customTaskProvider;
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations SIMQL is active and ready to use....');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let simqlIntro = vscode.commands.registerCommand('simql.intro', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Welcome to SIMQL');
        vscode.window.showInformationMessage("hurra");
    });
    let simqlHowTo = vscode.commands.registerCommand('simql.howto', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('SIMQL-HowTos');
        console.log("SIMQL HowTo's....");
    });
    context.subscriptions.push(simqlIntro);
    context.subscriptions.push(simqlHowTo);
    const workspaceRoot = (vscode.workspace.workspaceFolders && (vscode.workspace.workspaceFolders.length > 0))
        ? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;
    if (!workspaceRoot) {
        return;
    }
    rakeTaskProvider = vscode.tasks.registerTaskProvider(rakeTaskProvider_1.RakeTaskProvider.RakeType, new rakeTaskProvider_1.RakeTaskProvider(workspaceRoot));
    customTaskProvider = vscode.tasks.registerTaskProvider(customTaskProvider_1.CustomBuildTaskProvider.CustomBuildScriptType, new customTaskProvider_1.CustomBuildTaskProvider(workspaceRoot));
}
exports.activate = activate;
// This method is called when your extension is deactivated
function deactivate() {
    if (rakeTaskProvider) {
        rakeTaskProvider.dispose();
    }
    if (customTaskProvider) {
        customTaskProvider.dispose();
    }
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map