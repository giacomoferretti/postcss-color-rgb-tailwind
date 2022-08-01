import * as postcss from "postcss";
import reduceFunctionCall from "reduce-function-call";

const parseRgbValues = (str: string) => {
  const values = [];
  let pos = 0;
  let depth = 0;

  // Normalize input
  str = str.replace(/\s+/g, " ").trim();

  for (let i = 0, length = str.length; i < length; i++) {
    const char = str[i];

    if (char === "(") {
      depth++;
    } else if (char === ")") {
      depth--;
    } else if (!depth && " ,/".indexOf(char) !== -1) {
      if (pos !== i) {
        values.push(str.substring(pos, i));
      }

      pos = i + 1;
    }
  }

  values.push(str.substring(pos));

  return values;
};

const plugin = (): postcss.Plugin => ({
  postcssPlugin: "postcss-color-rgb-tailwind",
  Declaration(decl) {
    if (!decl.value || decl.value.search(/rgba?\(/i) === -1) {
      return;
    }

    decl.value = reduceFunctionCall(
      decl.value,
      /(rgba?)\(/,
      (body: string, fn: string) => {
        const values = parseRgbValues(body);

        // Check if has alpha
        if (values.length === 4) {
          let alpha = values.pop()!;
          if (alpha.indexOf("%") === alpha.length - 1) {
            alpha = String(parseFloat(alpha) / 100);
          }

          values.push(alpha);

          fn = "rgba";
        }

        return fn + "(" + values.join(", ") + ")";
      }
    );
  },
});

plugin.postcss = true;

export = plugin;
