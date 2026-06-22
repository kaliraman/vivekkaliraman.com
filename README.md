# vivekkaliraman.com

Personal portfolio for Vivek Kaliraman — physician-scientist turned product leader
and 2× founder (Caringly, Perci). An editorial, type-driven static one-pager.

## Stack
Plain static HTML/CSS/JS — no framework, no build step. Deployed on Vercel as a
static site.

- `index.html` — the page (all content/sections)
- `styles.css` — design tokens (CSS variables) + all styling; single 860px breakpoint
- `form.js` — contact form lead capture via [Web3Forms](https://web3forms.com)
- `assets/` — four product image composites
- `favicon.svg`, `robots.txt`, `sitemap.xml`

## Contact form
The form posts to Web3Forms, which emails each submission to the configured address.
Set your key in `form.js`:

```js
const ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";
```

Get a free key at https://web3forms.com (enter the destination email, confirm it,
paste the access key). No account dashboard or server required.

## Local preview
It's static — open `index.html` in a browser, or serve the folder with any static
server (e.g. `python3 -m http.server`).

## Deploy
Pushed to GitHub and deployed on Vercel (static, no build command, output = repo root).
