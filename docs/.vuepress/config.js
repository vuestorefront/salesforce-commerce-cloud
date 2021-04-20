module.exports = {
  title: 'Vue Storefront 2 with SFCC',
  base: '/',
  description: 'Documentation for the SFCC connector for Vue Storefront 2',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }]
  ],
  configureWebpack: (config) => {
    config.module.rules = config.module.rules.map(rule => ({
      ...rule,
      use: rule.use && rule.use.map(useRule => ({
        ...useRule,
        options: useRule.loader === 'url-loader' ?
          /**
            Hack for loading images properly.
            ref: https://github.com/vuejs/vue-loader/issues/1612#issuecomment-559366730
           */
          {  ...useRule.options, esModule: false } :
          useRule.options
      }))
    }))
  },
  themeConfig: {
		nav: [
			{ text: 'Main Docs', link: 'https://docs.vuestorefront.io/v2/' },
			{ text: 'Github', link: 'https://github.com/vuestorefront/salesforce-commerce-cloud' }
		],
    sidebar: [
      {
        title: 'Essentials',
        collapsable: false,
        children: [
          ['/', 'Introduction'],
          ['/sfcc/getting-started', 'Getting started'],
          ['/sfcc/configuration', 'Configuration'],
          ['/sfcc/example-ocapi-configuration', 'Example OCAPI Configuration']
        ]
      },
      {
        title: 'Composables',
        collapsable: false,
        children: [
          ['/sfcc/composables/use-product', 'useProduct'],
          ['/sfcc/composables/use-user', 'useUser'],
          ['/sfcc/composables/use-user-shipping', 'useUserShipping'],
          ['/sfcc/composables/use-user-order', 'useUserOrder'],
          ['/sfcc/composables/use-facet', 'useFacet'],
          ['/sfcc/composables/use-cart', 'useCart'],
          ['/sfcc/composables/use-wishlist', 'useWishlist'],
          ['/sfcc/composables/use-category', 'useCategory'],
          ['/sfcc/composables/use-shipping', 'useShipping'],
          ['/sfcc/composables/use-shipping-provider', 'useShippingProvider'],
          ['/sfcc/composables/use-billing', 'useBilling'],
          ['/sfcc/composables/use-payment', 'usePayment'],
          ['/sfcc/composables/use-make-order', 'useMakeOrder']
        ]
      }
    ]
  }
}
