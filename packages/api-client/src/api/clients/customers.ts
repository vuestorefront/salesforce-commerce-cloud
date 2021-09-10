import ShopApi from 'commercecloud-ocapi-client';
import { Customer, ClientConfig } from 'commerce-sdk';
import { getObjectFromResponse } from '@commerce-apps/core';

import { CustomersApi, TokensResponse } from './interfaces';
import { mapCart } from '../mapping/shared/cartMapping';
import { mapOrder } from '../mapping/shared/orderMapping';
import { mapOcapiCart } from '../mapping/ocapi/ocapiCartMapping';
import { mapOcapiOrder } from '../mapping/ocapi/ocapiOrderMapping';
import { getCustomerIdFromToken, getTokenFromAuthHeader } from '../helpers/jwt';
import {
  Cart,
  Customer as ApiCustomer,
  CustomerAddress,
  OrderSearchParams,
  OrderSearchResult,
  SfccIntegrationContext
} from '../../types';
import {
  mapOcapiCustomer,
  mapOcapiCustomerAddress,
  mapToOcapiCustomerAddress
} from '../mapping/ocapi/ocapiCustomerMapping';

class BaseCustomersApi {
  protected capiConfig: ClientConfig;
  protected ocapiConfig: ShopApi.ApiConfig;
  protected capiApi: Customer.ShopperCustomers;
  protected ocapiApi: ShopApi.CustomersApi;

  constructor(capiConfig: ClientConfig, ocapiConfig: ShopApi.ApiConfig) {
    this.capiConfig = capiConfig;
    this.ocapiConfig = ocapiConfig;
    this.capiApi = new Customer.ShopperCustomers(capiConfig);
    this.ocapiApi = new ShopApi.CustomersApi();
  }

  protected async capiGuestSignIn(): Promise<string> {
    const response: Response = await this.capiApi.authorizeCustomer<true>({
      body: {
        type: ShopApi.AuthRequest.TypeEnum.guest
      }
    }, true);

    return getTokenFromAuthHeader(response.headers.get('authorization'));
  }

  protected async capiRefreshToken(): Promise<string> {
    const response: Response = await this.capiApi.authorizeCustomer<true>({
      body: {
        type: ShopApi.AuthRequest.TypeEnum.refresh
      }
    }, true);

    return getTokenFromAuthHeader(response.headers.get('authorization'));
  }

  protected async capiSignIn(username: string, password: string): Promise<{ customer: ApiCustomer, token: string }> {
    const authStr = `${username}:${password}`;
    const encodedAuthStr = Buffer.from(authStr).toString('base64');

    const response: Response = await this.capiApi.authorizeCustomer<true>({
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

  protected async ocapiGuestSignIn(): Promise<string> {
    const result = await this.ocapiApi.postCustomersAuthWithHttpInfo({
      type: ShopApi.AuthRequest.TypeEnum.guest
    });

    return getTokenFromAuthHeader(result.response.headers.authorization);
  }

  protected async ocapiRefreshToken(): Promise<string> {
    const result = await this.ocapiApi.postCustomersAuthWithHttpInfo({
      type: ShopApi.AuthRequest.TypeEnum.refresh
    }, {
      authorization: `Bearer ${this.ocapiConfig.oauth2AccessToken}`
    });

    return getTokenFromAuthHeader(result.response.headers.authorization);
  }

  protected async ocapiSignIn(username: string, password: string): Promise<{ customer: ApiCustomer, token: string }> {
    const authStr = `${username}:${password}`;
    const encodedAuthStr = Buffer.from(authStr).toString('base64');

    const result = await this.ocapiApi.postCustomersAuthWithHttpInfo(
      { type: ShopApi.AuthRequest.TypeEnum.credentials },
      { authorization: `Basic ${encodedAuthStr}` }
    );

    const customer = mapOcapiCustomer(result.data);
    const token = getTokenFromAuthHeader(result.response.headers.authorization);

    return { customer, token };
  }

  async guestSignIn(): Promise<TokensResponse> {
    const capiToken = await this.capiGuestSignIn();
    const ocapiToken = await this.ocapiGuestSignIn();

    return {
      capiToken,
      ocapiToken
    };
  }

  async refreshToken(): Promise<TokensResponse> {
    const capiToken = await this.capiRefreshToken();
    const ocapiToken = await this.ocapiRefreshToken();

    return {
      capiToken,
      ocapiToken
    };
  }

  async signIn(username: string, password: string): Promise<{ customer: ApiCustomer } & TokensResponse> {
    const { customer, token: capiToken } = await this.capiSignIn(username, password);
    const { token: ocapiToken } = await this.ocapiSignIn(username, password);

    return {
      customer,
      capiToken,
      ocapiToken
    };
  }
}

export class OcapiCustomersApi extends BaseCustomersApi implements CustomersApi {
  protected config: ShopApi.ApiConfig;
  protected api: ShopApi.CustomersApi;
  protected customerId: string;

  constructor(capiConfig: ClientConfig, ocapiConfig: ShopApi.ApiConfig) {
    super(capiConfig, ocapiConfig);

    this.api = this.ocapiApi;
    this.config = this.ocapiConfig;
  }

  protected getCustomerId(registeredOnly?: boolean): string {
    return getCustomerIdFromToken(this.config.oauth2AccessToken, registeredOnly);
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

  async getOrders(context: SfccIntegrationContext, params: OrderSearchParams): Promise<OrderSearchResult> {
    const customerId = this.getCustomerId(true);
    const ordersResponse = customerId && await this.api.getCustomersByIDOrders(customerId, {
      ...params,
      start: params.offset,
      count: params.limit
    });

    if (ordersResponse) {
      const orders = await Promise.all(ordersResponse.data.map(mapOcapiOrder.bind(null, context)));

      return {
        results: orders,
        offset: params.offset,
        total: ordersResponse.total,
        count: orders.length
      };
    }

    return {
      results: [],
      offset: 0,
      total: 0,
      count: 0
    };
  }
}

export class CapiCustomersApi extends BaseCustomersApi implements CustomersApi {
  protected config: ClientConfig;
  protected api: Customer.ShopperCustomers;
  protected customerId: string;

  constructor(capiConfig: ClientConfig, ocapiConfig: ShopApi.ApiConfig) {
    super(capiConfig, ocapiConfig);

    this.config = this.capiConfig;
    this.api = this.capiApi;
  }

  protected getCustomerId(registeredOnly?: boolean): string {
    const token = getTokenFromAuthHeader(this.config.headers.authorization);
    const customerId = token && getCustomerIdFromToken(token, registeredOnly);

    return customerId;
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

  async getOrders(context: SfccIntegrationContext, params: OrderSearchParams): Promise<OrderSearchResult> {
    const customerId = this.getCustomerId(true);
    const ordersResponse = customerId && await this.api.getCustomerOrders({
      parameters: {
        ...params,
        customerId
      }
    });

    if (ordersResponse) {
      const orders = await Promise.all(ordersResponse.data.map(mapOrder.bind(null, context)));

      return {
        results: orders,
        offset: params.offset,
        total: ordersResponse.total,
        count: ordersResponse.data.length
      };
    }

    return {
      results: [],
      offset: 0,
      total: 0,
      count: 0
    };
  }
}
