import { SfccIntegrationContext, CustomerAddress } from '../../../types';

export default async function getCustomerAddresses(context: SfccIntegrationContext): Promise<CustomerAddress[]> {
  if (context.config.overrides && context.config.overrides.getCustomerAddresses) {
    return context.config.overrides.getCustomerAddresses(context);
  }

  return await context.client.CustomersApi.getAddresses();
}
