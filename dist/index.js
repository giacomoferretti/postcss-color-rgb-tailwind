"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const reduce_function_call_1 = __importDefault(require("reduce-function-call"));
const parseRgbValues = (str) => {
    const values = [];
    let pos = 0;
    let depth = 0;
    // Normalize input
    str = str.replace(/\s+/g, " ").trim();
    for (let i = 0, length = str.length; i < length; i++) {
        const char = str[i];
        if (char === "(") {
            depth++;
        }
        else if (char === ")") {
            depth--;
        }
        else if (!depth && " ,/".indexOf(char) !== -1) {
            if (pos !== i) {
                values.push(str.substring(pos, i));
            }
            pos = i + 1;
        }
    }
    values.push(str.substring(pos));
    return values;
};
const plugin = () => ({
    postcssPlugin: "postcss-color-rgb-tailwind",
    Declaration(decl) {
        if (!decl.value || decl.value.search(/rgba?\(/i) === -1) {
            return;
        }
        decl.value = (0, reduce_function_call_1.default)(decl.value, /(rgba?)\(/, (body, fn) => {
            const values = parseRgbValues(body);
            // Check if has alpha
            if (values.length === 4) {
                let alpha = values.pop();
                if (alpha.indexOf("%") === alpha.length - 1) {
                    alpha = String(parseFloat(alpha) / 100);
                }
                values.push(alpha);
                fn = "rgba";
            }
            return fn + "(" + values.join(", ") + ")";
        });
    },
});
plugin.postcss = true;
module.exports = plugin;
