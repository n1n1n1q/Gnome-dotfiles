"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTextMateTheme = (theme) => typeof theme === 'string';
exports.isThemeConfig = (theme) => !exports.isTextMateTheme(theme);
const baseColors = (walColors) => ({
    focusBorder: walColors.colors.color12,
    foreground: walColors.special.foreground,
    'widget.shadow': walColors.colors.color8,
    'selection.background': walColors.colors.color1,
    descriptionForeground: walColors.colors.color4,
    errorForeground: walColors.colors.color1,
});
const inputColors = (walColors) => ({
    'input.background': walColors.colors.color0,
    'input.foreground': walColors.colors.color7,
    'input.placeholderForeground': walColors.colors.color8,
    'inputOption.activeBorder': walColors.colors.color12,
    'inputValidation.errorBackground': walColors.colors.color1,
    'inputValidation.errorBorder': walColors.colors.color9,
    'inputValidation.infoBackground': walColors.colors.color4,
    'inputValidation.infoBorder': walColors.colors.color12,
    'inputValidation.warningBackground': walColors.colors.color3,
    'inputValidation.warningBorder': walColors.colors.color11,
});
const listsAndTreesColors = (walColors) => ({
    'list.invalidItemForeground': walColors.colors.color1,
    'list.errorForeground': walColors.colors.color1,
    'list.warningForeground': walColors.colors.color3,
});
const terminalColors = (walColors) => {
    const { special, colors } = walColors;
    return {
        'terminal.background': special.background,
        'terminal.foreground': special.foreground,
        'terminalCursor.background': special.background,
        'terminalCursor.foreground': special.cursor,
        'terminal.ansiBlack': colors.color0,
        'terminal.ansiRed': colors.color1,
        'terminal.ansiGreen': colors.color2,
        'terminal.ansiYellow': colors.color3,
        'terminal.ansiBlue': colors.color4,
        'terminal.ansiMagenta': colors.color5,
        'terminal.ansiCyan': colors.color6,
        'terminal.ansiWhite': colors.color7,
        'terminal.ansiBrightBlack': colors.color8,
        'terminal.ansiBrightRed': colors.color9,
        'terminal.ansiBrightGreen': colors.color10,
        'terminal.ansiBrightYellow': colors.color11,
        'terminal.ansiBrightBlue': colors.color12,
        'terminal.ansiBrightMagenta': colors.color13,
        'terminal.ansiBrightCyan': colors.color14,
        'terminal.ansiBrightWhite': colors.color15,
    };
};
const activityBarColors = (walColors) => ({
    'activityBar.background': walColors.special.background,
    'activityBar.foreground': walColors.special.foreground,
});
const sideBarColors = (walColors) => ({
    'sideBarSectionHeader.background': walColors.special.background,
    'sideBar.background': walColors.special.background,
    'sideBar.foreground': walColors.special.foreground,
});
const statusBarColors = (walColors) => ({
    'statusBar.background': walColors.colors.color5,
    'statusBar.foreground': walColors.colors.color7,
    'statusBar.debuggingBackground': walColors.colors.color2,
    'statusBar.noFolderBackground': walColors.colors.color2,
});
const tabColors = (walColors) => ({
    'tab.activeBackground': walColors.special.background,
    'tab.activeForeground': walColors.special.foreground,
});
const editorColors = (walColors) => ({
    'editor.background': walColors.special.background,
    'editorOverviewRuler.modifiedForeground': walColors.colors.color3,
    'editorOverviewRuler.addedForeground': walColors.colors.color2,
    'editorOverviewRuler.deletedForeground': walColors.colors.color1,
    'editorOverviewRuler.warningForeground': walColors.colors.color3,
    'editorOverviewRuler.infoForeground': walColors.colors.color4,
    'editorOverviewRuler.errorForeground': walColors.colors.color1,
    'editorGutter.background': walColors.special.background,
    'editorGutter.modifiedBackground': walColors.colors.color3,
    'editorGutter.addedBackground': walColors.colors.color2,
    'editorGutter.deletedBackground': walColors.colors.color1,
    'editorError.foreground': walColors.colors.color1,
    'editorWarning.foreground': walColors.colors.color3,
    'editorInfo.foreground': walColors.colors.color4,
    'editorHint.foreground': walColors.colors.color2,
});
const gitColors = (walColors) => ({
    'gitDecoration.modifiedResourceForeground': walColors.colors.color3,
    'gitDecoration.deletedResourceForeground': walColors.colors.color1,
    'gitDecoration.untrackedResourceForeground': walColors.colors.color2,
});
exports.generateColorTheme = (walColors) => {
    const mappers = [
        baseColors,
        inputColors,
        listsAndTreesColors,
        terminalColors,
        activityBarColors,
        sideBarColors,
        statusBarColors,
        tabColors,
        editorColors,
        gitColors,
    ];
    return mappers.reduce((acc, mapper) => Object.assign(acc, mapper(walColors)), {});
};
//# sourceMappingURL=index.js.map