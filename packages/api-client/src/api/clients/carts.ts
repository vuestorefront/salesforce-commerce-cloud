import ShopApi from 'commercecloud-ocapi-client';
import { ClientConfig, Checkout } from 'commerce-sdk';

import { CartsApi } from './interfaces';
import { Cart, Product, LineItem, ContactInfo, SfccIntegrationContext } from '../../types';
import { mapCart } from '../mapping/shared/cartMapping';
import {
  mapOcapiCart,
  mapToOcapiAddress,
  mapOcapiShippingMethod,
  mapOcapiPaymentMethod
} from '../mapping/ocapi/ocapiCartMapping';

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

  async getShippingMethods(cartId: string, shipmentId: string): Promise<Checkout.ShopperBaskets.ShippingMethodResult> {
    const response = await this.api.getBasketsByIDShipmentsByIDShippingMethods(cartId, shipmentId);

    return {
      defaultShippingMethodId: response.default_shipping_method_id,
      applicableShippingMethods: response.applicable_shipping_methods.map(mapOcapiShippingMethod)
    };
  }

  async getPaymentMethods(cartId: string): Promise<Checkout.ShopperBaskets.PaymentMethodResult> {
    const response = await this.api.getBasketsByIDPaymentMethods(cartId);

    return {
      applicablePaymentMethods: response.applicable_payment_methods.map(mapOcapiPaymentMethod)
    };
  }

  async updateCartContactInfo(context: SfccIntegrationContext, cartId: string, contactInfo: ContactInfo): Promise<Cart> {
    const cartResponse = await this.api.putBasketsByIDCustomer(cartId, {
      email: contactInfo.email,
      customer_id: contactInfo.customerId, // eslint-disable-line camelcase
      customer_no: contactInfo.customerNo, // eslint-disable-line camelcase
      customer_name: contactInfo.firstName + ' ' + contactInfo.lastName // eslint-disable-line camelcase
    });

    return mapOcapiCart(context, cartResponse);
  }

  async setShippingAddress(context: SfccIntegrationContext, cartId: string, shipmentId: string, address: Checkout.ShopperOrders.OrderAddress): Promise<Cart> {
    const cartResponse = await this.api.putBasketsByIDShipmentsByIDShippingAddress(cartId, shipmentId, mapToOcapiAddress(address));

    return mapOcapiCart(context, cartResponse);
  }

  async setBillingAddress(context: SfccIntegrationContext, cartId: string, address: Checkout.ShopperOrders.OrderAddress): Promise<Cart> {
    const cartResponse = await this.api.putBasketsByIDBillingAddress(cartId, {
      body: mapToOcapiAddress(address)
    });

    return mapOcapiCart(context, cartResponse);
  }

  async selectShippingMethod(context: SfccIntegrationContext, cartId: string, shipmentId: string, shippingMethodId: string): Promise<Cart> {
    const cartResponse = await this.api.putBasketsByIDShipmentsByIDShippingMethod(cartId, shipmentId, {
      id: shippingMethodId
    });

    return mapOcapiCart(context, cartResponse);
  }

  async addPayment(context: SfccIntegrationContext, cartId: string, paymentMethodId: string, amount: number): Promise<Cart> {
    await this.api.getBasketsByIDPaymentMethods(cartId);

    const cartResponse = await this.api.postBasketsByIDPaymentInstruments(cartId, {
      amount,
      payment_method_id: paymentMethodId // eslint-disable-line camelcase
    });

    return mapOcapiCart(context, cartResponse);
  }
}

export class CapiCartsApi implements CartsApi {
  protected config: ClientConfig;
  protected api: Checkout.ShopperBaskets;

  constructor(config: ClientConfig) {
    this.config = config;
    this.api = new Checkout.ShopperBaskets(config);
  }

  protected async getCart(context: SfccIntegrationContext, cartId: string): Promise<Cart> {
    const cartResponse = await this.api.getBasket({
      parameters: {
        basketId: cartId
      }
    });

    return mapCart(context, cartResponse);
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

  async getShippingMethods(cartId: string, shipmentId: string): Promise<Checkout.ShopperBaskets.ShippingMethodResult> {
    return await this.api.getShippingMethodsForShipment({
      parameters: {
        shipmentId,
        basketId: cartId
      }
    });
  }

  async getPaymentMethods(cartId: string): Promise<Checkout.ShopperBaskets.PaymentMethodResult> {
    return await this.api.getPaymentMethodsForBasket({
      parameters: {
        basketId: cartId
      }
    });
  }

  async updateCartContactInfo(context: SfccIntegrationContext, cartId: string, contactInfo: ContactInfo): Promise<Cart> {
    const cartResponse = await this.api.updateCustomerForBasket({
      parameters: {
        basketId: cartId
      },
      body: contactInfo
    });

    return mapCart(context, cartResponse);
  }

  async setShippingAddress(context: SfccIntegrationContext, cartId: string, shipmentId: string, address: Checkout.ShopperOrders.OrderAddress): Promise<Cart> {
    const cartResponse = await this.api.updateShippingAddressForShipment({
      parameters: {
        shipmentId,
        basketId: cartId
      },
      body: address
    });

    return mapCart(context, cartResponse);
  }

  async setBillingAddress(context: SfccIntegrationContext, cartId: string, address: Checkout.ShopperOrders.OrderAddress): Promise<Cart> {
    const cartResponse = await this.api.updateBillingAddressForBasket({
      parameters: {
        basketId: cartId
      },
      body: address
    });

    return mapCart(context, cartResponse);
  }

  async selectShippingMethod(context: SfccIntegrationContext, cartId: string, shipmentId: string, shippingMethodId: string): Promise<Cart> {
    const cartResponse = await this.api.updateShippingMethodForShipment({
      parameters: {
        shipmentId,
        basketId: cartId
      },
      body: {
        id: shippingMethodId
      }
    });

    return mapCart(context, cartResponse);
  }

  async addPayment(context: SfccIntegrationContext, cartId: string, paymentMethodId: string, amount: number): Promise<Cart> {
    const cart = await this.getCart(context, cartId);

    for (const paymentInstrument of cart.paymentInstruments) {
      await this.api.removePaymentInstrumentFromBasket({
        parameters: {
          basketId: cartId,
          paymentInstrumentId: paymentInstrument.paymentInstrumentId
        }
      });
    }

    const cartResponse = await this.api.addPaymentInstrumentToBasket({
      parameters: {
        basketId: cartId
      },
      body: {
        amount,
        paymentMethodId
      }
    });

    return mapCart(context, cartResponse);
  }
}
