import { SfccIntegrationContext } from '../../../types';

export default async function refreshToken(context: SfccIntegrationContext): Promise<void> {
  if (context.config.overrides && context.config.overrides.refreshToken) {
    return await context.config.overrides.refreshToken(context);
  }

  const token = await context.client.CustomersApi.refreshToken();

  if (token && context.config.callbacks && context.config.callbacks.auth && context.config.callbacks.auth.onTokenChange) {
    context.config.callbacks.auth.onTokenChange(token);
  }
}
