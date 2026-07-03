# ext-pdp-html-block

This extension enables the injection of configurable HTML blocks into different portals on Product Detail Pages.

## Configuration

The extension expects a single `htmlBlocks` object in the configuration. Each key must match a PDP portal target and each value must be the raw HTML string to render there.

Rendered HTML blocks receive a generated CSS class in the form `html-block-<portal-name>`, with dots replaced by dashes (for example `product.header.after` becomes `html-block-product-header-after`).

The following product variables can be used inside configured HTML blocks:

- `{productName}`
- `{productId}`
- `{productNumber}`

After a block was rendered or updated, the extension dispatches a `pdpHtmlBlock:updated` browser event. Integrations can listen to this event to reinitialize third-party widgets after SPA product navigation.

```js
window.addEventListener('pdpHtmlBlock:updated', (event) => {
  const {
    name,
    productId,
    productName,
    productNumber,
  } = event.detail;

  if (name !== 'product.description.after') {
    return;
  }

  // Reinitialize the third-party widget here.
});
```

HTML blocks may be processed again during PDP lifecycle updates, for example after SPA product navigation. Third-party integrations should use the `pdpHtmlBlock:updated` event as their stable hook instead of relying on inline scripts to execute exactly once.

### Example Configuration

```json
{
  "htmlBlocks": {
    "product.image.after": "<p>HTML for <b>{productName}</b></p>",
    "product.header.before": "<p>HTML for ID <b>{productId}</b></p>",
    "product.header.after": "<script async src=\"https://example.com/review-tool.js\"></script><div class=\"review-widget\" data-product-id=\"{productId}\" data-product-number=\"{productNumber}\"></div>",
    "product.variant-select.before": "<p>HTML for <b>variant before</b></p>",
    "product.variant-select.after": "<p>HTML for <b>variant after</b></p>",
    "product.description.before": "<p>HTML for SKU <b>{productNumber}</b></p>",
    "product.description.after": "<p>HTML for <b>description after</b></p>",
    "product.properties.before": "<p>HTML for <b>properties before</b></p>",
    "product.properties.after": "<p>HTML for <b>properties after</b></p>",
    "product.reviews.before": "<p>HTML for <b>reviews before</b></p>",
    "product.reviews.after": "<p>HTML for <b>reviews after</b></p>"
  }
}
```
