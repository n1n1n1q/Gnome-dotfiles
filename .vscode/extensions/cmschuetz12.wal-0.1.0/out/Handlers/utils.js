"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const os = __importStar(require("os"));
const vscode_1 = require("vscode");
const util_promisify_1 = __importDefault(require("util.promisify"));
const strip_json_comments_1 = __importDefault(require("strip-json-comments"));
const messages_1 = require("./messages");
const readFile = util_promisify_1.default(fs.readFile);
const writeFile = util_promisify_1.default(fs.writeFile);
const reloadCmd = 'workbench.action.reloadWindow';
exports.reloadWindow = () => vscode_1.commands.executeCommand(reloadCmd);
exports.walColorsPath = path.join(os.homedir(), '.cache', 'wal', 'colors.json');
exports.checkAndAttemptReload = (state) => {
    const { autoReload } = state.config;
    if (!state.reloadNeeded()) {
        return;
    }
    if (autoReload) {
        return exports.reloadWindow();
    }
    return messages_1.showReloadPrompt();
};
exports.updateColorCustomizations = (walColors) => __awaiter(this, void 0, void 0, function* () {
    yield exports.mergeConfig('workbench', 'colorCustomizations', { '[Wal]': walColors });
});
const updateTokenColorCustomizations = (tokenColors) => __awaiter(this, void 0, void 0, function* () {
    const newConfig = typeof tokenColors === 'object'
        ? { textMateRules: tokenColors }
        : undefined;
    yield exports.mergeConfig('editor', 'tokenColorCustomizations', {
        '[Wal]': newConfig,
    });
});
const updateThemeFile = (walThemePath, walTheme) => __awaiter(this, void 0, void 0, function* () {
    return yield writeFile(walThemePath, JSON.stringify(walTheme, null, 2));
});
exports.persistTheme = (state) => __awaiter(this, void 0, void 0, function* () {
    const theme = state.walTheme();
    yield Promise.all([
        exports.updateColorCustomizations(theme.colors),
        updateTokenColorCustomizations(theme.tokenColors),
        updateThemeFile(state.walThemePath, theme),
    ]);
});
exports.loadTheme = (themePath) => __awaiter(this, void 0, void 0, function* () {
    switch (path.extname(themePath)) {
        case '.json':
            try {
                return JSON.parse(strip_json_comments_1.default(yield readFile(themePath, 'utf8')));
            }
            catch (e) {
                console.error(`Unable to load theme from path: ${themePath}`);
                return;
            }
        default:
            return themePath;
    }
});
const contributesTheme = (extension) => typeof extension.packageJSON === 'object' &&
    typeof extension.packageJSON.contributes === 'object' &&
    Array.isArray(extension.packageJSON.contributes.themes) &&
    extension.packageJSON.contributes.themes.every((theme) => typeof theme === 'object' &&
        typeof theme.label === 'string' &&
        typeof theme.path === 'string');
exports.availableThemes = (extensions) => __awaiter(this, void 0, void 0, function* () {
    const themePaths = extensions
        .filter(contributesTheme)
        .reduce((paths, ext) => {
        ext.packageJSON.contributes.themes.forEach(theme => {
            paths.set(theme.label, path.resolve(ext.extensionPath, theme.path));
        });
        return paths;
    }, new Map());
    const themes = yield Promise.all([...themePaths].map(([label, themePath]) => __awaiter(this, void 0, void 0, function* () {
        return [
            label,
            yield exports.loadTheme(themePath),
        ];
    })));
    const validThemes = themes.filter((theme) => !!theme[1]);
    return new Map(validThemes);
});
exports.fetchWalColors = () => __awaiter(this, void 0, void 0, function* () {
    return JSON.parse(yield readFile(exports.walColorsPath, 'utf8'));
});
exports.mergeConfig = (namespace, section, value) => __awaiter(this, void 0, void 0, function* () {
    const configNamespace = vscode_1.workspace.getConfiguration(namespace);
    const mergedConfig = Object.assign({}, configNamespace.get(section), value);
    const newConfig = Object.values(mergedConfig).every(confVal => confVal === undefined)
        ? undefined
        : mergedConfig;
    yield configNamespace.update(section, newConfig, true);
});
//# sourceMappingURL=utils.js.map