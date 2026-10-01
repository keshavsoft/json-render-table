# json-render-table

Standalone, lightweight, and declarative JSON table renderer for JavaScript and modern browsers. Powered by [`json-traversal`](https://www.npmjs.com/package/json-traversal) recipe transformations and [`@keshavsoft/json-to-tag`](https://www.npmjs.com/package/@keshavsoft/json-to-tag) DOM creation.

[![npm version](https://img.shields.io/npm/v/json-render-table.svg)](https://www.npmjs.com/package/json-render-table)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Live Demo](https://img.shields.io/badge/Live-Demo%20%26%20Showcase-success.svg)](docs/index.html)

> 🎮 **[Interactive Showcase & Documentation](docs/index.html)**: Try out all 3 flavors live in your browser and inspect the generated declarative DOM specifications.

---

## Features

- ⚡ **Lightweight & Fast:** Minimal footprint (~5.7 kB gzipped bundle) with zero heavy framework overhead.
- 🎯 **Declarative Architecture:** Transforms raw JSON data into a DOM specification tree via customizable recipes before creating elements.
- 🎨 **Bootstrap-Ready Styling:** Default recipes generate clean, modern tables styled with Bootstrap classes (`table`, `table-hover`, `table-striped`, `align-middle`, `table-dark`).
- 🧩 **3 Built-in Flavors:**
  - `simple` (default): Complete table with dark `<thead>` and striped `<tbody>`.
  - `headerOnly`: Minimal header table layout.
  - `withBodyAndFooter`: Full table with `<thead>`, `<tbody>`, and summary `<tfoot>`.
- 🔍 **Auto-Column Detection:** Automatically detects column keys and titles from your data or accepts an explicit column list.
- 🌐 **Flexible Target Handling:** Direct DOM element mounting by HTML `id` or `HTMLElement` reference, or returns element / DOM spec for headless usage.
- 📦 **Browser & Module Support:** Works as an ES module (`import`) or browser global script (`window.renderTable`).

---

## Installation

```bash
npm install json-render-table
```

---

## Quick Start

### 1. In Modern Web Bundlers (Vite, Webpack, Rollup)

```html
<div id="table-container"></div>
```

```javascript
import render from "json-render-table";

const data = [
  { id: 1, name: "Alice", role: "Engineer", city: "New York" },
  { id: 2, name: "Bob", role: "Designer", city: "San Francisco" },
  { id: 3, name: "Charlie", role: "Product Manager", city: "London" }
];

// Mounts a Bootstrap-styled table inside #table-container
render({
  flavor: "simple",
  data,
  targetHtmlId: "table-container"
});
```

---

## Flavors & Examples

### Simple Table (`simple`)
Renders a full table containing `<thead>` and `<tbody>`.

```javascript
import render from "json-render-table";

render({
  flavor: "simple",
  data: [
    { product: "Laptop", stock: 120, price: "$999" },
    { product: "Headphones", stock: 350, price: "$199" }
  ],
  targetHtmlId: "table-container"
});
```

### Table with Header & Footer (`withBodyAndFooter`)
Renders `<thead>`, `<tbody>`, and a styled `<tfoot>` with summary values.

```javascript
import render from "json-render-table";

render({
  flavor: "withBodyAndFooter",
  data: [
    { item: "Keyboard", category: "Hardware", amount: 150 },
    { item: "Mouse", category: "Hardware", amount: 80 }
  ],
  footerData: [
    { item: "Total", category: "All", amount: 230 }
  ],
  targetHtmlId: "table-container"
});
```
> *Note: If `footerData` is omitted for `withBodyAndFooter`, a default summary row indicating `Total: N records` is generated automatically.*

### Header Only (`headerOnly`)
Renders table structure focused on the header row:

```javascript
import render from "json-render-table";

render({
  flavor: "headerOnly",
  columns: ["Name", "Email", "Role", "Actions"],
  targetHtmlId: "table-container"
});
```

### Explicit Columns
Control which columns appear, their ordering, or define custom keys:

```javascript
render({
  flavor: "simple",
  data: [
    { id: 101, firstName: "Jane", lastName: "Doe", internalCode: "X9" }
  ],
  columns: ["firstName", "lastName"], // internalCode will be omitted
  targetHtmlId: "table-container"
});
```

---

## API Reference

### `render(options)`

The primary entry point to generate and optionally mount a table.

#### Options (`Object`)

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `flavor` | `string` | `"simple"` | Table flavor: `"simple"`, `"headerOnly"`, or `"withBodyAndFooter"`. (Aliases like `tableType` are supported). |
| `data` | `Array<Object>` | `[]` | Array of row records/objects. |
| `columns` | `Array<string\|Object>` | *derived* | Explicit column names or definitions. If omitted, derived from the keys of the first record in `data`. |
| `footerData` | `Array<Object\|Array>` | `[]` | Optional custom footer rows for `withBodyAndFooter`. |
| `targetHtmlId` | `string \| HTMLElement` | `undefined` | Container element ID or DOM node. If provided, replaces container content and appends table. |

#### Return Value
- Returns the created `HTMLTableElement` (or array of nodes) when `targetHtmlId` is provided.
- Returns the generated declarative DOM specification object (`domSpec`) if `targetHtmlId` is not provided or target is not found.

---

### Advanced / Pipeline Exports

For pipelines that want to inspect or modify specifications before rendering:

```javascript
import {
  prepareSpec,
  prepareSource,
  prepareRecipe
} from "json-render-table";

// 1. Prepare raw transformed data payload
const source = prepareSource({ flavor: "simple", data, columns });

// 2. Load the recipe transformation spec
const recipe = prepareRecipe({ flavor: "simple" });

// 3. Generate the DOM spec without mounting
const domSpec = prepareSpec({ flavor: "simple", data, columns });
```

---

## Global Browser Usage

When loading the distributed bundle directly in the browser via `<script>`:

```html
<script type="module" src="docs/dist/v8/min.js"></script>
<script>
  window.renderTable({
    flavor: "simple",
    data: [
      { id: 1, title: "Getting Started" }
    ],
    targetHtmlId: "dom-container"
  });
</script>
```

---

## Development & Build

```bash
# Install dependencies
npm install

# Run local development server (Vite demo)
npm run dev

# Build production bundle to docs/dist/
npm run build
```

---

## Architecture

```
Raw Data + Columns + Flavor
             │
             ▼
   [prepareSource()] ──► Normalized Data Representation
             │
   [prepareRecipe()] ──► Flavor Template Recipe
             │
             ▼
    json-traversal   ──► Declarative DOM Specification (domSpec)
             │
             ▼
   @keshavsoft/json-to-tag ──► Native HTML Elements appended to DOM
```

---

## License

[MIT](LICENSE) © [KeshavSoft](https://github.com/keshavsoft)
