import { SfccIntegrationContext } from '../../../types';

export default async function guestSignIn(context: SfccIntegrationContext): Promise<void> {
  if (context.config.overrides && context.config.overrides.guestSignIn) {
    return await context.config.overrides.guestSignIn(context);
  }

  const tokens = await context.client.CustomersApi.guestSignIn();

  if (tokens && context.config.callbacks && context.config.callbacks.auth && context.config.callbacks.auth.onTokenChange) {
    context.config.callbacks.auth.onTokenChange(tokens.capiToken, tokens.ocapiToken);
  }
}
