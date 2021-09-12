declare module 'commercecloud-ocapi-client' {
  export type GetCustomersExpandOptions = 'addresses' | 'paymentinstruments';
  export type CustomerProductListsExpandOptions = 'items' | 'product' | 'images' | 'availability';
  export type BasketsResult = {
    baskets: Basket[];
    total: number;
  };
  export type GetCustomersOptions = {
    expand?: GetCustomersExpandOptions[];
  };
  export type GetCustomerAddressesOptions = {
    start?: number;
    count?: number;
  };
  export type GetCustomerProductListsOptions = {
    start: number;
    count: number;
    expand?: CustomerProductListsExpandOptions[];
  };
  export type CustomerProductListResult = {
    count: number;
    data: CustomerProductList[];
    total: number;
  };
  export type AddCustomerProductListItemBody = {
    type: 'product';
    priority?: number;
    public?: boolean;
    product_id: string;
    quantity: number;
  };
  export type PasswordChangeRequest = {
    current_password: string;
    password: string;
  };
  export type CustomerRegistration = {
    customer: Customer;
    password: string;
  };
  export type PostCustomersAuthBody = {
    type: AuthRequest.TypeEnum;
  };
  export type PostCustomersAuthOptions = {
    authorization?: string;
  };
  export type PostCustomersAuthResult = {
    data: Customer;
    response: import('superagent').Response;
  };
  export type GetCustomerOrdersOpts = {
    start?: number;
    count?: number;
    crossSites?: boolean;
    from?: string;
    until?: string;
    status?: string;
  };
  export type CustomerOrderResult = {
    count: number;
    data: Order[];
    next: string;
    previous: string;
    select: string;
    start: number;
    total: number;
  };
  export class CustomersApi {
    constructor();
    getCustomersByIDBaskets(customerId: string): Promise<BasketsResult>;
    getCustomersByID(customerId: string, opts?: GetCustomersOptions): Promise<Customer>;
    getCustomersByIDAddresses(customerId: string, opts?: GetCustomerAddressesOptions): Promise<CustomerAddressResult>;
    getCustomersByIDAddressesByID(customerId: string, addressName: string): Promise<CustomerAddress>;
    postCustomersByIDAddresses(customerId: string, body: CustomerAddress): Promise<CustomerAddress>;
    patchCustomersByIDAddressesByID(customerId: string, addressName: string, body: CustomerAddress): Promise<CustomerAddress>;
    deleteCustomersByIDAddressesByID(customerId: string, addressName: string): Promise<void>;
    postCustomers(body: CustomerRegistration): Promise<Customer>;
    getCustomersByIDOrders(customerId: string, body?: GetCustomerOrdersOpts): Promise<CustomerOrderResult>;
    patchCustomersByID(customerId: string, body: Customer): Promise<Customer>;
    putCustomersByIDPassword(customerId: string, body: PasswordChangeRequest): Promise<Customer>;
    postCustomersAuthWithHttpInfo(body: PostCustomersAuthBody, opts?: PostCustomersAuthOptions): Promise<PostCustomersAuthResult>;
    getCustomersByIDProductLists(customerId: string, opts?: GetCustomerProductListsOptions): Promise<CustomerProductListResult>;
    postCustomersByIDProductLists(customerId: string, body: { type: 'wish_list' }): Promise<CustomerProductList>;
    postCustomersByIDProductListsByIDItems(customerId: string, listId: string, body: AddCustomerProductListItemBody): Promise<CustomerProductListItem>;
    deleteCustomersByIDProductListsByIDItemsByID(customerId: string, listId: string, itemId: string): Promise<void>;
    postCustomersPasswordReset(body: PasswordReset): Promise<void>;
    postCustomersPasswordActionsCreateResetToken(body: ResetPasswordTokenRequest): Promise<ResetPasswordTokenResult>;
    postCustomersPasswordActionsReset(body: ResetPasswordRequest): Promise<void>;
  }
}
