# PostCSS Color Rgb Tailwind ![Build](https://github.com/giacomoferretti/postcss-color-rgb-tailwind/actions/workflows/build.yml/badge.svg)

PostCSS plugin to transform modern [CSS Color Module Level 4](https://www.w3.org/TR/css-color-4/) to legacy [CSS Color Module Level 3](https://www.w3.org/TR/css-color-3/).

I had a problem with Tailwind v3 not displaying color properly on Safari <= 11.1 and looked for a solution. The first one I found was [onigoetz/postcss-color-rgb](https://github.com/onigoetz/postcss-color-rgb), but it didn't work because of [onigoetz/postcss-color-rgb #1](https://github.com/dmarchena/postcss-color-rgb/issues/1). In the issue, the author mentions his plugin [7studio/postcss-color-rgb](https://github.com/7studio/postcss-color-rgb) and it works flawlessy.

## Installation

With NPM:

```
npm install giacomoferretti/postcss-color-rgb-tailwind
```

With Yarn:

```
yarn install giacomoferretti/postcss-color-rgb-tailwind
```

With PNPM:

```
pnpm install giacomoferretti/postcss-color-rgb-tailwind
```

## Usage

Add plugin to `postcss.config.js` file:

```js
module.exports = {
    plugins: {
        "postcss-color-rgb-tailwind": {},
    },
};
```

## Example

### Input

```css
.example-1 {
    color: rgb(255 0 0);
}

.example-2 {
    color: rgb(0 0 255 / 55%);
}

.example-3 {
    color: rgba(0, 255, 0, 30%);
}
```

### Output

```css
.example-1 {
    color: rgb(255, 0, 0);
}

.example-2 {
    color: rgba(0, 0, 255, 0.55);
}

.example-3 {
    color: rgba(0, 255, 0, 0.3);
}
```
