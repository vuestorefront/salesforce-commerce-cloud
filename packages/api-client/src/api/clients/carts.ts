import ShopApi from 'commercecloud-ocapi-client';
import { ClientConfig, Checkout } from 'commerce-sdk';

import { CartsApi } from './interfaces';
import { mapCart } from '../mapping/shared/cartMapping';
import { mapOcapiCart } from '../mapping/ocapi/ocapiCartMapping';
import { Cart, Product, LineItem, SfccIntegrationContext } from '../../types';

export class OcapiCartsApi implements CartsApi {
  protected config: ShopApi.ApiConfig;
  protected api: ShopApi.BasketsApi;

  constructor(config: ShopApi.ApiConfig) {
    this.config = config;
    this.api = new ShopApi.BasketsApi();
  }

  async createCart(context: SfccIntegrationContext): Promise<Cart> {
    const cartResponse = await this.api.postBaskets();

    return mapOcapiCart(context, cartResponse);
  }

  async addItemToCart(context: SfccIntegrationContext, cartId: string, product: Product, quantitiy?: number): Promise<Cart> {
    const cartResponse = await this.api.postBasketsByIDItems(cartId, [{
      product_id: product._id, // eslint-disable-line camelcase
      quantity: quantitiy || 1
    }]);

    return mapOcapiCart(context, cartResponse);
  }

  async removeItemFromCart(context: SfccIntegrationContext, cartId: string, itemId: string): Promise<Cart> {
    const cartResponse = await this.api.deleteBasketsByIDItemsByID(cartId, itemId);

    return mapOcapiCart(context, cartResponse);
  }

  async updateCartItemQuantity(context: SfccIntegrationContext, cartId: string, item: LineItem, quantity: number): Promise<Cart> {
    const cartResponse = await this.api.patchBasketsByIDItemsByID(cartId, item.itemId, {
      quantity: quantity,
      product_id: item._id // eslint-disable-line camelcase
    });

    return mapOcapiCart(context, cartResponse);
  }

  async addCouponToCart(context: SfccIntegrationContext, cartId: string, couponCode: string): Promise<Cart> {
    const cartResponse = await this.api.postBasketsByIDCoupons(cartId, {
      code: couponCode
    });

    return mapOcapiCart(context, cartResponse);
  }

  async removeCouponFromCart(context: SfccIntegrationContext, cartId: string, couponItemId: string): Promise<Cart> {
    const cartResponse = await this.api.deleteBasketsByIDCouponsByID(cartId, couponItemId);

    return mapOcapiCart(context, cartResponse);
  }

  async resetCart(context: SfccIntegrationContext, cartId: string): Promise<Cart> {
    await this.api.deleteBasketsByID(cartId);

    return this.createCart(context);
  }
}

export class CapiCartsApi implements CartsApi {
  protected config: ClientConfig;
  protected api: Checkout.ShopperBaskets;

  constructor(config: ClientConfig) {
    this.config = config;
    this.api = new Checkout.ShopperBaskets(config);
  }

  async createCart(context: SfccIntegrationContext): Promise<Cart> {
    const cartResponse = await this.api.createBasket({
      body: {}
    });

    return mapCart(context, cartResponse);
  }

  async addItemToCart(context: SfccIntegrationContext, cartId: string, product: Product, quantitiy?: number): Promise<Cart> {
    const cartResponse = await this.api.addItemToBasket({
      parameters: {
        basketId: cartId
      },
      body: [{
        productId: product._id,
        quantity: quantitiy || 1
      }]
    });

    return mapCart(context, cartResponse);
  }

  async removeItemFromCart(context: SfccIntegrationContext, cartId: string, itemId: string): Promise<Cart> {
    const cartResponse = await this.api.removeItemFromBasket({
      parameters: {
        itemId,
        basketId: cartId
      }
    });

    return mapCart(context, cartResponse);
  }

  async updateCartItemQuantity(context: SfccIntegrationContext, cartId: string, item: LineItem, quantity: number): Promise<Cart> {
    const cartResponse = await this.api.updateItemInBasket({
      parameters: {
        basketId: cartId,
        itemId: item.itemId
      },
      body: {
        quantity: quantity
      }
    });

    return mapCart(context, cartResponse);
  }

  async addCouponToCart(context: SfccIntegrationContext, cartId: string, couponCode: string): Promise<Cart> {
    const cartResponse = await this.api.addCouponToBasket({
      parameters: {
        basketId: cartId
      },
      body: {
        code: couponCode
      }
    });

    return mapCart(context, cartResponse);
  }

  async removeCouponFromCart(context: SfccIntegrationContext, cartId: string, couponItemId: string): Promise<Cart> {
    const cartResponse = await this.api.removeCouponFromBasket({
      parameters: {
        couponItemId,
        basketId: cartId
      }
    });

    return mapCart(context, cartResponse);
  }

  async resetCart(context: SfccIntegrationContext, cartId: string): Promise<Cart> {
    await this.api.deleteBasket({
      parameters: {
        basketId: cartId
      }
    });

    return this.createCart(context);
  }
}
