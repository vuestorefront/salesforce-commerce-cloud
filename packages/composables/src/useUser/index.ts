/* istanbul ignore file */

import {
  useUserFactory,
  UseUserFactoryParams
} from '@vue-storefront/core';
import { Context, Customer } from '@vue-storefront/sfcc-api';

const params: UseUserFactoryParams<Customer, any, any> = {
  load: async (context: Context): Promise<Customer> => context.$sfcc.api.getCustomer(),

  logOut: async (context: Context): Promise<void> => context.$sfcc.api.guestSignIn(),

  updateUser: async (context: Context, { updatedUserData }): Promise<Customer> => context.$sfcc.api.updateCustomer(updatedUserData.email, updatedUserData.firstName, updatedUserData.lastName),

  register: async (context: Context, {email, password, firstName, lastName}): Promise<Customer> => context.$sfcc.api.createCustomer(email, password, firstName, lastName),

  logIn: async (context: Context, { username, password }): Promise<Customer> => context.$sfcc.api.signIn(username, password),

  changePassword: async (context: Context, { currentPassword, newPassword }) => context.$sfcc.api.updateCustomerPassword(currentPassword, newPassword)
};

export default useUserFactory<Customer, any, any>(params);
