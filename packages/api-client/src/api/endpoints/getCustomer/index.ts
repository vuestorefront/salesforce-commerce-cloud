import { SfccIntegrationContext, Customer } from '../../../types';

export default async function getCustomer(context: SfccIntegrationContext): Promise<Customer> {
  if (context.config.overrides && context.config.overrides.getCustomer) {
    return context.config.overrides.getCustomer(context);
  }

  return await context.client.CustomersApi.getCustomer();
}
