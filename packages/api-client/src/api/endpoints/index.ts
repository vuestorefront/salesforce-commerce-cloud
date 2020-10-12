import { Endpoints } from '../../types';

import guestSignIn from './guestSignIn';
import refreshToken from './refreshToken';
import signIn from './signIn';
import getCustomer from './getCustomer';
import getProduct from '../getProduct';
import getCategory from '../getCategory';

import { wrapAuthHandler } from './helpers/auth';

const endpoints = {
  guestSignIn,
  refreshToken,
  signIn,
  getCustomer,
  getProduct,
  getCategory,
}

export default wrapAuthHandler(endpoints) as Endpoints;
