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
const utils_1 = require("./utils");
var ReloadOptions;
(function (ReloadOptions) {
    ReloadOptions["Reload"] = "Reload";
    ReloadOptions["Later"] = "Later";
})(ReloadOptions || (ReloadOptions = {}));
var ColorsNotFoundOptions;
(function (ColorsNotFoundOptions) {
    ColorsNotFoundOptions["Retry"] = "Retry";
})(ColorsNotFoundOptions || (ColorsNotFoundOptions = {}));
exports.showReloadPrompt = () => __awaiter(this, void 0, void 0, function* () {
    const response = yield vscode_1.window.showInformationMessage('Wal token theme has been updated and a TextMate theme has been chosen. Please reload window for changes to take effect', ...Object.values(ReloadOptions));
    switch (response) {
        case ReloadOptions.Reload:
            return utils_1.reloadWindow();
    }
});
exports.showColorsNotFoundError = (onRetry) => __awaiter(this, void 0, void 0, function* () {
    const response = yield vscode_1.window.showErrorMessage('Wal colors not found, please generate a theme first', ...Object.values(ColorsNotFoundOptions));
    switch (response) {
        case ColorsNotFoundOptions.Retry:
            onRetry();
    }
});
//# sourceMappingURL=messages.js.map