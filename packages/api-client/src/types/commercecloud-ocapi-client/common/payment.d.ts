export type PaymentCard = {
  card_type: string;
  credit_card_expired: boolean;
  credit_card_token: string;
  expiration_month: number;
  expiration_year: number;
  holder: string;
  issue_number: string;
  masked_number: string;
  number_last_digits: string;
  valid_from_month: number;
  valid_from_year: number;
}

export type PaymentBankAccount = {
  drivers_license_last_digits: string;
  drivers_license_state_code: string;
  holder: string;
  masked_drivers_license: string;
  masked_number: string;
  number_last_digits: string;
}

export type PaymentInstrument = {
  masked_gift_certificate_code: string;
  payment_bank_account: PaymentBankAccount;
  payment_card: PaymentCard;
  payment_instrument_id: string;
  payment_method_id: string;
}
