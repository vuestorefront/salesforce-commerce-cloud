import { SfccIntegrationContext, Customer } from '../../../types';

export default async function signIn(context: SfccIntegrationContext, username: string, password: string): Promise<Customer> {
  if (context.config.overrides && context.config.overrides.signIn) {
    return context.config.overrides.signIn(context, username, password);
  }

  const { customer, token } = await context.client.CustomersApi.signIn(username, password);

  if (token && context.config.callbacks && context.config.callbacks.auth && context.config.callbacks.auth.onTokenChange) {
    context.config.callbacks.auth.onTokenChange(token);
  }

  return customer;
}
