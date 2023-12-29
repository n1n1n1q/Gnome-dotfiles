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
const State_1 = require("./State");
const onTokenColorsChanged_1 = require("./onTokenColorsChanged");
const onWalColorsChanged_1 = require("./onWalColorsChanged");
const ThemeGenerator_1 = require("../ThemeGenerator");
const utils_1 = require("./utils");
const onSelectTokenColorTheme_1 = require("./onSelectTokenColorTheme");
const onFirstTimeSetup_1 = require("./onFirstTimeSetup");
exports.onStartup = (ctx) => __awaiter(this, void 0, void 0, function* () {
    const state = new State_1.State(ctx);
    state.themes = yield utils_1.availableThemes(vscode_1.extensions.all);
    const [walColors, themes, startupTheme] = yield Promise.all([
        utils_1.fetchWalColors(),
        utils_1.availableThemes(vscode_1.extensions.all),
        utils_1.loadTheme(state.walThemePath),
    ]);
    if (!startupTheme) {
        yield onFirstTimeSetup_1.onFirstTimeSetup(state);
    }
    const walColorTheme = ThemeGenerator_1.generateColorTheme(walColors);
    state.walColorTheme = walColorTheme;
    state.themes = themes;
    state.startupTheme =
        startupTheme && ThemeGenerator_1.isThemeConfig(startupTheme) ? startupTheme : undefined;
    yield utils_1.persistTheme(state);
    return {
        onTokenColorsChanged: onTokenColorsChanged_1.onTokenColorsChanged(state),
        onWalColorsChanged: onWalColorsChanged_1.onWalColorsChanged(state),
        onSelectTokenColorTheme: onSelectTokenColorTheme_1.onSelectTokenColorTheme(state),
    };
});
//# sourceMappingURL=onStartup.js.map