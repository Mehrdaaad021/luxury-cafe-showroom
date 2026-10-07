# Morrow Coffee: Coffee bar and roastery, Canal Street

A Tabbied template, packaged as a plain HTML template. No build step, no
framework - open `index.html` in a browser and it runs.

```
index.html                the page
styles/base.css           global reset
styles/morrow-coffee.css  this page's stylesheet - edit this one
images/                   the pictures this page uses
```

## The patterns are live, not images

The blocks of pattern are generated in the browser by
[css-doodle](https://css-doodle.com/) through
[tabbied](https://www.npmjs.com/package/tabbied). Each one is a plain `<div>`
that describes itself in `data-` attributes:

```html
<div data-pattern="goldencoil" data-palette="transparent, #C9C8C1"
     data-fit="grid" data-redraw-interval="5200"></div>
```

Change `data-palette` to recolor it, `data-pattern` to swap the design
(338 to choose from - see https://tabbied.com), `data-seed` to pin a
particular arrangement, or drop `data-redraw-interval` to hold it still.
The script at the bottom of `index.html` is what brings them to life; remove
it and the patterns disappear.

That script imports only the designs this page uses, so a new one goes in
three places: the `data-pattern` attribute, the import (both the name and
the `?exports=` list), and the `patterns` object. A slug the script does
not import draws nothing (the browser console says which). To add
`radius`, the element names it:

```html
<div data-pattern="radius" ...></div>
```

and the script's last two lines become:

```js
import { goldencoil, sliver, radius } from 'https://esm.sh/tabbied@0.8.0/patterns?exports=goldencoil,sliver,radius';
hydratePatterns({ patterns: { goldencoil, sliver, radius } });
```

## Fonts

The page links its webfonts from Google Fonts. Self-host them if you'd rather
not depend on a CDN.

## Images

The pictures are AI-generated and ship with this template.

## License

This template is licensed to the Tabbied account that chose it: see
LICENSE.md. The patterns come from [tabbied](https://tabbied.com)
(tabbied@0.8.0), which is MIT licensed; the template is not.
