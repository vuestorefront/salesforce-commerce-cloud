import {
  Cart,
  Order,
  LineItem,
  Customer,
  CustomerAddress,
  Category,
  Product,
  ProductSearchParams,
  ProductSearchResponse,
  Wishlist,
  ContactInfo,
  OrderAddress,
  OrderSearchParams,
  SfccIntegrationContext
} from '../../types';

import { Checkout } from 'commerce-sdk';

export type TokensResponse = {
  capiToken?: string;
  ocapiToken?: string;
}

export interface CustomersApi {
  guestSignIn(): Promise<TokensResponse>;
  refreshToken(): Promise<TokensResponse>;
  signIn(username: string, password: string): Promise<{ customer: Customer } & TokensResponse>;
  getCustomer(): Promise<Customer>;
  getAddresses(): Promise<CustomerAddress[]>;
  createAddress(address: CustomerAddress): Promise<CustomerAddress>;
  updateAddress(address: CustomerAddress): Promise<CustomerAddress>;
  deleteAddress(address: CustomerAddress): Promise<void>;
  createCustomer(email: string, password: string, firstName: string, lastName: string): Promise<Customer>;
  updateCustomer(email: string, firstName: string, lastName: string): Promise<Customer>;
  updateCustomerPassword(currentPassword: string, newPassword: string): Promise<Customer>;
  getCarts(context: SfccIntegrationContext): Promise<Cart[]>;
  getOrders(context: SfccIntegrationContext, params: OrderSearchParams): Promise<Order[]>;
}

export interface CategoriesApi {
  getCategory(id: string, levels?: number, locale?: string): Promise<Category>;
}

export interface ProductSearchApi {
  searchProducts(params: ProductSearchParams, locale?: string, currency?: string): Promise<ProductSearchResponse>;
}

export interface ProductsApi {
  getProduct(id: string, viewType?: string, locale?: string, currency?: string): Promise<Product>;
  getProducts(ids: string[], viewType?: string, locale?: string, currency?: string): Promise<Product[]>;
}

export interface WishlistsApi {
  getWishlist(context: SfccIntegrationContext): Promise<Wishlist>;
  createWishlist(context: SfccIntegrationContext): Promise<Wishlist>;
  addToWishlist(context: SfccIntegrationContext, listId: string, productId: string): Promise<Wishlist>;
  removeFromWishlist(context: SfccIntegrationContext, listId: string, itemId: string): Promise<Wishlist>;
}

export interface CartsApi {
  createCart(context: SfccIntegrationContext): Promise<Cart>;
  addItemToCart(context: SfccIntegrationContext, cartId: string, product: Product, quantitiy?: number): Promise<Cart>;
  removeItemFromCart(context: SfccIntegrationContext, cartId: string, itemId: string): Promise<Cart>;
  updateCartItemQuantity(context: SfccIntegrationContext, cartId: string, item: LineItem, quantity: number): Promise<Cart>;
  addCouponToCart(context: SfccIntegrationContext, cartId: string, couponCode: string): Promise<Cart>;
  removeCouponFromCart(context: SfccIntegrationContext, cartId: string, couponItemId: string): Promise<Cart>;
  resetCart(context: SfccIntegrationContext, cartId: string): Promise<Cart>;
  getShippingMethods(cartId: string, shipmentId: string): Promise<Checkout.ShopperBaskets.ShippingMethodResult>;
  getPaymentMethods(cartId: string): Promise<Checkout.ShopperBaskets.PaymentMethodResult>;
  updateCartContactInfo(context: SfccIntegrationContext, cartId: string, contactInfo: ContactInfo): Promise<Cart>;
  setShippingAddress(context: SfccIntegrationContext, cartId: string, shipmentId: string, address: OrderAddress): Promise<Cart>;
  setBillingAddress(context: SfccIntegrationContext, cartId: string, address: OrderAddress): Promise<Cart>;
  selectShippingMethod(context: SfccIntegrationContext, cartId: string, shipmentId: string, shippingMethodId: string): Promise<Cart>;
  addPayment(context: SfccIntegrationContext, cartId: string, paymentMethodId: string, amount: number, body: any): Promise<Cart>;
}

export interface OrdersApi {
  createOrder(context: SfccIntegrationContext, cartId: string): Promise<Order>;
  authorizePayments(context: SfccIntegrationContext, order: Order): Promise<Order>;
}
