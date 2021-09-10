/* istanbul ignore file */

import { UserOrderGetters, AgnosticOrderStatus } from '@vue-storefront/core';
import { Order, CartItem, OrderSearchResult } from '@vue-storefront/sfcc-api';

export const getDate = (order: Order): string => (order && order.creationDate) || '';

export const getId = (order: Order): string => (order && order.orderNo) || '';

export const getStatus = (order: Order): AgnosticOrderStatus => {
  switch (order.status) {
    case 'failed':
    case 'cancelled':
      return AgnosticOrderStatus.Cancelled;

    case 'created':
      return AgnosticOrderStatus.Open;

    case 'new':
    case 'open':
      if (order.shippingStatus === 'shipped') {
        return AgnosticOrderStatus.Shipped;
      }

      return AgnosticOrderStatus.Confirmed;

    case 'completed':
      return AgnosticOrderStatus.Complete;
  }

  return AgnosticOrderStatus.Pending;
};

export const getPrice = (order: Order): number | null => order && order.orderTotal;

export const getItems = (order: Order): CartItem[] => (order && order.productItems) || [];

export const getItemSku = (item: CartItem): string => (item && item.productId) || '';

export const getItemName = (item: CartItem): string => (item && item.productName) || '';

export const getItemQty = (item: CartItem): number => (item && item.quantity) || 0;

export const getItemPrice = (item: CartItem): number => (item && item.price) || 0;

export const getFormattedPrice = (price: number): string => price && String(price);

export const getOrdersTotal = ({ total }: OrderSearchResult): number => total;

const orderGetters: UserOrderGetters<Order, CartItem> = {
  getDate,
  getId,
  getStatus,
  getPrice,
  getItems,
  getItemSku,
  getItemName,
  getItemQty,
  getItemPrice,
  getFormattedPrice,
  getOrdersTotal
};

export default orderGetters;
