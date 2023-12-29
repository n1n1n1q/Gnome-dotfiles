"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const ThemeGenerator_1 = require("../../ThemeGenerator");
const config_1 = require("./config");
const relativeWalThemePath = './themes/wal.json';
class State {
    constructor(ctx) {
        this.walThemePath = ctx.asAbsolutePath(relativeWalThemePath);
        this.walColorTheme = {};
        this.themes = new Map();
        this.config = new config_1.WalConfig();
        this.themePickerOpen = false;
    }
    get tokenColorTheme() {
        return this.themes.get(this.config.tokenColorTheme);
    }
    get tokenColorThemeConfig() {
        const { tokenColorTheme } = this;
        if (!tokenColorTheme) {
            return { colors: {}, tokenColors: undefined };
        }
        if (ThemeGenerator_1.isThemeConfig(tokenColorTheme)) {
            return tokenColorTheme;
        }
        return {
            colors: {},
            tokenColors: this.tokenColorThemePath(tokenColorTheme),
        };
    }
    tokenColorThemePath(tokenColorTheme) {
        return path.relative(path.dirname(this.walThemePath), tokenColorTheme);
    }
    reloadNeeded() {
        const { tokenColorTheme, startupTheme, themePickerOpen } = this;
        if (themePickerOpen) {
            return false;
        }
        if (!tokenColorTheme || ThemeGenerator_1.isThemeConfig(tokenColorTheme)) {
            return false;
        }
        if (startupTheme &&
            startupTheme.tokenColors === this.tokenColorThemePath(tokenColorTheme)) {
            return false;
        }
        return true;
    }
    walTheme() {
        const { tokenColorThemeConfig, walColorTheme } = this;
        const { tokenColors, colors } = tokenColorThemeConfig;
        return {
            name: 'Wal',
            colors: Object.assign({}, colors, walColorTheme),
            tokenColors,
        };
    }
    openThemePicker() {
        this.themePickerOpen = true;
    }
    closeThemePicker() {
        this.themePickerOpen = false;
    }
}
exports.State = State;
//# sourceMappingURL=state.js.map