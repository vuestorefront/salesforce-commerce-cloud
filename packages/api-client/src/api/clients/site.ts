import ShopApi from 'commercecloud-ocapi-client';
import { AgnosticStore } from '@vue-storefront/core';

import { SiteApi } from './interfaces';
import { mapOcapiSite } from '../mapping/ocapi/ocapiSiteMapping';

export class OcapiSiteApi implements SiteApi {
  protected config: ShopApi.ApiConfig;
  protected api: ShopApi.SiteApi;

  constructor(config: ShopApi.ApiConfig) {
    this.config = config;
    this.api = new ShopApi.SiteApi();
  }

  async getSite(currentLocale: string, siteId?: string): Promise<AgnosticStore> {
    if (siteId) {
      const basePath = this.api.apiClient.basePath;
      const siteBasePath = basePath.replace(/\/s\/[^/]+/, `/s/${siteId}`);

      this.api.apiClient.basePath = siteBasePath;
    }

    const site = await this.api.getSite();

    if (site) {
      return mapOcapiSite(site, currentLocale);
    }

    return {
      id: null,
      name: null,
      locales: [],
      currencies: [],
    };
  }
}
