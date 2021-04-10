declare module 'commercecloud-ocapi-client' {
  export type BasketCreationOptions = {
    body?: Basket;
  };

  export type PaymentMethodResult = {
    applicable_payment_methods: PaymentMethod[];
  };

  export type ShippingMethodResult = {
    default_shipping_method_id: string;
    applicable_shipping_methods: ShippingMethod[];
  };

  export type SetShippingAddressOptions = {
    useAsBilling?: boolean;
    customerAddressId?: string;
  }

  export type SetBillingAddressOptions = SetShippingAddressOptions & {
    body: OrderAddress;
  };

  export type SetShippingMethodBody = {
    id: string;
  };

  export type CreateOrderBody = {
    basket_id: string;
  };

  export type PatchOrderPaymentInstrumentOptions = {
    skipAuthorization?: boolean;
  };

  export class BasketsApi {
    constructor();
    getBasketsByID(basketId: string): Promise<Basket>;
    deleteBasketsByID(basketId: string): Promise<void>;
    postBaskets(opts?: BasketCreationOptions): Promise<Basket>;
    putBasketsByIDCustomer(basketId: string, body: CustomerInfo): Promise<Basket>
    postBasketsByIDItems(basketId: string, body: ProductItem[]): Promise<Basket>;
    postBasketsByIDCoupons(basketId: string, body: CouponItem): Promise<Basket>;
    deleteBasketsByIDCouponsByID(basketId: string, couponItemId: string): Promise<Basket>;
    deleteBasketsByIDItemsByID(basketId: string, itemId: string): Promise<Basket>;
    patchBasketsByIDItemsByID(basketId: string, itemId: string, body: ProductItem): Promise<Basket>;
    getBasketsByIDPaymentMethods(basketId: string): Promise<PaymentMethodResult>;
    postBasketsByIDPaymentInstruments(basketId: string, body: BasketPaymentInstrumentRequest): Promise<Basket>;
    putBasketsByIDBillingAddress(basketId: string, opts: SetBillingAddressOptions): Promise<Basket>;
    getBasketsByIDShipmentsByIDShippingMethods(basketId: string, shipmentId: string): Promise<ShippingMethodResult>;
    putBasketsByIDShipmentsByIDShippingMethod(basketId: string, shipmentId: string, body: SetShippingMethodBody): Promise<Basket>;
    putBasketsByIDShipmentsByIDShippingAddress(basketId: string, shipmentId: string, body: OrderAddress, opts?: SetShippingAddressOptions): Promise<Basket>;
  }

  export class OrdersApi {
    constructor();
    postOrders(body: CreateOrderBody): Promise<Order>;
    patchOrdersByIDPaymentInstrumentsByID(orderNo: string, paymentInstrumentId: string, body: OrderPaymentInstrumentRequest, opts?: PatchOrderPaymentInstrumentOptions): Promise<Order>;
  }
}
