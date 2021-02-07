import { Customer, SfccIntegrationContext } from '../../../types';

export default async function updateCustomerPassword(context: SfccIntegrationContext, currentPassword: string, newPassword: string): Promise<Customer> {
  if (context.config.overrides && context.config.overrides.updateCustomerPassword) {
    return context.config.overrides.updateCustomerPassword(context, currentPassword, newPassword);
  }

  return await context.client.CustomersApi.updateCustomerPassword(currentPassword, newPassword);
}
