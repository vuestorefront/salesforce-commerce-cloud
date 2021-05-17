import { registerLogger } from '@vue-storefront/core';

const defaultModes = {
  // Test
  test: 'none',

  // Development
  dev: 'warn',
  development: 'warn',

  // Production
  prod: 'error',
  production: 'error',

  // Fallback
  default: 'warn'
};

const moduleOptions = JSON.parse('<%= JSON.stringify(options) %>');

export default ({ env }) => {
  if (moduleOptions.customLogger) {
    // Keep configured custom logger
    return;
  }

  let verbosity = moduleOptions.verbosity;
  if (!verbosity) {
    verbosity = defaultModes[env.NODE_ENV] || defaultModes.default;
  }

  registerLogger({
    error: (message, ...args) => {
      const [err] = args;

      if (err && err.isAxiosError && err.response && err.response.data) {
        console.error('[VSF][error]', message, err.response.data, ...(args.slice(1)));
      } else {
        console.error('[VSF][error]', message, ...args);
      }
    }
  }, verbosity);
};
