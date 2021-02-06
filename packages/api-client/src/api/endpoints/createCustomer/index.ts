import { SfccIntegrationContext, Customer } from '../../../types';

export default async function createCustomer(context: SfccIntegrationContext, email: string, password: string, firstName: string, lastName: string): Promise<Customer> {
  if (context.config.overrides && context.config.overrides.createCustomer) {
    return context.config.overrides.createCustomer(context, email, password, firstName, lastName);
  }

  return await context.client.CustomersApi.createCustomer(email, password, firstName, lastName);
}
