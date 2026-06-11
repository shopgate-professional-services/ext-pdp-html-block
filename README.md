# ext-pdp-html-block

This extension enables the injection of configurable HTML blocks into different portals on Product Detail Pages.

## Configuration

The extension expects a single `htmlBlocks` object in the configuration. Each key must match a PDP portal target and each value must be the raw HTML string to render there.

Rendered HTML blocks receive a generated CSS class in the form `html-block-<portal-name>`, with dots replaced by dashes (for example `product.header.after` becomes `html-block-product-header-after`).

The following product variables can be used inside configured HTML blocks:

- `{productName}`
- `{productId}`
- `{productNumber}`

### Example Configuration

```json
{
  "htmlBlocks": {
    "product.image.after": "<p>HTML for <b>{productName}</b></p>",
    "product.header.before": "<p>HTML for ID <b>{productId}</b></p>",
    "product.header.after": "<script>window.reviewToolProduct = { id: '{productId}', number: '{productNumber}' };</script>",
    "product.variant-select.before": "<p>HTML for <b>variant before</b></p>",
    "product.variant-select.after": "<p>HTML for <b>variant after</b></p>",
    "product.description.before": "<p>HTML for SKU <b>{productNumber}'</b></p>",
    "product.description.after": "<p>HTML for <b>description after</b></p>",
    "product.properties.before": "<p>HTML for <b>properties before</b></p>",
    "product.properties.after": "<p>HTML for <b>properties after</b></p>",
    "product.reviews.before": "<p>HTML for <b>reviews before</b></p>",
    "product.reviews.after": "<p>HTML for <b>reviews after</b></p>"
  }
}
```
