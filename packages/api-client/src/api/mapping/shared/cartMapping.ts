import { Checkout } from 'commerce-sdk';
import { getProducts } from '../../endpoints/getProduct';
import { Cart, CartItem, LineItem, Product, SfccIntegrationContext } from '../../../types';

const mapLineItem = (item: Checkout.ShopperBaskets.ProductItem, product: Product): LineItem => ({
  ...product,
  itemId: item.itemId,
  quantity: item.quantity,
  price: {
    current: item.price,
    original: item.priceAfterItemDiscount !== item.price ? item.priceAfterItemDiscount : null
  }
});

export const getRepresentedProduct = (item: CartItem, products: Product[]): Product => products.find((p) => p._id === item.productId);

export const mapCart = async (context: SfccIntegrationContext, cart: Checkout.ShopperBaskets.Basket): Promise<Cart> => {
  if (cart.productItems) {
    const productIds = Array.from(new Set(cart.productItems.map((item) => item.productId)));
    const products = await getProducts(context, productIds);

    cart.lineItems = cart.productItems.map((item) => mapLineItem(item, getRepresentedProduct(item, products)));
  }

  return cart;
};
