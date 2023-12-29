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
const ThemeGenerator_1 = require("../ThemeGenerator");
const utils_1 = require("./utils");
exports.onSelectTokenColorTheme = (state) => () => __awaiter(this, void 0, void 0, function* () {
    let timeout;
    const { tokenColorTheme } = state.config;
    const onDidSelectItem = (item) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            state.config.update('tokenColorTheme', item.label);
        }, 250);
    };
    const items = [...state.themes.entries()].map(([themeName, theme]) => ({
        label: themeName,
        description: ThemeGenerator_1.isTextMateTheme(theme) ? '(requires restart)' : undefined,
    }));
    state.openThemePicker();
    const chosenTheme = yield vscode_1.window.showQuickPick(items, {
        onDidSelectItem,
    });
    state.closeThemePicker();
    const newTheme = chosenTheme ? chosenTheme.label : tokenColorTheme;
    yield state.config.update('tokenColorTheme', newTheme);
    utils_1.checkAndAttemptReload(state);
});
//# sourceMappingURL=onSelectTokenColorTheme.js.map