'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = __importStar(require("vscode"));
const fs = __importStar(require("fs"));
const Handlers_1 = require("./Handlers");
let walColorWatcher;
function activate(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const { onTokenColorsChanged, onWalColorsChanged, onSelectTokenColorTheme, } = yield Handlers_1.onStartup(ctx);
        walColorWatcher = fs.watch(Handlers_1.walColorsPath, onWalColorsChanged);
        ctx.subscriptions.push(vscode.commands.registerCommand('wal.selectTokenColorTheme', onSelectTokenColorTheme));
        ctx.subscriptions.push(vscode.workspace.onDidChangeConfiguration(event => {
            if (event.affectsConfiguration('wal.tokenColorTheme')) {
                onTokenColorsChanged();
            }
        }));
    });
}
exports.activate = activate;
function deactivate(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        walColorWatcher.close();
    });
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map