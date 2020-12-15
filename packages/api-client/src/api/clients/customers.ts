import ShopApi from 'commercecloud-ocapi-client';
import { Customer, ClientConfig } from 'commerce-sdk';

import { CustomersApi } from './interfaces';
import { getTokenFromAuthHeader } from '../helpers/jwt';

export class OcapiCustomersApi implements CustomersApi {
  protected config: ShopApi.ApiConfig;
  protected api: ShopApi.CustomersApi;

  constructor(config: ShopApi.ApiConfig) {
    this.config = config;
    this.api = new ShopApi.CustomersApi();
  }

  async guestSignIn(): Promise<string> {
    const result = await this.api.postCustomersAuthWithHttpInfo({
      type: ShopApi.AuthRequest.TypeEnum.guest
    });

    return getTokenFromAuthHeader(result.response.headers.authorization);
  }

  async refreshToken(): Promise<string> {
    const result = await this.api.postCustomersAuthWithHttpInfo({
      type: ShopApi.AuthRequest.TypeEnum.refresh
    }, {
      authorization: `Bearer ${this.config.oauth2AccessToken}`
    });

    return getTokenFromAuthHeader(result.response.headers.authorization);
  }
}

export class CapiCustomersApi implements CustomersApi {
  protected api: Customer.ShopperCustomers;

  constructor(config: ClientConfig) {
    this.api = new Customer.ShopperCustomers(config);
  }

  async guestSignIn(): Promise<string> {
    const response: Response = await this.api.authorizeCustomer<true>({
      body: {
        type: ShopApi.AuthRequest.TypeEnum.guest
      }
    }, true);

    return getTokenFromAuthHeader(response.headers.get('authorization'));
  }

  async refreshToken(): Promise<string> {
    const response: Response = await this.api.authorizeCustomer<true>({
      body: {
        type: ShopApi.AuthRequest.TypeEnum.refresh
      }
    }, true);

    return getTokenFromAuthHeader(response.headers.get('authorization'));
  }
}
