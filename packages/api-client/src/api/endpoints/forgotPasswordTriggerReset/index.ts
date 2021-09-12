import { Logger } from '@vue-storefront/core';
import { SfccIntegrationContext } from '../../../types';

export default async function forgotPasswordTriggerReset(context: SfccIntegrationContext, login: string): Promise<void> {
  if (context.config.overrides && context.config.overrides.forgotPasswordTriggerReset) {
    return context.config.overrides.forgotPasswordTriggerReset(context, login);
  }

  const {
    loginType = 'email',
    passwordResetLogToken = false,
    passwordResetType = 'internal',
    passwordResetDeliverToken
  } = context.config.customer;

  if (passwordResetType === 'internal') {
    return context.client.CustomersPasswordResetApi.triggerPasswordReset(login, loginType);
  }

  if (passwordResetType === 'external') {
    if (!passwordResetDeliverToken) {
      throw new Error('[SFCC][error] No mail send function provided for password reset token');
    }

    const token = await context.client.CustomersPasswordResetApi.createPasswordResetToken(login);

    if (passwordResetLogToken) {
      Logger.debug(`[SFCC][debug] Password reset token: ${token}`);
    }

    return await passwordResetDeliverToken({ login, token });
  }

  throw new Error(`[SFCC][error] Invalid password reset type ${passwordResetType}`);
}
