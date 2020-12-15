import { SfccIntegrationContext } from '../../../types';

export default async function guestSignIn(context: SfccIntegrationContext): Promise<void> {
  if (context.config.overrides && context.config.overrides.guestSignIn) {
    return await context.config.overrides.guestSignIn(context);
  }

  const token = await context.client.CustomersApi.guestSignIn();

  if (token && context.config.callbacks && context.config.callbacks.auth && context.config.callbacks.auth.onTokenChange) {
    context.config.callbacks.auth.onTokenChange(token);
  }
}
