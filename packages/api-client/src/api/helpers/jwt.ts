import { decode } from 'js-base64';

export const getTokenFromAuthHeader = (header: string | null): string | null => header && header.replace('Bearer ', '');

export const getCustomerIdFromToken = (token: string, registeredOnly?: boolean): string | null => {
  if (token) {
    const [, encodedPayload] = token.split('.');
    const payload = encodedPayload && JSON.parse(decode(encodedPayload));
    const subject = payload && payload.sub && JSON.parse(payload.sub);
    const customerInfo = subject && (subject.customer_info || subject.CustomerInfo);

    const guest = customerInfo && customerInfo.guest;
    const customerId = customerInfo && (customerInfo.customer_id || customerInfo.customerId);

    if ((!registeredOnly || !guest) && customerId) {
      return customerId;
    }
  }

  return null;
};
