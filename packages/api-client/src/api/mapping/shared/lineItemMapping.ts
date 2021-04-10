import { getProducts } from '../../endpoints/getProduct';
import { CartItem, LineItem, Product, SfccIntegrationContext } from '../../../types';

const mapLineItem = (item: CartItem, product: Product): LineItem => ({
  ...product,
  itemId: item.itemId,
  quantity: item.quantity,
  price: {
    current: item.price,
    original: item.priceAfterItemDiscount !== item.price ? item.priceAfterItemDiscount : null
  }
});

const getRepresentedProduct = (item: CartItem, products: Product[]): Product => products.find((p) => p._id === item.productId);

export const mapLineItems = async (context: SfccIntegrationContext, items: CartItem[]): Promise<LineItem[]> => {
  const productIds = Array.from(new Set(items.map((item) => item.productId)));
  const products = await getProducts(context, productIds);

  return items.map((item) => mapLineItem(item, getRepresentedProduct(item, products)));
};
