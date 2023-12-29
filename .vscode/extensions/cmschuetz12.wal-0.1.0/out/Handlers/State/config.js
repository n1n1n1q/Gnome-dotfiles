"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const configNamespace = 'wal';
var ConfigOptions;
(function (ConfigOptions) {
    ConfigOptions["autoReload"] = "autoReload";
    ConfigOptions["tokenColorTheme"] = "tokenColorTheme";
})(ConfigOptions = exports.ConfigOptions || (exports.ConfigOptions = {}));
const getConfig = () => vscode_1.workspace.getConfiguration(configNamespace);
class WalConfig {
    get [ConfigOptions.tokenColorTheme]() {
        return getConfig()[ConfigOptions.tokenColorTheme];
    }
    get [ConfigOptions.autoReload]() {
        return getConfig()[ConfigOptions.autoReload];
    }
    update(section, value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield getConfig().update(section, value, true);
        });
    }
}
exports.WalConfig = WalConfig;
//# sourceMappingURL=config.js.map