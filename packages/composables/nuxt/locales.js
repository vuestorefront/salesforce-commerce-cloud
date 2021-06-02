// const { getSiteConfig } = require('@vue-storefront/sfcc-api');

export default /* async */ (context) => {
  console.log(context.$config.i18n);
  if (context.$config.i18n) {
    const siteConfig = {}; // await getSiteConfig(context);
    console.log(siteConfig);

    context.$config.i18n = {
      locales: siteConfig.allowedLocales.map((locale) => locale.id),
      defaultLocale: siteConfig.defaultLocale,
      vueI18n: {
        fallbackLocale: siteConfig.defaultLocale,
        ...(context.config.i18n.vueI18n || {})
      }
    };
  }
};
