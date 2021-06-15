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
        cookieNames: {
          capiAuthToken: process.env.SFCC_COOKIES_CAPI_TOKEN || 'vsf-sfcc-capi-token',
          ocapiAuthToken: process.env.SFCC_COOKIES_OCAPI_TOKEN || 'vsf-sfcc-ocapi-token'
        },
        clientHeaders: {
          capiAuthToken: process.env.SFCC_CLIENT_HEADERS_CAPI_TOKEN || 'x-vsf-sfcc-capi-token',
          ocapiAuthToken: process.env.SFCC_CLIENT_HEADERS_OCAPI_TOKEN || 'x-vsf-sfcc-ocapi-token',
          locale: process.env.SFCC_CLIENT_HEADERS_LOCALE || 'x-vsf-sfcc-locale'
        }
      }
    }
  }
};
