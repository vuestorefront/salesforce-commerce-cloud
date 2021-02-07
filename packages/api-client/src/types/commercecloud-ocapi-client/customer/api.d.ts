declare module 'commercecloud-ocapi-client' {
  export type GetCustomersExpandOptions = 'addresses' | 'paymentinstruments';
  export type GetCustomersOptions = {
    expand?: GetCustomersExpandOptions[];
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
    getCustomersByID(customerId: string, opts?: GetCustomersOptions): Promise<Customer>;
    postCustomers(body: CustomerRegistration): Promise<Customer>;
    patchCustomersByID(customerId: string, body: Customer): Promise<Customer>;
    putCustomersByIDPassword(customerId: string, body: PasswordChangeRequest): Promise<Customer>;
    postCustomersAuthWithHttpInfo(body: PostCustomersAuthBody, opts?: PostCustomersAuthOptions): Promise<PostCustomersAuthResult>;
  }
}
