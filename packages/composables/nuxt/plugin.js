import setCookie from 'set-cookie-parser';
import { integrationPlugin } from '@vue-storefront/core';

const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

export default integrationPlugin(({ app, integration, req }) => {
  integration.configure('sfcc', {
    axios: {
      headers: {
        [moduleOptions.clientHeaders.locale]: app.i18n.locale,
      },
      transformResponse: [
        (data, headers) => {
          const setCookieHeaders = headers['set-cookie'];

          if (setCookieHeaders) {
            setCookieHeaders
              .map(setCookie.parseString)
              .forEach((cookie) => {
                app.context.$cookies.set(cookie.name, cookie.value, cookie)
              });
          }

          if (typeof data === 'string') {
            try {
              return JSON.parse(data);
            } catch(e) {}
          }

          return data;
        }
      ]
    }
  });
});
