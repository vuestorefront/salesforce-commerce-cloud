import { Endpoints } from '../../types';

import guestSignIn from './guestSignIn';
import refreshToken from './refreshToken';
import signIn from './signIn';
import getCustomer from './getCustomer';
import { getProduct, getProducts } from './getProduct';
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
  getCategory,
  getCart,
  resetCart,
  addToCart,
  removeFromCart,
  addCouponToCart,
  removeCouponFromCart,
  updateCartItem,
}

export default wrapAuthHandler(endpoints) as Endpoints;
