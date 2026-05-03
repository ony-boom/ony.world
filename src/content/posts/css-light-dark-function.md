---
title: "CSS's light-dark function"
description: 'A simple way to handle color schemes'
date: '2025-12-28'
published: true
tags: ['code', 'css']
---

Before CSS's `light-dark` function, we had to use tricks like adding a `.dark` class to overwrite color variables. This led to code duplication, and I've always hated that.

CSS's `light-dark` function lets you specify which color to use based on the user's color scheme preference (light or dark mode).

So, instead of:

```css
:root {
	--color-fg: #000;

	/* when html tag have the .dark class, overwrite colors */
	&.dark {
		--color-fg: #fff;
	}
}
```

We could just do:

```css
:root {
	--color-fg: light-dark(#000, #fff);
}
```

Here it's just one color variable, but I think you got the point.
You can learn more on [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/light-dark).

But [here's](https://shiki.matsu.io/guide/dual-themes#light-dark-function) something cool you can do with it: I'm currently using it on this website to change the code highlight theme when the color scheme changes, no extra JavaScript or complicated setup needed. You can [try it out by clicking the `[dark]` / `[light]` toggle](#theme-toggle) in the sidebar.
