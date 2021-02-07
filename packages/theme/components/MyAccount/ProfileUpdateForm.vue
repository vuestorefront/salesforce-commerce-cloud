<template>
  <div>
    <SfAlert v-if="success" class="alert" type="success" :message="success" />
    <SfAlert v-if="error" class="alert" type="danger" :message="error" />
    <ValidationObserver v-slot="{ handleSubmit }">
      <form class="form" @submit.prevent="handleSubmit(updateProfile)">
        <div class="form__horizontal">
          <ValidationProvider rules="required|min:2" v-slot="{ errors }" class="form__element">
            <SfInput
            data-cy="my-profile-input_firstName"
            v-model="form.firstName"
            name="firstName"
            label="First Name"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
            />
          </ValidationProvider>
          <ValidationProvider rules="required|min:2" v-slot="{ errors }" class="form__element">
            <SfInput
            data-cy="my-profile-input_lastName"
            v-model="form.lastName"
            name="lastName"
            label="Last Name"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
            />
          </ValidationProvider>
        </div>
        <ValidationProvider rules="required|email" v-slot="{ errors }" class="form__element">
          <SfInput
          data-cy="my-profile-input_email"
          v-model="form.email"
          type="email"
          name="email"
          label="Your e-mail"
          required
          :valid="!errors[0]"
          :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <SfButton data-cy="my-profile-btn_update" class="form__button">Update personal data</SfButton>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import { ref } from '@vue/composition-api';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { email, required, min } from 'vee-validate/dist/rules';
import { SfInput, SfButton, SfAlert } from '@storefront-ui/vue';
import { useUser } from '@vue-storefront/sfcc';
import { onSSR } from '@vue-storefront/core';

extend('email', {
  ...email,
  message: 'Invalid email'
});

extend('required', {
  ...required,
  message: 'This field is required'
});

extend('min', {
  ...min,
  message: 'The field should have at least {length} characters'
});

export default {
  name: 'ProfileUpdateForm',
  components: {
    SfInput,
    SfButton,
    SfAlert,
    ValidationProvider,
    ValidationObserver
  },
  setup(_, { emit }) {
    const form = ref({});
    const { user, load } = useUser();
    const success = ref(null);
    const error = ref(null);

    const updateForm = (user) => {
      if (user && user.value) {
        form.value.firstName = user.value.firstName;
        form.value.lastName = user.value.lastName;
        form.value.email = user.value.email;
      }
    };

    updateForm(user);

    onSSR(async () => {
      await load();

      updateForm(user);
    });

    const updateProfile = async () => emit('submit', {
      form,
      onComplete() {
        success.value = 'Customer updated successfully';
      },
      onError(e) {
        error.value = e.trace;
      }
    });

    return {
      form,
      error,
      success,
      updateProfile
    };
  }
};
</script>
<style lang='scss' scoped>
@import "~@storefront-ui/vue/styles";

.form {
  &__element {
    display: block;
    margin: 0 0 var(--spacer-2xl) 0;
  }

  &__button {
    display: block;
  }

  &__horizontal {
    @include for-desktop {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .form__element {
      @include for-desktop {
        flex: 1;
        margin-right: var(--spacer-2xl);
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
