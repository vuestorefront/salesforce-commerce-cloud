import { SfccIntegrationContext } from '../../../types';

export default async function forgotPasswordReset(
  context: SfccIntegrationContext,
  login: string,
  resetToken: string,
  newPassword: string
): Promise<void> {
  if (context.config.overrides && context.config.overrides.forgotPasswordReset) {
    return context.config.overrides.forgotPasswordReset(context, login, resetToken, newPassword);
  }

  return context.client.CustomersPasswordResetApi.resetPassword(login, resetToken, newPassword);
}
