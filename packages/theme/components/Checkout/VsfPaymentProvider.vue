<template>
  <div>
    <SfRadio
      v-for="method in paymentMethods"
      :key="method.id"
      :label="method.name"
      :value="method.id"
      :description="method.description"
      :selected ="selectedMethods[0]"
      name="paymentMethod"
      class="form__radio shipping"
      @input="selectMethod(method)"
    >
      <div class="payment__label">
        {{ method.label }}
      </div>
    </SfRadio>
  </div>
</template>

<script>
import { SfButton, SfRadio } from '@storefront-ui/vue';
import { computed, onMounted } from '@vue/composition-api';
import { cartGetters, useCart, usePayment } from '@vue-storefront/sfcc';

export default {
  name: 'VsfPaymentProvider',

  components: {
    SfButton,
    SfRadio
  },

  setup(props, { emit }) {
    const { cart } = useCart();
    const { load, add, paymentMethods, paymentInstruments } = usePayment();
    const selectedMethods = computed(() => paymentInstruments.value.map((pi) => pi.paymentMethodId));

    const selectMethod = async (method) => {
      await add({
        paymentMethod: method.id,
        amount: cartGetters.getTotals(cart.value).total
      });

      emit('status');
    };

    onMounted(async () => {
      await load();

      if (selectedMethods.value.length > 0) {
        emit('status');
      }
    });

    return {
      paymentMethods,
      selectedMethods,
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
