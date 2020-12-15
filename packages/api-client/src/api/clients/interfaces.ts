export interface CustomersApi {
  guestSignIn(): Promise<string>;
  refreshToken(): Promise<string>;
}
