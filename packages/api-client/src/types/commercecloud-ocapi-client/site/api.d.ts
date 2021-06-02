declare module 'commercecloud-ocapi-client' {
  export class SiteApi {
    constructor();
    getSite(): Promise<Site>;
  }
}
