<template>
  <div class="container">
    <SfButton
        class="container__lang container__lang--selected"
        @click="isLangModalOpen = !isLangModalOpen"
    >
      <SfImage :src="`/icons/langs/${locale}.webp`" width="20" alt="Flag" />
    </SfButton>
    <SfBottomModal v-if="storesData" :is-open="isLangModalOpen" title="Choose language" @click:close="isLangModalOpen = !isLangModalOpen">
      <div v-for="store in storesData.stores" :key="store.id">
        <p>{{ store.name }}</p>
        <SfList>
          <SfListItem v-for="lang in store.locales" :key="lang.code">
            <a :href="switchLocalePath(lang.code)">
              <SfCharacteristic class="language">
                <template #title>
                  <span>{{ lang.label }}</span>
                </template>
                <template #icon>
                  <SfImage :src="`/icons/langs/${lang.code}.webp`" width="20" alt="Flag" class="language__flag" />
                </template>
              </SfCharacteristic>
            </a>
          </SfListItem>
        </SfList>
      </div>
    </SfBottomModal>
  </div>
</template>

<script>
import {
  SfImage,
  SfSelect,
  SfButton,
  SfList,
  SfBottomModal,
  SfCharacteristic
} from '@storefront-ui/vue';
import { ref } from '@vue/composition-api';
import { onSSR } from '@vue-storefront/core';
import { useStore } from '@vue-storefront/sfcc';
export default {
  components: {
    SfImage,
    SfSelect,
    SfButton,
    SfList,
    SfBottomModal,
    SfCharacteristic
  },
  setup(props, context) {
    const isLangModalOpen = ref(false);
    const { locale } = context.root.$i18n;
    const { load: loadStores, change: changeStore, response: storesData } = useStore();

    onSSR(async () => {
      await loadStores();
    });

    return {
      locale,
      storesData,
      isLangModalOpen
    };
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin: 0 -5px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  position: relative;
  .sf-bottom-modal {
    z-index: 2;
    left: 0;
    @include for-desktop {
      --bottom-modal-height: 100vh;
    }
  }
  .sf-list {
    .language {
      padding: var(--spacer-sm);
      &__flag {
        margin-right: var(--spacer-sm);
      }
    }
    @include for-desktop {
      display: flex;
    }
  }
  &__lang {
    width: 20px;
    --button-box-shadow: none;
    background: none;
    padding: 0 5px;
    display: flex;
    align-items: center;
    opacity: 0.5;
    border: none;
    &:hover,
    &--selected {
      opacity: 1;
    }
  }
}
</style>
