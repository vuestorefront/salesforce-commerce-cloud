import { Customer } from '../../types';

export interface CustomersApi {
  guestSignIn(): Promise<string>;
  refreshToken(): Promise<string>;
  signIn(username: string, password: string): Promise<{ customer: Customer, token: string }>;
}
