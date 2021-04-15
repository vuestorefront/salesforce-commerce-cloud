# Getting started


## Configuring your SFCC integration

You can [generate your project from our CLI](/general/getting-started.html).

The first thing you should do after setting it up is changing the credentials to point into your instance.

For information on setting up the required API clients and configurations for your choses API interface:

* [Add an API client](https://documentation.b2c.commercecloud.salesforce.com/DOC2/topic/com.demandware.dochelp/content/b2c_commerce/topics/account_manager/b2c_account_manager_add_api_client_id.html)

* [OCAPI configuration](https://documentation.b2c.commercecloud.salesforce.com/DOC2/topic/com.demandware.dochelp/OCAPI/current/usage/OCAPISettings.html)
  - An example configurationcan be found [here](example-ocapi-configuration.md).
  - The connector only supports using one client ID at a time.
  - Caching is out of scope for the connector and should be configured based on your own performance stratedy

* [SF CAPI Scopes Configuration](https://developer.commercecloud.com/s/article/CommerceAPI-Client-Permissions-for-API-Endpoints)

* [SF CAPI Configuration Values](https://developer.commercecloud.com/s/article/CommerceAPI-ConfigurationValues)

Set up your configuiration values into the `sfcc` config object inside `integrations` in `middleware.config.js`. By default environment variables can be used:

```js
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
          locale: process.env.SFCC_CLIENT_HEADERS_LOCALE || 'x-vsf-sfcc-locale'
        },
        callbacks: {
          auth: {}
        }
      }
    }
  }
};
```

For a detailed description of the project configuration and the various available options check [here](configuration.md)

## Configuring other integrations

Depending on the configuration and if you're using Enterprise version you could have additional integrations to set up. You will find their configurations in `middleware.config.js`