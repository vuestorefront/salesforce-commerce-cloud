import { SiteConfig, SfccIntegrationContext } from '../../../types';

export default async function getSiteConfig(context: SfccIntegrationContext): Promise<SiteConfig> {
  if (context.config.overrides && context.config.overrides.getSiteConfig) {
    return context.config.overrides.getSiteConfig(context);
  }

  return await context.client.SiteApi.getConfig();
}
