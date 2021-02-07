declare module 'commercecloud-ocapi-client' {
  export type BasketCreationOptions = {
    body?: Basket;
  };

  export class BasketsApi {
    constructor();
    getBasketsByID(basketId: string): Promise<Basket>;
    deleteBasketsByID(basketId: string): Promise<void>;
    postBaskets(opts?: BasketCreationOptions): Promise<Basket>;
    postBasketsByIDItems(basketId: string, body: ProductItem[]): Promise<Basket>;
    postBasketsByIDCoupons(basketId: string, body: CouponItem): Promise<Basket>;
    deleteBasketsByIDCouponsByID(basketId: string, couponItemId: string): Promise<Basket>;
    deleteBasketsByIDItemsByID(basketId: string, itemId: string): Promise<Basket>;
    patchBasketsByIDItemsByID(basketId: string, itemId: string, body: ProductItem): Promise<Basket>;
  }
}
