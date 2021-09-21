import { Ref, ref } from '@vue/composition-api';
import { Context } from '@vue-storefront/sfcc-api';
import { useStoreFactory, UseStoreFactoryParams } from '@vue-storefront/core';
import { StoresData } from '../types';

const storesData: Ref<StoresData> = ref<StoresData>({
  stores: [],
  currentStore: null,
});

const factoryParams: UseStoreFactoryParams<StoresData> = {
  load: async (context: Context) => {
    if (storesData.value.stores.length === 0) {
      const siteIds = [
        context.$sfcc.config.siteId,
        ...context.$sfcc.config.allSiteIds,
      ].filter((siteId, i, arr) => arr.indexOf(siteId) === i);

      storesData.value.stores = await Promise.all(
        siteIds.map(context.$sfcc.api.getSite)
      );

      storesData.value.currentStore = storesData.value.stores.find(
        (store) => store.id === context.$sfcc.config.siteId
      );
    }

    return storesData.value;
  },

  change: async (context: Context, { store, currentStore }) => {
    if (store.id !== currentStore.id) {
      storesData.value.currentStore = store;
      context.$sfcc.config.callbacks.site.onSiteChange(store);
    }

    return storesData.value;
  }
};

export default useStoreFactory<StoresData>(factoryParams);
