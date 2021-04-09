# Example OCAPI configuration

* Shop API

```json
{
  "_v": "20.10 <or higher>",
  "clients": [
    {
      "client_id": "<Your client ID>",
      "allowed_origins": [
        "<Your public domains>"
      ],
      "resources": [
        {
          "resource_id": "/baskets",
          "methods": [
            "post"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/baskets/*",
          "methods": [
            "delete",
            "get",
            "patch"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/baskets/*/billing_address",
          "methods": [
            "put"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/baskets/*/coupons",
          "methods": [
            "post"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/baskets/*/coupons/*",
          "methods": [
            "delete"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/baskets/*/customer",
          "methods": [
            "put"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/baskets/*/items",
          "methods": [
            "post"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/baskets/*/items/*",
          "methods": [
            "delete",
            "patch"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/baskets/*/payment_instruments",
          "methods": [
            "post"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/baskets/*/payment_instruments/*",
          "methods": [
            "delete",
            "patch"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/baskets/*/payment_methods",
          "methods": [
            "get"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/baskets/*/shipments",
          "methods": [
            "post"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/baskets/*/shipments/*",
          "methods": [
            "delete",
            "patch"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/baskets/*/shipments/*/shipping_address",
          "methods": [
            "put"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/baskets/*/shipments/*/shipping_method",
          "methods": [
            "put"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/baskets/*/shipments/*/shipping_methods",
          "methods": [
            "get"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/categories/(*)",
          "methods": [
            "get"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/categories/*",
          "methods": [
            "get"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/customers",
          "methods": [
            "post"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/customers/auth",
          "methods": [
            "delete",
            "post"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/customers/password/actions/create_reset_token",
          "methods": [
            "post"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/customers/password/actions/reset",
          "methods": [
            "post"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/customers/password_reset",
          "methods": [
            "post"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/customers/*",
          "methods": [
            "get",
            "patch"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/customers/*/addresses",
          "methods": [
            "get",
            "post"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/customers/*/addresses/*",
          "methods": [
            "delete",
            "get",
            "patch"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/customers/*/auth",
          "methods": [
            "post"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/customers/*/baskets",
          "methods": [
            "get"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/customers/*/orders",
          "methods": [
            "get"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/customers/*/password",
          "methods": [
            "put"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/customers/*/password_reset",
          "methods": [
            "post"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/customers/*/product_lists",
          "methods": [
            "get",
            "post"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/customers/*/product_lists/*",
          "methods": [
            "delete",
            "get",
            "patch"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/customers/*/product_lists/*/items",
          "methods": [
            "get",
            "post"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/customers/*/product_lists/*/items/*",
          "methods": [
            "delete",
            "get",
            "patch"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/product_lists",
          "methods": [
            "get"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/product_lists/*",
          "methods": [
            "get"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/product_lists/*/items",
          "methods": [
            "get"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/product_lists/*/items/*",
          "methods": [
            "get"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/product_search",
          "methods": [
            "get"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/product_search/availability",
          "methods": [
            "get"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/product_search/images",
          "methods": [
            "get"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/product_search/prices",
          "methods": [
            "get"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/product_search/represented_products",
          "methods": [
            "get"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/product_search/variations",
          "methods": [
            "get"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/products/(*)",
          "methods": [
            "get"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/products/*",
          "methods": [
            "get"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/products/*/availability",
          "methods": [
            "get"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/products/*/bundled_products",
          "methods": [
            "get"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/products/*/images",
          "methods": [
            "get"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/products/*/links",
          "methods": [
            "get"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/products/*/options",
          "methods": [
            "get"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/products/*/prices",
          "methods": [
            "get"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/products/*/promotions",
          "methods": [
            "get"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/products/*/recommendations",
          "methods": [
            "get"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/products/*/set_products",
          "methods": [
            "get"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/products/*/shipping_methods",
          "methods": [
            "get"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/products/*/variations",
          "methods": [
            "get"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/promotions",
          "methods": [
            "get"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/promotions/(*)",
          "methods": [
            "get"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        },
        {
          "resource_id": "/promotions/*",
          "methods": [
            "get"
          ],
          "read_attributes": "(**)",
          "write_attributes": "(**)"
        }
      ]
    }
  ]
}
```
