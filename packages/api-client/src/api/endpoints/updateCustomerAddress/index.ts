import { SfccIntegrationContext, CustomerAddress } from '../../../types';

export default async function updateCustomerAddress(context: SfccIntegrationContext, address: CustomerAddress): Promise<CustomerAddress> {
  if (context.config.overrides && context.config.overrides.updateCustomerAddress) {
    return context.config.overrides.updateCustomerAddress(context, address);
  }

  return await context.client.CustomersApi.updateAddress(address);
}
