import { useCartFactory, UseCart, UseCartFactoryParams } from '@vue-storefront/core';
import { Context, Cart, LineItem, Product, CouponItem } from '@vue-storefront/sfcc-api';

const params: UseCartFactoryParams<Cart, LineItem, Product, CouponItem> = {
  load: async (context: Context) => context.$sfcc.api.getCart(),

  addItem: async (context: Context, { currentCart, product, quantity }) => context.$sfcc.api.addToCart(currentCart.basketId, product, quantity),

  removeItem: async (context: Context, { currentCart, product }) => context.$sfcc.api.removeFromCart(currentCart.basketId, product),

  updateItemQty: async (context: Context, { currentCart, product, quantity }) => context.$sfcc.api.updateCartItem(currentCart.basketId, product, quantity),

  clear: async (context: Context, { currentCart }) => context.$sfcc.api.resetCart(currentCart.basketId),

  applyCoupon: async (context: Context, { currentCart, couponCode }) => {
    const updatedCart = await context.$sfcc.api.addCouponToCart(currentCart.basketId, couponCode);
    const updatedCoupon = updatedCart.couponItems.find((item) => item.code === couponCode);

    return { updatedCart, updatedCoupon };
  },

  removeCoupon: async (context: Context, { currentCart, couponCode }) => {
    const coupon = currentCart.couponItems.find((item) => item.code === couponCode);
    const updatedCart = await context.$sfcc.api.removeCouponFromCart(currentCart.basketId, coupon.couponItemId);

    return { updatedCart };
  },

  isInCart: (_: Context, { currentCart, product }) => Boolean((currentCart.productItems || []).find((item) => item.productId === product._id))
};

export type UseCartComposable = UseCart<Cart, LineItem, Product, CouponItem>;

export default useCartFactory<Cart, LineItem, Product, CouponItem>(params);
