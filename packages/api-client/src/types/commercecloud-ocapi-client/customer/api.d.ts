declare module 'commercecloud-ocapi-client' {
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
    postCustomersAuthWithHttpInfo(body: PostCustomersAuthBody, opts?: PostCustomersAuthOptions): Promise<PostCustomersAuthResult>;
  }
}
