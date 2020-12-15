import { Endpoints } from '../../types';

import guestSignIn from './guestSignIn';
import refreshToken from './refreshToken';
import getProduct from '../getProduct';
import getCategory from '../getCategory';

import { wrapAuthHandler } from './helpers/auth';

const endpoints = {
  guestSignIn,
  refreshToken,
  getProduct,
  getCategory,
}

export default wrapAuthHandler(endpoints) as Endpoints;
