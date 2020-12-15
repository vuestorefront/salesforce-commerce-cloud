/* eslint-disable no-use-before-define */

import { AxiosInstance } from 'axios';
import { CookieOptions } from 'express';
import { ApiInstance, IntegrationContext } from '@vue-storefront/core';
import * as Apis from './api/clients/interfaces';

export type Cart = Record<string, unknown>;
export type Wishlist = Record<string, unknown>;
export type ProductVariant = {
  _id: number;
  _description: string;
  _categoriesRef: string[];
  name: string;
  sku: string;
  images: string[];
  price: {
    original: number;
    current: number;
  };
  };
export type Category = {
  id: number;
  name: string;
  slug: string;
  items: Category[];
};
export type CategoryFilter = Record<string, unknown>;
export type ShippingMethod = Record<string, unknown>;
export type LineItem = Record<string, unknown>;

export type ApiClients = {
  CustomersApi: Apis.CustomersApi
}

export type SfccSetupConfig = IntegrationContext<ApiClients, ApiClientSettings>;

export type SfccIntegrationContext = IntegrationContext<ApiClients, ApiClientSettings, ContextualizedEndpoints>;

export type Endpoints = {
  guestSignIn(context: SfccIntegrationContext): Promise<void>;
  refreshToken(context: SfccIntegrationContext): Promise<void>;
};

export type ContextualizedEndpoints = {
  [T in keyof Endpoints]: Endpoints[T] extends (x: any, ...args: infer P) => infer R ? (...args: P) => R : never;
};

export interface ApiClientSettings {
  origin: string;
  clientId?: string;
  siteId: string;
  ocapiVersion: string;
  commerceApiVersion?: string;
  shortCode?: string;
  organizationId?: string;
  enableCommerceApi?: boolean;
  locale?: string;
  jwtToken?: string;
  cache?: boolean;
  timeout?: number;
  enableCookies?: boolean;
  overrideHttpPut?: boolean;
  defaultHeaders?: Record<string, string>;
  cookieNames?: {
    authToken?: string;
  },
  clientHeaders: {
    locale?: string;
  },
  callbacks?: {
    auth?: {
      onSessionTimeout?: (isGuest: boolean) => void;
      onTokenChange?: (token: string) => void;
    };
  };
  overrides?: Partial<Endpoints>;
}

export interface Context {
  $sfcc: SfccIntegrationContext;
}

export interface AppContext {
  $vsf: Context;
}

export interface SfccApiInstance extends ApiInstance {
  api: Endpoints,
  client: AxiosInstance,
  settings: ApiClientSettings
}
