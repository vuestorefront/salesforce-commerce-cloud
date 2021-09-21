declare module 'commercecloud-ocapi-client' {
  export type Locale = {
    country: string;
    default: boolean;
    display_country: string;
    display_language: string;
    display_name: string;
    id: string;
    iso3_country: string;
    iso3_language: string;
    language: string;
    name: string;
  };

  export enum SiteStatus {
    offline,
    online
  }

  export type Site = {
    allowed_currencies: string[];
    allowed_locales: Locale[];
    default_currency: string;
    default_locale: string;
    http_dis_base_url: string;
    http_hostname: string;
    http_library_content_url: string;
    http_site_content_url: string;
    https_dis_base_url: string;
    https_hostname: string;
    https_library_content_url: string;
    https_site_content_url: string;
    id: string;
    name: string;
    status: SiteStatus;
    timezone: string;
    timezone_offset: number;
  };
}
