<template>
  <div>
    <p>{{ address.id }}</p>
    <p>{{ address.firstName }} {{ address.lastName }}</p>
    <p>{{ street }}</p>

    <p>
      {{ address.city }}
      {{ address.state }}
      {{ address.postalCode }}
    </p>

    <p>{{ country }}</p>
    <p v-if="address.phone" class="phone"> {{ address.phone }}</p>
  </div>
</template>

<script>
import { toRef, computed } from '@vue/composition-api';

export default {
  name: 'UseAddress',

  props: {
    address: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const address = toRef(props, 'address');

    const street = computed(() => {
      const parts = [
        address.streetName,
        address.streetNumber && ` ${address.streetNumber}`,
        address.apartment && `, ${address.apartment}`
      ];

      return parts.filter(Boolean).join('');
    });

    const country = computed(() => address.country);

    return {
      street,
      country
    };
  }
};
</script>

<style lang="scss" scoped>
p {
  margin: 0;
}
.phone {
  margin-top: var(--spacer-base);
}
</style>
