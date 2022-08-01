# PostCSS Color Rgb

PostCSS plugin to transform modern [CSS Color Module Level 4](https://www.w3.org/TR/css-color-4/) to legacy [CSS Color Module Level 3](https://www.w3.org/TR/css-color-3/).

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
