import ShopApi from 'commercecloud-ocapi-client';
import { Customer, ClientConfig } from 'commerce-sdk';
import { getObjectFromResponse } from '@commerce-apps/core';

import { CustomersApi } from './interfaces';
import { Cart, Customer as ApiCustomer, CustomerAddress, Order, OrderSearchParams, SfccIntegrationContext } from '../../types';
import { mapCart } from '../mapping/shared/cartMapping';
import { mapOrder } from '../mapping/shared/orderMapping';
import { mapOcapiCart } from '../mapping/ocapi/ocapiCartMapping';
import { mapOcapiOrder } from '../mapping/ocapi/ocapiOrderMapping';
import { getCustomerIdFromToken, getTokenFromAuthHeader } from '../helpers/jwt';
import {
  mapOcapiCustomer,
  mapOcapiCustomerAddress,
  mapToOcapiCustomerAddress
} from '../mapping/ocapi/ocapiCustomerMapping';

export class OcapiCustomersApi implements CustomersApi {
  protected config: ShopApi.ApiConfig;
  protected api: ShopApi.CustomersApi;
  protected customerId: string;

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

  async getAddresses(): Promise<CustomerAddress[]> {
    const customerId = this.getCustomerId(true);
    const listResponse = customerId && await this.api.getCustomersByIDAddresses(customerId, {
      start: 0,
      count: 200
    });

    if (listResponse && listResponse.data) {
      return listResponse.data.map(mapOcapiCustomerAddress);
    }

    return [];
  }

  async createAddress(address: CustomerAddress): Promise<CustomerAddress> {
    const customerId = this.getCustomerId(true);
    const addressResponse = customerId && await this.api.postCustomersByIDAddresses(
      customerId,
      mapToOcapiCustomerAddress(address)
    );

    if (addressResponse) {
      return mapOcapiCustomerAddress(addressResponse);
    }

    return null;
  }

  async updateAddress(address: CustomerAddress): Promise<CustomerAddress> {
    const customerId = this.getCustomerId(true);
    const addressResponse = customerId && await this.api.patchCustomersByIDAddressesByID(
      customerId,
      address.addressId,
      mapToOcapiCustomerAddress(address)
    );

    if (addressResponse) {
      return mapOcapiCustomerAddress(addressResponse);
    }

    return null;
  }

  async deleteAddress(address: CustomerAddress): Promise<void> {
    const customerId = this.getCustomerId(true);

    if (customerId) {
      await this.api.deleteCustomersByIDAddressesByID(
        customerId,
        address.addressId
      );
    }
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

  async getCarts(context: SfccIntegrationContext): Promise<Cart[]> {
    const customerId = this.getCustomerId();
    const cartsResponse = customerId && await this.api.getCustomersByIDBaskets(customerId);
    const mappedCarts = cartsResponse && cartsResponse.baskets.map(mapOcapiCart.bind(null, context));

    return await Promise.all(mappedCarts || []);
  }

  async getOrders(context: SfccIntegrationContext, params: OrderSearchParams): Promise<Order[]> {
    const customerId = this.getCustomerId(true);
    const ordersResponse = customerId && await this.api.getCustomersByIDOrders(customerId, {
      ...params,
      start: params.offset,
      count: params.limit
    });

    if (ordersResponse) {
      return await Promise.all(ordersResponse.data.map(mapOcapiOrder.bind(null, context)));
    }

    return [];
  }
}

export class CapiCustomersApi implements CustomersApi {
  protected config: ClientConfig;
  protected api: Customer.ShopperCustomers;
  protected customerId: string;

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

  async getAddresses(): Promise<CustomerAddress[]> {
    const customer = await this.getCustomer();

    if (customer) {
      return customer.addresses;
    }

    return [];
  }

  async createAddress(address: CustomerAddress): Promise<CustomerAddress> {
    const customerId = this.getCustomerId(true);

    return customerId && await this.api.createCustomerAddress({
      parameters: {
        customerId
      },
      body: address
    });
  }

  async updateAddress(address: CustomerAddress): Promise<CustomerAddress> {
    const customerId = this.getCustomerId(true);

    return customerId && await this.api.updateCustomerAddress({
      parameters: {
        customerId,
        addressName: address.addressId
      },
      body: address
    });
  }

  async deleteAddress(address: CustomerAddress): Promise<void> {
    const customerId = this.getCustomerId(true);

    if (customerId) {
      await this.api.removeCustomerAddress({
        parameters: {
          customerId,
          addressName: address.addressId
        }
      });
    }
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

  async getCarts(context: SfccIntegrationContext): Promise<Cart[]> {
    const customerId = this.getCustomerId();
    const cartsResponse = customerId && await this.api.getCustomerBaskets({
      parameters: {
        customerId
      }
    });
    const mappedCarts = cartsResponse && cartsResponse.baskets.map(mapCart.bind(null, context));

    return await Promise.all(mappedCarts || []) as Cart[];
  }

  async getOrders(context: SfccIntegrationContext, params: OrderSearchParams): Promise<Order[]> {
    const customerId = this.getCustomerId(true);
    const ordersResponse = customerId && await this.api.getCustomerOrders({
      parameters: {
        ...params,
        customerId
      }
    });

    if (ordersResponse) {
      return ordersResponse.data.map(mapOrder.bind(null, context));
    }

    return [];
  }
}
