import {
  Cart,
  LineItem,
  Customer,
  Category,
  Product,
  ProductSearchParams,
  ProductSearchResponse,
  SfccIntegrationContext
} from '../../types';

export interface CustomersApi {
  guestSignIn(): Promise<string>;
  refreshToken(): Promise<string>;
  signIn(username: string, password: string): Promise<{ customer: Customer, token: string }>;
  getCustomer(): Promise<Customer>;
  createCustomer(email: string, password: string, firstName: string, lastName: string): Promise<Customer>;
  updateCustomer(email: string, firstName: string, lastName: string): Promise<Customer>;
  updateCustomerPassword(currentPassword: string, newPassword: string): Promise<Customer>;
  getCarts(context: SfccIntegrationContext): Promise<Cart[]>;
}

export interface CategoriesApi {
  getCategory(id: string, levels?: number, locale?: string): Promise<Category>;
}

export interface ProductSearchApi {
  searchProducts(params: ProductSearchParams, locale?: string): Promise<ProductSearchResponse>;
}

export interface ProductsApi {
  getProduct(id: string, viewType?: string, locale?: string): Promise<Product>;
  getProducts(ids: string[], viewType?: string, locale?: string): Promise<Product[]>;
}

export interface CartsApi {
  createCart(context: SfccIntegrationContext): Promise<Cart>;
  addItemToCart(context: SfccIntegrationContext, cartId: string, product: Product, quantitiy?: number): Promise<Cart>;
  removeItemFromCart(context: SfccIntegrationContext, cartId: string, itemId: string): Promise<Cart>;
  updateCartItemQuantity(context: SfccIntegrationContext, cartId: string, item: LineItem, quantity: number): Promise<Cart>;
  addCouponToCart(context: SfccIntegrationContext, cartId: string, couponCode: string): Promise<Cart>;
  removeCouponFromCart(context: SfccIntegrationContext, cartId: string, couponItemId: string): Promise<Cart>;
  resetCart(context: SfccIntegrationContext, cartId: string): Promise<Cart>;
}
