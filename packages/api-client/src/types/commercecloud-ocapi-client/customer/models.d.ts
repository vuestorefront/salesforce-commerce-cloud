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

  export type CustomerPaymentInstrument = import('../common/payment').PaymentInstrument & {
    bank_routing_number: string;
    creation_date: Date;
    last_modified: Date;
  }

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
