/* istanbul ignore file */

import {
  useUserFactory,
  UseUserFactoryParams
} from '@vue-storefront/core';
import { Context, Customer } from '@vue-storefront/sfcc-api';

// @todo useUser

const params: UseUserFactoryParams<Customer, any, any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context) => {
    console.log('Mocked: loadUser');
    return { customerNo: null, lastName: null };
  },

  logOut: async (context: Context): Promise<void> => context.$sfcc.api.guestSignIn(),

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateUser: async (context: Context, { currentUser, updatedUserData }) => {
    console.log('Mocked: updateUser');
    return { customerNo: null, lastName: null };
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register: async (context: Context, { email, password, firstName, lastName }) => {
    console.log('Mocked: register');
    return { customerNo: null, lastName: null };
  },

  logIn: async (context: Context, { username, password }): Promise<Customer> => context.$sfcc.api.signIn(username, password),

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changePassword: async (context: Context, { currentUser, currentPassword, newPassword }) => {
    console.log('Mocked: changePassword');
    return { customerNo: null, lastName: null };
  }
};

export default useUserFactory<Customer, any, any>(params);
