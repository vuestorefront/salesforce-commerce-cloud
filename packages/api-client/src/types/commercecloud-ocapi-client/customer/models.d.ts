declare module 'commercecloud-ocapi-client' {
  export namespace AuthRequest {
    enum TypeEnum {
      guest = 'guest',
      credentials = 'credentials',
      refresh = 'refresh',
      session = 'session'
    }
  }

  export namespace Customer {
    enum AuthTypeEnum {
      guest = 'guest',
      registered = 'registered',
    }

    enum GenderEnum {
      1,
      2
    }
  }

  export type CustomerAddress = import('../common/address').Address & {
    address_id: string;
    preferred: boolean;
    creation_date?: Date;
    last_modified?: Date;
  }

  export type CustomerAddressResult = {
    count: number;
    data: CustomerAddress[];
    next: string;
    previous: string;
    select: string;
    total: number;
  }

  export type CustomerPaymentInstrument = import('../common/payment').PaymentInstrument & {
    bank_routing_number: string;
    creation_date: Date;
    last_modified: Date;
  }

  export type CustomerProductListRegistrant = import('../common/productLists').ProductListRegistrant & {
    email: string;
  };

  export type CustomerAddressLink = {
    address_id: string;
    link: string;
    title: string;
  };

  export type CustomerProductListItem = import('../common/productLists').PublicProductListItem & {
    product_id: string;
    public: boolean;
    purchased_quantity: number;
    quantity: number;
  };

  export type ProductListEvent = {
    city: string;
    country: string;
    date: Date;
    state: string;
    type: string;
  };

  export type CustomerProductListItemLink = ProductSimpleLink;

  export type ProductListShippingAddress = {
    address_id: string;
    city: string;
    first_name: string;
    last_name: string;
  };

  export type CustomerProductList = {
    co_registrant: CustomerProductListRegistrant;
    creation_date: Date;
    current_shipping_address_link: CustomerAddressLink;
    customer_product_list_items: CustomerProductListItem[];
    description: string;
    event: ProductListEvent;
    id: string;
    items_link: CustomerProductListItemLink;
    last_modified: Date;
    name: string;
    post_event_shipping_address_link: CustomerAddressLink;
    product_list_shipping_address: ProductListShippingAddress;
    public: boolean;
    registrant: CustomerProductListRegistrant;
    shipping_address_link: CustomerAddressLink;
    type: string;
  };

  export type Customer = {
    addresses?: CustomerAddress[];
    auth_type?: Customer.AuthTypeEnum;
    birthday?: Date;
    company_name?: string;
    creation_date?: Date;
    customer_id?: string;
    customer_no?: string;
    email: string;
    enabled?: boolean;
    fax?: string;
    first_name: string;
    gender?: Customer.GenderEnum;
    job_title?: string;
    last_login_time?: Date;
    last_modified?: Date;
    last_name: string;
    last_visit_time?: Date;
    login: string;
    note?: string;
    payment_instruments?: CustomerPaymentInstrument[];
    phone_business?: string;
    phone_home?: string;
    phone_mobile?: string;
    preferred_locale?: string;
    previous_login_time?: Date;
    previous_visit_time?: Date;
    salutation?: string;
    second_name?: string;
    suffix?: string;
    title?: string;
  }
}
