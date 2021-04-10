import { ComputedProperty } from '@vue-storefront/core';

export interface UsePaymentErrors {
  load: Error;
  add: Error;
}

export interface UsePayment<PAYMENT_METHOD, PAYMENT_INSTRUMENT, PAYMENT_INSTRUMENT_PARAMS> {
    error: ComputedProperty<UsePaymentErrors>;
    loading: ComputedProperty<boolean>;
    paymentMethods: ComputedProperty<PAYMENT_METHOD[]>;
    paymentInstruments: ComputedProperty<PAYMENT_INSTRUMENT[]>;
    load(): Promise<void>;
    add: (params: PAYMENT_INSTRUMENT_PARAMS) => Promise<void>;
}
