module.exports = {
  integrations: {
    sfcc: {
      location: '@vue-storefront/sfcc-api/server',
      configuration: {
        cache: process.env.SFCC_CACHE !== 'false',
        timeout: process.env.SFCC_TIMEOUT || 10000,
        origin: process.env.SFCC_ORIGIN,
        siteId: process.env.SFCC_SITE_ID,
        clientId: process.env.SFCC_CLIENT_ID,
        ocapiVersion: process.env.SFCC_OCAPI_VERSION,
        enableCommerceApi: process.env.SFCC_ENABLE_CAPI !== 'false',
        commerceApiVersion: process.env.SFCC_OCAPI_VERSION || 'v1',
        shortCode: process.env.SFCC_SHORT_CODE,
        organizationId: process.env.SFCC_ORGANIZATION_ID,
        viewType: process.env.SFCC_PRODUCT_IMAGE_VIEW_TYPE,
        cookieNames: {
          authToken: process.env.SFCC_COOKIES_API_TOKEN || 'vsf-sfcc-api-token'
        },
        clientHeaders: {
          authToken: process.env.SFCC_CLIENT_HEADERS_AUTH_TOKEN || 'x-vsf-sfcc-api-token',
          locale: process.env.SFCC_CLIENT_HEADERS_LOCALE || 'x-vsf-sfcc-locale'
        }
      }
    }
  }
};
