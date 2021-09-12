import ShopApi from 'commercecloud-ocapi-client';
import { Customer, ClientConfig } from 'commerce-sdk';

import { elevated } from '../decorators';
import { ApiClientSettings } from '../../types';
import { CustomersPasswordResetApi } from './interfaces';

export class OcapiCustomersPasswordResetApi implements CustomersPasswordResetApi {
  protected settings: ApiClientSettings;
  protected config: ShopApi.ApiConfig;
  protected api: ShopApi.CustomersApi;

  constructor(settings: ApiClientSettings, config: ShopApi.ApiConfig) {
    this.config = config;
    this.settings = settings;
    this.api = new ShopApi.CustomersApi();
  }

  @elevated()
  async triggerPasswordReset(login: string, type: 'email' | 'login'): Promise<void> {
    return this.api.postCustomersPasswordReset({
      type,
      identification: login
    });
  }

  @elevated()
  async createPasswordResetToken(login: string): Promise<string> {
    const result = await this.api.postCustomersPasswordActionsCreateResetToken({
      login
    });

    return result.reset_token;
  }

  @elevated()
  async resetPassword(login: string, resetToken: string, newPassword: string): Promise<void> {
    return this.api.postCustomersPasswordActionsReset({
      login,
      /* eslint-disable camelcase */
      reset_token: resetToken,
      new_password: newPassword
      /* eslint-enable camelcase */
    });
  }
}

export class CapiCustomersPasswordResetApi implements CustomersPasswordResetApi {
  protected settings: ApiClientSettings;
  protected config: ClientConfig;
  protected api: Customer.ShopperCustomers;

  constructor(settings: ApiClientSettings, config: ClientConfig) {
    this.config = config;
    this.settings = settings;
    this.api = new Customer.ShopperCustomers(config);
  }

  async triggerPasswordReset(): Promise<void> {
    throw {
      status: 400,
      title: 'Unsupported Operation',
      type: 'https://api.commercecloud.salesforce.com/documentation/error/v1/errors/unsupported-operation',
      detail: 'Internal password reset is not supported by the Commerce API. ' +
        'Consider providing an external email send procedure, or using OCAPI. ' +
        'For more details: https://docs.vuestorefront.io/sfcc/sfcc/composables/use-forgot-password.html'
    };
  }

  @elevated(['sfcc.shopper-customers.login'])
  async createPasswordResetToken(email: string): Promise<string> {
    const result = await this.api.getResetPasswordToken({
      body: {
        login: email
      }
    });

    return result.resetToken;
  }

  @elevated(['sfcc.shopper-customers.login'])
  async resetPassword(login: string, resetToken: string, newPassword: string): Promise<void> {
    return this.api.resetPassword({
      body: {
        login,
        newPassword,
        resetToken
      }
    });
  }
}
