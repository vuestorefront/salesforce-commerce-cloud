import ShopApi from 'commercecloud-ocapi-client';
import { ClientConfig, Customer } from 'commerce-sdk';

import { WishlistsApi } from './interfaces';
import { SfccIntegrationContext, Wishlist } from '../../types';
import { getCustomerIdFromToken } from '../helpers/jwt';
import { mapWishlist } from '../mapping/shared/wishlistMapping';
import { mapOcapiWishlist } from '../mapping/ocapi/ocapiWishlistMapping';

export class OcapiWishlistsApi implements WishlistsApi {
  protected config: ShopApi.ApiConfig;
  protected api: ShopApi.CustomersApi;
  protected customerId: string;

  constructor(config: ShopApi.ApiConfig) {
    this.config = config;
    this.api = new ShopApi.CustomersApi();
    this.customerId = this.config.oauth2AccessToken && getCustomerIdFromToken(this.config.oauth2AccessToken);
  }

  async getWishlist(context: SfccIntegrationContext): Promise<Wishlist> {
    const listResponse = this.customerId && await this.api.getCustomersByIDProductLists(this.customerId, {
      expand: ['availability', 'images', 'items', 'product'],
      count: 1,
      start: 0
    });

    return listResponse && listResponse.data[0] && await mapOcapiWishlist(context, listResponse.data[0]);
  }

  async createWishlist(context: SfccIntegrationContext): Promise<Wishlist> {
    const listResponse = this.customerId && await this.api.postCustomersByIDProductLists(this.customerId, {
      type: 'wish_list'
    });

    return listResponse && await mapOcapiWishlist(context, listResponse);
  }

  async addToWishlist(context: SfccIntegrationContext, listId: string, productId: string): Promise<Wishlist> {
    const result = this.customerId && await this.api.postCustomersByIDProductListsByIDItems(this.customerId, listId, {
      type: 'product',
      public: false,
      product_id: productId, // eslint-disable-line camelcase
      quantity: 1
    });

    return result && await this.getWishlist(context);
  }

  async removeFromWishlist(context: SfccIntegrationContext, listId: string, itemId: string): Promise<Wishlist> {
    if (this.customerId) {
      await this.api.deleteCustomersByIDProductListsByIDItemsByID(this.customerId, listId, itemId);
    }

    return await this.getWishlist(context);
  }
}

export class CapiWishlistsApi implements WishlistsApi {
  protected config: ClientConfig;
  protected api: Customer.ShopperCustomers;
  protected customerId: string;

  constructor(config: ClientConfig) {
    this.config = config;
    this.api = new Customer.ShopperCustomers(config);
    this.customerId = getCustomerIdFromToken(this.config.headers.authorization);
  }

  async getWishlist(context: SfccIntegrationContext): Promise<Wishlist> {
    const listResponse = this.customerId && await this.api.getCustomerProductLists({
      parameters: {
        customerId: this.customerId
      }
    });

    return listResponse && listResponse.data[0] && await mapWishlist(context, listResponse.data[0]);
  }

  async createWishlist(context: SfccIntegrationContext): Promise<Wishlist> {
    const listResponse = this.customerId && await this.api.createCustomerProductList({
      parameters: {
        customerId: this.customerId
      },
      body: {
        type: 'wish_list'
      }
    });

    return listResponse && await mapWishlist(context, listResponse);
  }

  async addToWishlist(context: SfccIntegrationContext, listId: string, productId: string): Promise<Wishlist> {
    try {
      const result = this.customerId && await this.api.createCustomerProductListItem({
        parameters: {
          listId,
          customerId: this.customerId
        },
        body: {
          productId,
          type: 'product',
          public: true,
          quantity: 1,
          priority: 1
        }
      });

      console.log(result);
      console.log(result && await this.getWishlist(context));

      return result && await this.getWishlist(context);
    } catch (e) {
      console.log(e);
    }
  }

  async removeFromWishlist(context: SfccIntegrationContext, listId: string, itemId: string): Promise<Wishlist> {
    if (this.customerId) {
      await this.api.deleteCustomerProductListItem({
        parameters: {
          listId,
          itemId,
          customerId: this.customerId
        }
      });
    }

    return await this.getWishlist(context);
  }
}
