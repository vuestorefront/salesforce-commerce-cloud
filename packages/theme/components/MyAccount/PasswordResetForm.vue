<template>
  <div>
    <SfAlert v-if="success" class="alert" type="success" :message="success" />
    <SfAlert v-if="error" class="alert" type="danger" :message="error" />
    <ValidationObserver v-slot="{ handleSubmit }">
      <form class="form" @submit.prevent="handleSubmit(updatePassword)">
        <ValidationProvider rules="required" v-slot="{ errors }" vid="password" class="form__element">
          <SfInput
            data-cy="my-profile-input_currentPassword"
            v-model="form.currentPassword"
            type="password"
            name="currentPassword"
            label="Current Password"
            required
            :valid="!errors[0]"
            :errorMessage="errors[0]"
          />
        </ValidationProvider>
        <div class="form__horizontal">
          <ValidationProvider rules="required|password" v-slot="{ errors }" vid="password" class="form__element">
            <SfInput
              data-cy="my-profile-input_newPassword"
              v-model="form.newPassword"
              type="password"
              name="newPassword"
              label="New Password"
              required
              :valid="!errors[0]"
              :errorMessage="errors[0]"
            />
          </ValidationProvider>
          <ValidationProvider rules="required|confirmed:password" v-slot="{ errors }" class="form__element">
            <SfInput
              data-cy="my-profile-input_repeatPassword"
              v-model="form.repeatPassword"
              type="password"
              name="repeatPassword"
              label="Repeat Password"
              required
              :valid="!errors[0]"
              :errorMessage="errors[0]"
            />
          </ValidationProvider>
        </div>
        <SfAlert v-if="error" class="alert" type="danger" :message="error" />
        <SfButton data-cy="my-profile-btn_update-password" class="form__button">Update password</SfButton>
      </form>
    </ValidationObserver>
  </div>
</template>
<script>
import { ref } from '@vue/composition-api';
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, confirmed } from 'vee-validate/dist/rules';
import { SfInput, SfButton, SfAlert } from '@storefront-ui/vue';

extend('required', {
  ...required,
  message: 'This field is required'
});

extend('password', {
  validate: value => String(value).length >= 8 && String(value).match(/[A-Za-z]/gi) && String(value).match(/[0-9]/gi),
  message: 'Password must have at least 8 characters including one letter and a number'
});

extend('confirmed', {
  ...confirmed,
  message: 'Passwords don\'t match'
});

export default {
  name: 'PasswordResetForm',
  components: {
    SfInput,
    SfButton,
    SfAlert,
    ValidationProvider,
    ValidationObserver
  },
  setup(_, { emit }) {
    const form = ref({});
    const success = ref(null);
    const error = ref(null);

    const updatePassword = async () => emit('submit', {
      form,
      onComplete() {
        success.value = 'Customer updated successfully';
      },
      onError(e) {
        error.value = e.message;
      }
    });

    return {
      form,
      error,
      success,
      updatePassword
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
