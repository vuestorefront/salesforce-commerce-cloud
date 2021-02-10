import { Endpoints } from '../../types';

import guestSignIn from './guestSignIn';
import refreshToken from './refreshToken';
import signIn from './signIn';
import getCustomer from './getCustomer';
import { getProduct, getProducts } from './getProduct';
import getWishlist from './getWishlist';
import addToWishlist from './addToWishlist';
import removeFromWishlist from './removeFromWishlist';
import getCategory from './getCategory';
import createCustomer from './createCustomer';
import updateCustomer from './updateCustomer';
import updateCustomerPassword from './updateCustomerPassword';
import searchProducts from './searchProducts';
import getCart from './getCart';
import resetCart from './resetCart';
import addToCart from './addToCart';
import removeFromCart from './removeFromCart';
import addCouponToCart from './addCouponToCart';
import removeCouponFromCart from './removeCouponFromCart';
import updateCartItem from './updateCartItem';
import saveShippingAddress from './saveShippingAddress';
import saveBillingAddress from './saveBillingAddress';
import saveShippingMethod from './saveShippingMethod';
import savePaymentInstrument from './savePaymentInstrument';
import createOrder from './createOrder';
import getCustomerOrders from './getCustomerOrders';
import getApplicablePaymentMethods from './getApplicablePaymentMethods';
import getApplicableShippingMethods from './getApplicableShippingMethods';

import { wrapAuthHandler } from './helpers/auth';

const endpoints = {
  guestSignIn,
  refreshToken,
  signIn,
  getCustomer,
  createCustomer,
  updateCustomer,
  updateCustomerPassword,
  searchProducts,
  getProduct,
  getProducts,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  getCategory,
  getCart,
  resetCart,
  addToCart,
  removeFromCart,
  addCouponToCart,
  removeCouponFromCart,
  updateCartItem,
  saveShippingAddress,
  saveBillingAddress,
  saveShippingMethod,
  savePaymentInstrument,
  createOrder,
  getCustomerOrders,
  getApplicablePaymentMethods,
  getApplicableShippingMethods,
}

export default wrapAuthHandler(endpoints) as Endpoints;
