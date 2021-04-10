<template>
  <div>
    <SfRadio
      v-for="method in shippingMethods"
      :key="method.id"
      :label="method.name"
      :value="method.id"
      :description="method.description"
      :selected ="selectedMethod && selectedMethod.id"
      name="shippingMethod"
      class="form__radio shipping"
      @input="selectMethod(method)"
    >
      <div class="shipping__label">
        {{ method.label }}
      </div>

      <div class="shipping__description">
        {{ method.description }}
      </div>
    </SfRadio>

    <SfButton
      :disabled="!selectedMethod"
      type="button"
      @click="$emit('submit')"
    >
      {{ $t('Continue to billing') }}
    </SfButton>
  </div>
</template>

<script>
import { SfButton, SfRadio } from '@storefront-ui/vue';
import { useShippingProvider } from '@vue-storefront/sfcc';
import { computed, onMounted } from '@vue/composition-api';

export default {
  name: 'VsfShippingProvider',

  components: {
    SfButton,
    SfRadio
  },

  setup() {
    const { state, load, save } = useShippingProvider();

    const selectMethod = async (shippingMethod) => {
      await save({ shippingMethod });
    };

    onMounted(async () => {
      await load();
    });

    return {
      shippingMethods: computed(() => state.value?.applicableShippingMethods),
      selectedMethod: computed(() => state.value?.selectedShippingMethod),
      selectMethod
    };
  }
};
</script>

<style lang="scss" scoped>
.shipping {
  &__label {
    display: flex;
    justify-content: space-between;
  }

  &__description {
    --radio-description-margin: 0;
    --radio-description-font-size: var(--font-xs);
  }
}
</style>
