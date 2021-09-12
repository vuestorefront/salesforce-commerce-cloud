# `useForgotPassword`

## Features

`useForgotPassword` composable is responsible for allowing customers to reset their password. It works by generating a token for the provided user login, which can then be delivered over e.g. email and used on a separate page to validate the operation and allow the customer to set a new password.

Exposing the token to the frontend in any way would be a security breach, as it would allow anyone to set a new password for any account. In order to avoid that, the token generation and delivery must be completed as part of one request in the backend. This can be done by either utilising the SFCC *dw.ocapi.shop.customers.password_reset* hooks (OCAPI only) or by including a delivery function in the mddleware's configuration.


## API

```ts
interface SetNewPasswordParams {
  tokenValue: string;
  newPassword: string;
}

interface ResetPasswordParams {
  email: string;
}
```

- `request` - function used to kick-off the password reset process. When invoked, it receives the customer's login (`email` or `login` supported, see [`configuration`](../configuration.md)) and calls the respective API endpoint for the `internal` or `external` reset process (as set in [`configuration`](../configuration.md)).

- `setNew` - function used to change the customer's password if a valid reset token is supplied.

## Getters

- `getResetPasswordToken` - retrieves the generated reset token; NOT SUPPORTED due to the security considerations discussed above

- `isPasswordChanged` - retrieves the result of setting the new password based on the setNew return value


## Example

```typescript
<script>
import { useForgotPassword } from '@vue-storefront/sfcc';

export default {
  setup() {
    const { request, error: forgotPasswordError, loading: forgotPasswordLoading } = useForgotPassword();

    const requestPasswordReset = async () => {
      await request({ email: 'provided user login' });
    };

    return {
      forgotPasswordLoading,
      forgotPasswordError,
      requestPasswordReset
    };
  }
};
</script>
```

```typescript
<script>
import { useForgotPassword } from '@vue-storefront/sfcc';

export default {
  setup(props, context) {
    const token = context.root.$route.query.token;
    const { result, setNew, error: forgotPasswordError, loading: forgotPasswordLoading } = useForgotPassword();

    const setNewPassword = async () => {
      await setNew({ tokenValue: token, newPassword: 'provided new password' });
    };

    return {
      forgotPasswordLoading,
      forgotPasswordError,
      setNewPassword
    };
  }
};
</script>
```

## External Token Delivery Configuration Example

```typescript
module.exports = {
  integrations: {
    sfcc: {
      location: '@vue-storefront/sfcc-api/server',
      configuration: {
        ...
        customer: {
          ...
          passwordResetType: 'external',
          passwordResetDeliverToken: function passwordResetDeliverToken ({ login: email, token }) {
            callExternalEmailProvider(email, token);
          }
        }
      }
    }
  }
};

```
