# ext-pdp-html-block

This extension enables the injection of configurable HTML blocks into different portals on Product Detail Pages.

## Configuration

The extension expects a single `htmlBlocks` object in the configuration. Each key must match a PDP portal target and each value must be the raw HTML string to render there.

Rendered HTML blocks receive a generated CSS class in the form `html-block-<portal-name>`, with dots replaced by dashes (for example `product.header.after` becomes `html-block-product-header-after`).

### Example Configuration

```json
{
  "htmlBlocks": {
    "product.image.after": "<p>HTML for <b>image after</b></p>",
    "product.header.before": "<p>HTML for <b>header before</b></p>",
    "product.header.after": "<p>HTML for <b>header after</b></p>",
    "product.variant-select.before": "<p>HTML for <b>variant before</b></p>",
    "product.variant-select.after": "<p>HTML for <b>variant after</b></p>",
    "product.description.before": "<p>HTML for <b>description before</b></p>",
    "product.description.after": "<p>HTML for <b>description after</b></p>",
    "product.properties.before": "<p>HTML for <b>properties before</b></p>",
    "product.properties.after": "<p>HTML for <b>properties after</b></p>",
    "product.reviews.before": "<p>HTML for <b>reviews before</b></p>",
    "product.reviews.after": "<p>HTML for <b>reviews after</b></p>"
  }
}
```
