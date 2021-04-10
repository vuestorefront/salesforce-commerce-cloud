import ShopApi from 'commercecloud-ocapi-client';
import { ClientConfig, Checkout } from 'commerce-sdk';

import { OrdersApi } from './interfaces';
import { Order, SfccIntegrationContext } from '../../types';
import { mapOrder } from '../mapping/shared/orderMapping';
import { mapOcapiOrder } from '../mapping/ocapi/ocapiOrderMapping';

export class OcapiOrdersApi implements OrdersApi {
  protected config: ShopApi.ApiConfig;
  protected api: ShopApi.OrdersApi;

  constructor(config: ShopApi.ApiConfig) {
    this.config = config;
    this.api = new ShopApi.OrdersApi();
  }

  async createOrder(context: SfccIntegrationContext, cartId: string): Promise<Order> {
    const orderResponse = await this.api.postOrders({
      basket_id: cartId // eslint-disable-line camelcase
    });

    return mapOcapiOrder(context, orderResponse);
  }

  async authorizePayments(context: SfccIntegrationContext, order: Order): Promise<Order> {
    let authorizedOrder: ShopApi.Order;

    for (const paymentInstrument of order.paymentInstruments) {
      authorizedOrder = await this.api.patchOrdersByIDPaymentInstrumentsByID(
        order.orderNo,
        paymentInstrument.paymentInstrumentId,
        {
          amount: paymentInstrument.amount,
          payment_method_id: paymentInstrument.paymentMethodId // eslint-disable-line camelcase
        }
      );
    }

    if (authorizedOrder) {
      return mapOcapiOrder(context, authorizedOrder);
    }

    return order;
  }
}

export class CapiOrdersApi implements OrdersApi {
  protected config: ClientConfig;
  protected api: Checkout.ShopperOrders;

  constructor(config: ClientConfig) {
    this.config = config;
    this.api = new Checkout.ShopperOrders(config);
  }

  async createOrder(context: SfccIntegrationContext, cartId: string): Promise<Order> {
    const orderResponse = await this.api.createOrder({
      body: {
        basketId: cartId
      }
    });

    return mapOrder(context, orderResponse);
  }

  async authorizePayments(context: SfccIntegrationContext, order: Order): Promise<Order> {
    let authorizedOrder: Order;

    for (const paymentInstrument of order.paymentInstruments) {
      authorizedOrder = await this.api.updatePaymentInstrumentForOrder({
        parameters: {
          orderNo: order.orderNo,
          paymentInstrumentId: paymentInstrument.paymentInstrumentId
        },
        body: {
          amount: paymentInstrument.amount,
          paymentMethodId: paymentInstrument.paymentMethodId
        }
      });
    }

    return mapOrder(context, authorizedOrder || order);
  }
}
