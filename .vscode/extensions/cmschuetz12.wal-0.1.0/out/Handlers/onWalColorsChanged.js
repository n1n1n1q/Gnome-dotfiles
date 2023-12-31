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
const utils_1 = require("./utils");
const ThemeGenerator_1 = require("../ThemeGenerator");
exports.onWalColorsChanged = (state) => () => __awaiter(this, void 0, void 0, function* () {
    const walColors = yield utils_1.fetchWalColors();
    const walColorTheme = ThemeGenerator_1.generateColorTheme(walColors);
    state.walColorTheme = walColorTheme;
    yield utils_1.persistTheme(state);
});
//# sourceMappingURL=onWalColorsChanged.js.map