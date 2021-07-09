# Configuration

SFCC configuration is located in two places:

- nuxt.config.js is a place where you're configuring properties related only to the frontend part of your application.

- middleware.config.js is a place where you're configuring the SFCC API client. There you will put API keys and other integration configurations.

## Nuxt SFCC configuration

```js
// nuxt.config.js
['@vue-storefront/sfcc/nuxt']
```

## Middleware SFCC configuration

You can read more about middleware configuration in Vue Storefront [here](../advanced/server-middleware.md#configuration)

```js
// middleware.config.js
module.exports = {
  integrations: {
    sfcc: {
      location: '@vue-storefront/sfcc-api/server',
      configuration: {
        cache: process.env.SFCC_CACHE !== 'false',
        timeout: process.env.SFCC_TIMEOUT || 10000,
        origin: process.env.SFCC_ORIGIN,
        siteId: process.env.SFCC_SITE_ID,
        capiClientId: process.env.SFCC_CAPI_CLIENT_ID,
        ocapiClientId: process.env.SFCC_OCAPI_CLIENT_ID,
        ocapiVersion: process.env.SFCC_OCAPI_VERSION,
        commerceApiVersion: process.env.SFCC_CAPI_VERSION || 'v1',
        shortCode: process.env.SFCC_SHORT_CODE,
        organizationId: process.env.SFCC_ORGANIZATION_ID,
        viewType: process.env.SFCC_PRODUCT_IMAGE_VIEW_TYPE,
        [ocapiEndpoints]: {
          [getCustomer]: true,
          [getCustomerAddresses]: true,
          [createCustomerAddress]: true,
          [updateCustomerAddress]: true,
          [deleteCustomerAddress]: true,
          [createCustomer]: true,
          [updateCustomer]: true,
          [updateCustomerPassword]: true,
          [getCategory]: true,
          [searchProducts]: true,
          [getProduct]: true,
          [getProducts]: true,
          [getWishlist]: true,
          [addToWishlist]: true,
          [removeFromWishlist]: true,
          [getCart]: true,
          [resetCart]: true,
          [addToCart]: true,
          [removeFromCart]: true,
          [addCouponToCart]: true,
          [removeCouponFromCart]: true,
          [updateCartItem]: true,
          [getApplicablePaymentMethods]: true,
          [getApplicableShippingMethods]: true,
          [saveShippingAddress]: true,
          [saveShippingMethod]: true,
          [saveBillingAddress]: true,
          [savePaymentInstrument]: true,
          [updateCart]: true,
          [createOrder]: true,
          [getCustomerOrders]: true
        },
        cookieNames: {
          capiAuthToken: process.env.SFCC_COOKIES_CAPI_TOKEN || 'vsf-sfcc-capi-token',
          ocapiAuthToken: process.env.SFCC_COOKIES_OCAPI_TOKEN || 'vsf-sfcc-ocapi-token'
        },
        clientHeaders: {
          capiAuthToken: process.env.SFCC_CLIENT_HEADERS_CAPI_TOKEN || 'x-vsf-sfcc-capi-token',
          ocapiAuthToken: process.env.SFCC_CLIENT_HEADERS_OCAPI_TOKEN || 'x-vsf-sfcc-ocapi-token',
          currency: process.env.SFCC_CLIENT_HEADERS_CURRENCY || 'x-vsf-sfcc-currency',
          locale: process.env.SFCC_CLIENT_HEADERS_LOCALE || 'x-vsf-sfcc-locale'
        }
      }
    }
  }
};
```
- `cache` - if set to false, will insret a timestamp in all OCAPI requests to override the server-side cache, and it will disable the default caching behaviour of the [Commerce SDK](https://www.npmjs.com/package/commerce-sdk) for SF CAPI calls.
- `timeout` - Time in ms to wait for a response from the API calls. Default: 10000
- `origin` - The base URL of the OCAPI target instance, the basic format is `https://instance-realm-client.demandware.net`
- `siteId` - The ID of the site to execite Shop(per) API calls to
- `capiClientId` - The CAPI client ID configured in [Account Manager](https://account.demandware.com/)
- `ocapiClientId` - The OCAPI client ID configured in [Account Manager](https://account.demandware.com/)
- `ocapiVersion` - The OCAPI version to include in the API URLs, the latest one is recommended unless otherwise stated in release notes
- `shortCode` - Value used by SF CAPI for client authorization
- `organizationId` - Value used by SF CAPI for client authorization
- `viewType` - The product image view type to use for product galleries, cart item images, etc. Only one view type is targeted, as currently the connector only supports DIS. There are no plans to change this unless a compelling use-case for serving the images through the catalog can be found.
- `ocapiEndpoints` - Optionally force any API client endpoint to go through OCAPI; endpoints whose keys are absent or evaluate to `false` use CAPI by default
- `cookieNames`
  - `capiAuthToken` - The name of the cookie in which the customer's current JWT authentication token for CAPI will be stored
  - `ocapiAuthToken` - The name of the cookie in which the customer's current JWT authentication token for OCAPI will be stored
- `clientHeaders`
  - `capiAuthToken` - The name of the HTTP header in which the client will send the current JWT token for CAPI to the API
  - `ocapiAuthToken` - The name of the HTTP header in which the client will send the current JWT token for OCAPI to the API
  - `currency` - The name of the HTTP header in which the client will send the currently selected currency's code to the API
  - `locale` - The name of the HTTP header in which the client will send the current locale to the API
