/* eslint-disable camelcase */

import axios from 'axios';
import { Customer } from 'commerce-sdk';
import { CustomersApi } from 'commercecloud-ocapi-client';

type AccessTokenResponse = {
  access_token: string;
}

const getToken = async (clientId: string, clientSecret: string, orgId = '', scopes: string[] = []) => {
  try {
    const body: { grant_type: string, scope?: string } = {
      grant_type: 'client_credentials'
    };

    if (orgId && scopes) {
      const tenant = orgId.replace('f_ecom_', '');

      body.scope = `SALESFORCE_COMMERCE_API:${tenant} ${scopes.join(' ')}`;
    }

    const response = await axios.post<AccessTokenResponse>(
      'https://account.demandware.com/dw/oauth2/access_token',
      Object.entries(body).map(([key, value]) => `${key}=${value}`).join('&'),
      {
        auth: {
          username: clientId,
          password: clientSecret
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    if (response.status === 200) {
      return response.data.access_token;
    }

    throw response;
  } catch (error) {
    if (error.response) {
      const { status, statusText, data } = error.response;

      throw {
        data,
        status,
        statusText
      };
    }

    throw {
      status: 500,
      data: error.message
    };
  }
};

export default function elevated(scopes: string[] = []) {
  return function elevatedDecorator(_: unknown, _0: unknown, descriptor: PropertyDescriptor): any {
    const originalMethod = descriptor.value;

    descriptor.value = async function value(...args: any[]) {
      if (this.settings && this.api) {
        if (this.api instanceof CustomersApi) {
          const token = await getToken(
            this.settings.ocapiClientId,
            this.settings.ocapiClientSecret
          );

          this.api.apiClient.authentications.oauth2_application.accessToken = token;
        }

        if (this.api instanceof Customer.ShopperCustomers) {

          const capiToken = await getToken(
            this.settings.capiClientId,
            this.settings.capiClientSecret,
            this.settings.organizationId,
            scopes
          );

          this.api.clientConfig.headers.authorization = `Basic ${capiToken}`;
        }

        return originalMethod.call(this, ...args);
      }
    };
  };
}
