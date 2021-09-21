import cc from 'currency-codes';
import getSymbolFromCurrency from 'currency-symbol-map';
import { Site, Locale } from 'commercecloud-ocapi-client';
import { AgnosticStore, AgnosticLocale, AgnosticCurrency } from '@vue-storefront/core';

const formatValue = (value: number, locale: string, currency: string) => {
  const currencyFormatOptions = { currency, style: 'currency' };
  const currencyFormat = new Intl.NumberFormat(locale, currencyFormatOptions);

  return currencyFormat.format(value);
};

const currencyMapper = (locale: string) => (currencyCode: string): AgnosticCurrency => ({
  code: currencyCode,
  sign: getSymbolFromCurrency(currencyCode),
  label: cc.code(currencyCode).currency,
  prefixSign: !(formatValue(0, locale, currencyCode).startsWith('0')),
});

const mapLocale = (locale: Locale): AgnosticLocale => ({
  code: locale.id,
  label: locale.display_name,
});

const localeSorter = (site: Site) => (a: AgnosticLocale, b: AgnosticLocale) => {
  if (a.code === site.default_locale) {
    return -1;
  }

  if (b.code === site.default_locale) {
    return 1;
  }

  return 0;
}

export const mapOcapiSite = (site: Site, currentLocale: string): AgnosticStore => ({
  id: site.id,
  name: site.name,
  locales: site.allowed_locales.map(mapLocale).sort(localeSorter(site)),
  currencies: site.allowed_currencies.map(currencyMapper(currentLocale)),
});
