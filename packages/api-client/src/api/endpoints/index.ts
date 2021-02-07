import { Endpoints } from '../../types';

import guestSignIn from './guestSignIn';
import refreshToken from './refreshToken';
import signIn from './signIn';
import getCustomer from './getCustomer';
import getProduct from '../getProduct';
import getCategory from '../getCategory';
import createCustomer from './createCustomer';
import updateCustomer from './updateCustomer';
import updateCustomerPassword from './updateCustomerPassword';

import { wrapAuthHandler } from './helpers/auth';

const endpoints = {
  guestSignIn,
  refreshToken,
  signIn,
  getCustomer,
  createCustomer,
  updateCustomer,
  updateCustomerPassword,
  getProduct,
  getCategory,
}

export default wrapAuthHandler(endpoints) as Endpoints;
