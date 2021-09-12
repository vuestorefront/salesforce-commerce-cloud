import { ForgotPasswordGetters } from '@vue-storefront/core';

function getResetPasswordToken(): string {
  return '';
}

function isPasswordChanged(result: boolean): boolean {
  return result;
}

export default {
  getResetPasswordToken,
  isPasswordChanged
} as ForgotPasswordGetters<boolean>;
