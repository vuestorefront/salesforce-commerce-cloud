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

  protected getCustomerId(registeredOnly?: boolean) {
    return getCustomerIdFromToken(this.config.oauth2AccessToken, registeredOnly);
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
    const customerId = this.getCustomerId(true);
    const customer = customerId && await this.api.getCustomersByID(customerId, {
      expand: ['addresses', 'paymentinstruments']
    });

    return customer && mapOcapiCustomer(customer);
  }

  async createCustomer(email: string, password: string, firstName: string, lastName: string): Promise<ApiCustomer> {
    const customer = await this.api.postCustomers({
      password,
      customer: {
        enabled: true,
        email: email,
        login: email,
        first_name: firstName, // eslint-disable-line camelcase
        last_name: lastName // eslint-disable-line camelcase
      }
    });

    return mapOcapiCustomer(customer);
  }

  async updateCustomer(email: string, firstName: string, lastName: string): Promise<ApiCustomer> {
    const customerId = this.getCustomerId(true);
    const customer = customerId && await this.api.patchCustomersByID(
      customerId,
      {
        email,
        login: email,
        first_name: firstName, // eslint-disable-line camelcase
        last_name: lastName // eslint-disable-line camelcase
      }
    );

    return customer && mapOcapiCustomer(customer);
  }

  async updateCustomerPassword(currentPassword: string, newPassword: string): Promise<ApiCustomer> {
    const customerId = this.getCustomerId(true);
    const customer = customerId && await this.api.putCustomersByIDPassword(
      customerId,
      {
        current_password: currentPassword, // eslint-disable-line camelcase
        password: newPassword
      }
    );

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

  protected getCustomerId(registeredOnly?: boolean) {
    const token = getTokenFromAuthHeader(this.config.headers.authorization);
    const customerId = token && getCustomerIdFromToken(token, registeredOnly);

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
    const customerId = this.getCustomerId(true);
    const customer = customerId && await this.api.getCustomer({
      parameters: {
        customerId: customerId
      }
    });

    return customer;
  }

  async createCustomer(email: string, password: string, firstName: string, lastName: string): Promise<ApiCustomer> {
    const customer = await this.api.registerCustomer({
      body: {
        password,
        customer: {
          enabled: true,
          login: email,
          email,
          firstName,
          lastName
        }
      }
    });

    return customer;
  }

  async updateCustomer(email: string, firstName: string, lastName: string): Promise<ApiCustomer> {
    const customerId = this.getCustomerId(true);

    return customerId && await this.api.updateCustomer({
      parameters: {
        customerId
      },
      body: {
        email,
        login: email,
        firstName,
        lastName
      }
    });
  }

  async updateCustomerPassword(currentPassword: string, newPassword: string): Promise<ApiCustomer> {
    const customerId = this.getCustomerId(true);

    if (customerId) {
      await this.api.updateCustomerPassword({
        body: {
          currentPassword,
          password: newPassword
        }
      });

      return this.getCustomer();
    }

    return null;
  }
}
