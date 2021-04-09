import { SfccIntegrationContext, CustomerAddress } from '../../../types';

export default async function createCustomerAddress(context: SfccIntegrationContext, address: CustomerAddress): Promise<CustomerAddress> {
  if (context.config.overrides && context.config.overrides.createCustomerAddress) {
    return context.config.overrides.createCustomerAddress(context, address);
  }

  return await context.client.CustomersApi.createAddress(address);
}
