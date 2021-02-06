declare module 'commercecloud-ocapi-client' {
  export type GetCustomersExpandOptions = 'addresses' | 'paymentinstruments';
  export type GetCustomersOptions = {
    expand?: GetCustomersExpandOptions[];
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
    getCustomersByID(customerId: string, opts?: GetCustomersOptions): Promise<Customer>;
    postCustomers(body: CustomerRegistration): Promise<Customer>;
    postCustomersAuthWithHttpInfo(body: PostCustomersAuthBody, opts?: PostCustomersAuthOptions): Promise<PostCustomersAuthResult>;
  }
}
