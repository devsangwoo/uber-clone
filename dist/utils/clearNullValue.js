"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearNullValue = function (args) {
    var nonNullArgs = {};
    Object.keys(args).forEach(function (key) {
        if (args[key] !== null || args[key] !== undefined) {
            nonNullArgs[key] = args[key];
        }
    });
    return nonNullArgs;
};
//# sourceMappingURL=clearNullValue.js.map