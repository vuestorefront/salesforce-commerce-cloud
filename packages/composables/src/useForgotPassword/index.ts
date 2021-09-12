import useUser from '../useUser';
import { Context } from '@vue-storefront/sfcc-api';
import { useForgotPasswordFactory, UseForgotPasswordFactoryParams } from '@vue-storefront/core';

const factoryParams: UseForgotPasswordFactoryParams<boolean> = {
  resetPassword: async (context: Context, { email }) => {
    try {
      await context.$sfcc.api.forgotPasswordTriggerReset(email);
    } catch (e) {
      return false;
    }

    return true;
  },

  setNewPassword: async (context: Context, { tokenValue, newPassword }) => {
    const { user } = useUser();

    try {
      await context.$sfcc.api.forgotPasswordReset(user.value.login, tokenValue, newPassword);
    } catch (e) {
      return false;
    }

    return true;
  }
};

export default useForgotPasswordFactory<boolean>(factoryParams);
