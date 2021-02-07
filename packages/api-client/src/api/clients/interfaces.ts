import { Customer } from '../../types';

export interface CustomersApi {
  guestSignIn(): Promise<string>;
  refreshToken(): Promise<string>;
  signIn(username: string, password: string): Promise<{ customer: Customer, token: string }>;
  getCustomer(): Promise<Customer>;
  createCustomer(email: string, password: string, firstName: string, lastName: string): Promise<Customer>;
  updateCustomer(email: string, firstName: string, lastName: string): Promise<Customer>;
  updateCustomerPassword(currentPassword: string, newPassword: string): Promise<Customer>;
}
