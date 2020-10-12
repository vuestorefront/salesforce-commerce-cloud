import ShopApi from 'commercecloud-ocapi-client';
import { Customer, ClientConfig } from 'commerce-sdk';
import { getObjectFromResponse } from '@commerce-apps/core';

import { CustomersApi } from './interfaces';
import { Customer as ApiCustomer } from '../../types';
import { mapOcapiCustomer } from '../mapping/ocapi/ocapiCustomerMapping';
import { getCustomerIdFromToken, getTokenFromAuthHeader } from '../helpers/jwt';

export class OcapiCustomersApi implements CustomersApi {
  protected config: ShopApi.ApiConfig;
  protected api: ShopApi.CustomersApi;

  constructor(config: ShopApi.ApiConfig) {
    this.config = config;
    this.api = new ShopApi.CustomersApi();
  }

  protected getCustomerId() {
    return getCustomerIdFromToken(this.config.oauth2AccessToken);
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

  async signIn(username: string, password: string): Promise<{ customer: ApiCustomer, token: string }> {
    const authStr = `${username}:${password}`;
    const encodedAuthStr = Buffer.from(authStr).toString('base64');

    const result = await this.api.postCustomersAuthWithHttpInfo(
      { type: ShopApi.AuthRequest.TypeEnum.credentials },
      { authorization: `Basic ${encodedAuthStr}` }
    );

    const customer = mapOcapiCustomer(result.data);
    const token = getTokenFromAuthHeader(result.response.headers.authorization);

    return { customer, token };
  }

  async getCustomer(): Promise<ApiCustomer> {
    const customerId = this.getCustomerId();
    const customer = customerId && await this.api.getCustomersByID(customerId, {
      expand: ['addresses', 'paymentinstruments']
    });

    return customer && mapOcapiCustomer(customer);
  }
}

export class CapiCustomersApi implements CustomersApi {
  protected config: ClientConfig;
  protected api: Customer.ShopperCustomers;

  constructor(config: ClientConfig) {
    this.config = config;
    this.api = new Customer.ShopperCustomers(config);
  }

  protected getCustomerId() {
    const token = getTokenFromAuthHeader(this.config.headers.authorization);
    const customerId = token && getCustomerIdFromToken(token);

    return customerId;
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

  async signIn(username: string, password: string): Promise<{ customer: ApiCustomer, token: string }> {
    const authStr = `${username}:${password}`;
    const encodedAuthStr = Buffer.from(authStr).toString('base64');

    const response: Response = await this.api.authorizeCustomer<true>({
      body: {
        type: ShopApi.AuthRequest.TypeEnum.credentials
      },
      headers: {
        authorization: `Basic ${encodedAuthStr}`
      }
    }, true);

    const customer = getObjectFromResponse(response);
    const token = getTokenFromAuthHeader(response.headers.get('authorization'));

    return { customer, token };
  }

  async getCustomer(): Promise<ApiCustomer> {
    const customerId = this.getCustomerId();
    const customer = customerId && await this.api.getCustomer({
      parameters: {
        customerId: customerId
      }
    });

    return customer;
  }
}
