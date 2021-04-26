import setCookie from 'set-cookie-parser';
import { integrationPlugin } from '@vue-storefront/core';

const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

const getAxiosConfig = ({ app, integration, req }) => {
  const authCookie = moduleOptions.cookieNames.authToken;
  const authHeader = moduleOptions.clientHeaders.authToken;
  const localeHeader = moduleOptions.clientHeaders.locale

  return {
    headers: {
      [authHeader]: app.$cookies.get(authCookie) || '',
      [localeHeader]: app.i18n.locale,
    },
    transformResponse: [
      (data, headers) => {
        if (headers[authHeader]) {
          const nestedConfig = getAxiosConfig({ app, integration, req });

          app.context.$cookies.set(authCookie, headers[authHeader]);

          integration.configure('sfcc', {
            axios: {
              ...nestedConfig,
              headers: {
                ...nestedConfig.headers,
                [authHeader]: headers[authHeader]
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
  integration.configure('sfcc', {
    axios: getAxiosConfig({ app, integration, req })
  });
});
