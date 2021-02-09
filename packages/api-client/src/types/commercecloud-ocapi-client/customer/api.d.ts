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
  export class CustomersApi {
    constructor();
    getCustomersByIDBaskets(customerId: string): Promise<BasketsResult>;
    getCustomersByID(customerId: string, opts?: GetCustomersOptions): Promise<Customer>;
    postCustomers(body: CustomerRegistration): Promise<Customer>;
    patchCustomersByID(customerId: string, body: Customer): Promise<Customer>;
    putCustomersByIDPassword(customerId: string, body: PasswordChangeRequest): Promise<Customer>;
    postCustomersAuthWithHttpInfo(body: PostCustomersAuthBody, opts?: PostCustomersAuthOptions): Promise<PostCustomersAuthResult>;
    getCustomersByIDProductLists(customerId: string, opts?: GetCustomerProductListsOptions): Promise<CustomerProductListResult>;
    postCustomersByIDProductLists(customerId: string, body: { type: 'wish_list' }): Promise<CustomerProductList>;
    postCustomersByIDProductListsByIDItems(customerId: string, listId: string, body: AddCustomerProductListItemBody): Promise<CustomerProductListItem>;
    deleteCustomersByIDProductListsByIDItemsByID(customerId: string, listId: string, itemId: string): Promise<void>;
  }
}
