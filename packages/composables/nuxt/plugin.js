import setCookie from 'set-cookie-parser';
import { integrationPlugin, VSF_LOCALE_COOKIE, VSF_CURRENCY_COOKIE } from '@vue-storefront/core';

const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

const getLocaleSiteId = (i18n) => {
  const { locales, locale } = i18n;

  const localeConfig = locales.find(
    (localeConfig) => typeof localeConfig === 'object' && localeConfig.code === locale
  );

  if (localeConfig) {
    return localeConfig.siteId;
  }

  return null;
}

const getAxiosConfig = ({ app, integration, req, siteId }) => {
  const siteIdCookie = moduleOptions.cookieNames.siteId;
  const capiAuthCookie = moduleOptions.cookieNames.capiAuthToken;
  const ocapiAuthCookie = moduleOptions.cookieNames.ocapiAuthToken;
  const siteIdHeader = moduleOptions.clientHeaders.siteId;
  const capiAuthHeader = moduleOptions.clientHeaders.capiAuthToken;
  const ocapiAuthHeader = moduleOptions.clientHeaders.ocapiAuthToken;
  const currencyHeader = moduleOptions.clientHeaders.currency;
  const localeHeader = moduleOptions.clientHeaders.locale;

  return {
    headers: {
      [siteIdHeader]: app.$cookies.get(siteIdCookie) || siteId || '',
      [capiAuthHeader]: app.$cookies.get(capiAuthCookie) || '',
      [ocapiAuthHeader]: app.$cookies.get(ocapiAuthCookie) || '',
      [currencyHeader]: app.$cookies.get(VSF_CURRENCY_COOKIE),
      [localeHeader]: app.i18n.locale || app.$cookies.get(VSF_LOCALE_COOKIE)
    },
    transformResponse: [
      (data, headers) => {
        if (headers[capiAuthHeader] || headers[ocapiAuthHeader]) {
          const nestedConfig = getAxiosConfig({ app, integration, req });

          app.context.$cookies.set(capiAuthCookie, headers[capiAuthHeader]);
          app.context.$cookies.set(ocapiAuthCookie, headers[ocapiAuthHeader]);

          integration.configure('sfcc', {
            axios: {
              ...nestedConfig,
              headers: {
                ...nestedConfig.headers,
                [capiAuthHeader]: headers[capiAuthHeader],
                [ocapiAuthHeader]: headers[ocapiAuthHeader]
              }
            }
          });

          // Handle the difference in behaviour in Nuxt when injecting
          // into the Vue app and into the Nuxt context respectivelly
          //
          // https://github.com/nuxt/nuxt.js/blob/dev/packages/vue-app/template/index.js#L199
          // In the Vue app the plugin key always gets overwritten, but in the context
          // it cannot be overwritten, and the Axios client never gets the token header
          app.context.$vsf.$sfcc = app.$vsf.$sfcc;
        }

        if (typeof data === 'string') {
          try {
            return JSON.parse(data);
          } catch(e) {}
        }

        return data;
      }
    ]
  };
}

export default integrationPlugin(({ app, integration, req }) => {
  const siteId = getLocaleSiteId(app.i18n) || moduleOptions.siteId;

  integration.configure('sfcc', {
    siteId,
    allSiteIds: moduleOptions.allSiteIds,
    axios: getAxiosConfig({ app, integration, req, siteId })
  });
});
