import { AgnosticStore } from '@vue-storefront/core';
import { SfccIntegrationContext } from '../../../types';

export default async function getSite(context: SfccIntegrationContext, siteId?: string): Promise<AgnosticStore> {
  if (context.config.overrides && context.config.overrides.getSite) {
    return context.config.overrides.getSite(context, siteId);
  }

  return await context.client.SiteApi.getSite(context.config.locale, siteId);
}
