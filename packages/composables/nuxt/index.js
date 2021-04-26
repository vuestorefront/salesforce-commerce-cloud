import path from 'path';

export default function sfccPlugin () {
  const middlewareConfigPath = path.join(this.options.rootDir, 'middleware.config.js');
  const middlewareConfig = require(middlewareConfigPath);
  const { cookieNames, clientHeaders } = middlewareConfig.integrations.sfcc.configuration;

  this.addPlugin({
    src: path.resolve(__dirname, './plugin.js'),
    options: { cookieNames, clientHeaders }
  });
}
