/* eslint-disable camelcase */

declare module 'commercecloud-ocapi-client' {
  type ApiConfig = {
    basePath?: string;
    timeout?: number;
    cache?: boolean;
    enableCookies?: boolean;
    overrideHttpPut?: boolean;
    oauth2AccessToken?: string;
    defaultHeaders?: {
      [string]: string;
    };
  }

  export class ApiClient {
    static instance: ApiClient;

    basePath: string;
    defaultHeaders: {
      authorization?: string;
    };

    constructor(ocapiConfig: ApiConfig);
    callApi(path: string, ...args: any[]): Promise<any>;
  }
}
