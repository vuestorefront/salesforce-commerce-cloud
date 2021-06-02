import ShopApi from 'commercecloud-ocapi-client';

import { SiteApi } from './interfaces';
import { SiteConfig } from '../../types';
import { mapOcapiLocale } from '../mapping/ocapi/ocapiSiteMapping';

export class OcapiSiteApi implements SiteApi {
  protected config: ShopApi.ApiConfig;
  protected api: ShopApi.SiteApi;

  constructor(config: ShopApi.ApiConfig) {
    this.config = config;
    this.api = new ShopApi.SiteApi();
  }

  async getConfig(): Promise<SiteConfig> {
    const site = await this.api.getSite();

    if (site) {
      return {
        allowedLocales: site.allowed_locales.map(mapOcapiLocale),
        defaultLocale: site.default_locale
      };
    }

    return {
      allowedLocales: [],
      defaultLocale: null
    };
  }
}
