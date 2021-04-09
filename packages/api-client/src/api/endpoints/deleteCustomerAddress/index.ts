import { SfccIntegrationContext, CustomerAddress } from '../../../types';

export default async function deleteCustomerAddress(context: SfccIntegrationContext, address: CustomerAddress): Promise<void> {
  if (context.config.overrides && context.config.overrides.deleteCustomerAddress) {
    return context.config.overrides.deleteCustomerAddress(context, address);
  }

  return await context.client.CustomersApi.deleteAddress(address);
}
