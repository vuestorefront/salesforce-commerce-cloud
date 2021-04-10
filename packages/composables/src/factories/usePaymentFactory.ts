import { Context, FactoryParams } from '@vue-storefront/core';
import { UsePayment, UsePaymentErrors } from './types';
import { Ref, computed } from '@vue/composition-api';
import { sharedRef, Logger, configureFactoryParams } from '@vue-storefront/core';

export interface UsePaymentParams<PAYMENT_METHOD, PAYMENT_INSTRUMENT, PAYMENT_INSTRUMENT_PARAMS> extends FactoryParams {
  load: (context: Context) => Promise<{
    paymentMethods: PAYMENT_METHOD[];
    paymentInstruments: PAYMENT_INSTRUMENT[]
  }>;

  add: (context: Context, params: PAYMENT_INSTRUMENT_PARAMS) => Promise<{
    paymentInstruments: PAYMENT_INSTRUMENT[]
  }>;
}

export const usePaymentFactory = <PAYMENT_METHOD, PAYMENT_INSTRUMENT, PAYMENT_INSTRUMENT_PARAMS>(
  factoryParams: UsePaymentParams<PAYMENT_METHOD, PAYMENT_INSTRUMENT, PAYMENT_INSTRUMENT_PARAMS>
) => {
  return function usePayment (): UsePayment<PAYMENT_METHOD, PAYMENT_INSTRUMENT, PAYMENT_INSTRUMENT_PARAMS> {
    const loading: Ref<boolean> = sharedRef(false, 'usePayment-loading');
    const paymentMethods: Ref<PAYMENT_METHOD[]> = sharedRef([], 'usePayment-paymentMethods');
    const paymentInstruments: Ref<PAYMENT_INSTRUMENT[]> = sharedRef([], 'usePayment-paymentInstruments');
    const _factoryParams = configureFactoryParams(factoryParams);
    const error: Ref<UsePaymentErrors> = sharedRef({
      load: null,
      save: null
    }, 'usePayment-error');

    const load = async () => {
      Logger.debug('usePayment.load');

      try {
        loading.value = true;
        const { paymentMethods: methods, paymentInstruments: instruments } = await _factoryParams.load();
        error.value.load = null;
        paymentMethods.value = methods;
        paymentInstruments.value = instruments;
      } catch (err) {
        error.value.load = err;
        Logger.error('usePayment/load', err);
      } finally {
        loading.value = false;
      }
    };

    const add = async (addParams: PAYMENT_INSTRUMENT_PARAMS) => {
      Logger.debug('usePayment.add');

      try {
        loading.value = true;
        const { paymentInstruments: instruments } = await _factoryParams.add(addParams);
        error.value.add = null;
        paymentInstruments.value = instruments;
      } catch (err) {
        error.value.add = err;
        Logger.error('usePayment/add', err);
      } finally {
        loading.value = false;
      }
    };

    return {
      paymentMethods: computed(() => paymentMethods.value),
      paymentInstruments: computed(() => paymentInstruments.value),
      loading: computed(() => loading.value),
      error: computed(() => error.value),
      load,
      add
    };
  };
};
