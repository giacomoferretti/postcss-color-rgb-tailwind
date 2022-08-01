import * as postcss from "postcss";
declare const plugin: {
    (): postcss.Plugin;
    postcss: boolean;
};
export = plugin;
