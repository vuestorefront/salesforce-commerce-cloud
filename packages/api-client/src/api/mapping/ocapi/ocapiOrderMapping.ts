import { Order as ApiOrder } from 'commercecloud-ocapi-client';
import { baseMapping } from './ocapiBaseMapping';
import { Order, SfccIntegrationContext } from '../../../types';
import { mapOrder } from '../shared/orderMapping';

export const mapOcapiOrder = async (
  context: SfccIntegrationContext,
  apiOrder: ApiOrder
): Promise<Order> => mapOrder(context, baseMapping<Order>(apiOrder));
