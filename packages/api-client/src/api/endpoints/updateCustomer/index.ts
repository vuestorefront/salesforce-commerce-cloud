import { Customer, SfccIntegrationContext } from '../../../types';

export default async function updateCustomer(context: SfccIntegrationContext, email: string, firstName: string, lastName: string): Promise<Customer> {
  if (context.config.overrides && context.config.overrides.updateCustomer) {
    return context.config.overrides.updateCustomer(context, email, firstName, lastName);
  }

  return await context.client.CustomersApi.updateCustomer(email, firstName, lastName);
}
