import path from 'path';

function integrationPlugin() {
  const middlewareConfigPath = path.join(this.options.rootDir, 'middleware.config.js');
  const middlewareConfig = require(middlewareConfigPath);
  const { cookieNames, clientHeaders } = middlewareConfig.integrations.sfcc.configuration;

  this.addPlugin({
    src: path.resolve(__dirname, './plugin.js'),
    options: { cookieNames, clientHeaders }
  });
}

function loggerPlugin() {
  const buildModules = this.options.buildModules || [];
  const vsfModuleConfig = buildModules
    .filter((mod) => Array.isArray(mod))
    .find((mod) => mod[0] === '@vue-storefront/nuxt');

  const loggerConfig = vsfModuleConfig[1] && vsfModuleConfig[1].logger;

  this.addPlugin({
    src: path.resolve(__dirname, './logger.js'),
    options: loggerConfig || {}
  });

  // Ensures that this plugin runs after the logger plugin introduced
  // by the VSF Nuxt module; otherwise it always overwrites the custom logger
  if (vsfModuleConfig) {
    this.options.plugins.push(this.options.plugins.shift());
  }
}

function localesPlugin(moduleOptions) {
  if (moduleOptions.useSiteLocales) {
    this.addPlugin({
      src: path.resolve(__dirname, './locales.js'),
      options: {}
    });
  }
}

export default function sfccPlugin(moduleOptions) {
  integrationPlugin.call(this);
  loggerPlugin.call(this);
  localesPlugin.call(this, moduleOptions);
}
