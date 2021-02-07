import { Basket } from 'commercecloud-ocapi-client';

import { Cart, SfccIntegrationContext } from '../../../types';
import { mapCart } from '../shared/cartMapping';
import { baseMapping } from './ocapiBaseMapping';

export const mapOcapiCart = async (
  context: SfccIntegrationContext,
  cart: Basket
): Promise<Cart> => mapCart(context, baseMapping<Cart>(cart));
