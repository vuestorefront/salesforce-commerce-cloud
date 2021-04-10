/* eslint-disable no-use-before-define */

declare module 'commercecloud-ocapi-client' {
  export type OrderAddress = import('../common/address').Address;
  export type ProductDetailsLink = {
    link: string;
    product_description: string;
    product_id: string;
    product_name: string;
    title: string;
  };
  export type ProductListLink = {
    description: string;
    link: string;
    name: string;
    public: boolean;
    title: string;
    type: string;
  };
  export type BonusDiscountLineItem = {
    bonus_products: ProductDetailsLink[];
    coupon_code: string;
    id: string;
    max_bonus_items: number;
    promotion_id: string;
  };
  export type CouponItem = {
    code: string;
    coupon_item_id?: string;
    status_code?: string;
    valid?: boolean;
  };
  export type CustomerInfo = {
    customer_id: string;
    customer_name: string;
    customer_no: string;
    email: string;
  };
  export type GiftCertificateItem = {
    amount: number;
    gift_certificate_item_id: string;
    message: string;
    recipient_email: string;
    recipient_name: string;
    sender_name: string;
    shipment_id: string;
  };
  export type SimpleLink = {
    link: string;
  };
  export type Discount = {
    amount: number;
    percentage: number;
    price_book_id: string;
    type: string;
  };
  export type PriceAdjustment = {
    applied_discount: Discount;
    coupon_code: string;
    created_by: string;
    creation_date: Date;
    custom: boolean;
    item_text: string;
    last_modified: Date;
    manual: boolean;
    price: number;
    price_adjustment_id: string;
    promotion_id: string;
    promotion_link: string;
    reason_code: string;
  };
  export type OrderPaymentInstrumentStatus = {
    code: string;
    message: string;
    status: number;
  };
  export type OrderPaymentInstrument = import('../common/payment').PaymentInstrument & {
    amount: number;
    authorization_status: OrderPaymentInstrumentStatus;
    bank_routing_number: string;
  };
  export type OptionItem = ProductItem & {
    option_value_id: string;
  };
  export type ProductListItemReference = {
    id: string;
    priority: number;
    product_details_link: ProductDetailsLink;
    product_list: ProductListLink;
    public: boolean;
    purchased_quantity: number;
    quantity: number;
    type: string;
  };
  export type ProductItem = {
    adjusted_tax?: number;
    base_price?: number;
    bonus_discount_line_item_id?: string;
    bonus_product_line_item?: boolean;
    bundled_product_items?: ProductItem[];
    gift?: boolean;
    gift_message?: string;
    inventory_id?: string;
    item_id?: string;
    item_text?: string;
    option_items?: OptionItem[];
    price?: number;
    price_adjustments?: PriceAdjustment[];
    price_after_item_discount?: number;
    price_after_order_discount?: number;
    product_id: string;
    product_list_item?: ProductListItemReference;
    product_name?: string;
    quantity: number;
    shipment_id?: string;
    shipping_item_id?: string;
    tax?: number;
    tax_basis?: number;
    tax_class_id?: string;
    tax_rate?: number;
  };
  export type ShippingPromotion = {
    callout_msg: string;
    link: string;
    promotion_id: string;
    promotion_name: string;
  };
  export type ShippingMethod = {
    c_storePickupEnabled: boolean;
    description: string;
    external_shipping_method: string;
    id: string;
    name: string;
    price: number;
    shipping_promotions: ShippingPromotion[];
  };
  export type Shipment = {
    adjusted_merchandize_total_tax: number;
    adjusted_shipping_total_tax: number;
    gift: boolean;
    gift_message: string;
    merchandize_total_tax: number;
    product_sub_total: number;
    product_total: number;
    shipment_id: string;
    shipment_no: string;
    shipment_total: number;
    shipping_address: OrderAddress;
    shipping_method: ShippingMethod;
    shipping_status: string;
    shipping_total: number;
    shipping_total_tax: number;
    tax_total: number;
    tracking_number: string;
  };
  export type ShippingItem = {
    adjusted_tax: number;
    base_price: number;
    item_id: string;
    item_text: string;
    price: number;
    price_adjustments: PriceAdjustment[];
    price_after_item_discount: number;
    shipment_id: string;
    tax: number;
    tax_basis: number;
    tax_class_id: string;
    tax_rate: number;
  };
  export type PaymentCardSpec = {
    card_type: string;
    checksum_verification_enabled: boolean;
    description: string;
    image: string;
    name: string;
    number_lengths: string[];
    number_prefixes: string[];
    security_code_length: number;
  };
  export type PaymentMethod = {
    cards: PaymentCardSpec[];
    description: string;
    id: string;
    image?: string;
    name: string;
    payment_processor_id: string;
  };
  export type PaymentBankAccountRequest = {
    drivers_license: string;
    drivers_license_state_code: string;
    holder: string;
    number: string;
  };
  export type OrderPaymentCardRequest = {
    card_type: string;
    credit_card_token: string;
    expiration_month: number;
    expiration_year: number;
    holder: string;
    issue_number: string;
    number: string;
    security_code: string;
    valid_from_month: number;
    valid_from_year: number;
  };
  export type BasketPaymentInstrumentRequest = {
    amount: number;
    bank_routing_number?: string;
    customer_payment_instrument_id?: string;
    gift_certificate_code?: string;
    payment_bank_account?: PaymentBankAccountRequest;
    payment_card?: OrderPaymentCardRequest;
    payment_method_id: string;
  };
  export type OrderPaymentInstrumentRequest = BasketPaymentInstrumentRequest & {
    create_customer_payment_instrument?: boolean;
  };
  type LineItemCtnr ={
    adjusted_merchandize_total_tax: number;
    adjusted_shipping_total_tax: number;
    billing_address: OrderAddress;
    bonus_discount_line_items: BonusDiscountLineItem[];
    channel_type: string;
    coupon_items: CouponItem[];
    creation_date: Date;
    currency: string;
    customer_info: CustomerInfo;
    gift_certificate_items: GiftCertificateItem[];
    last_modified: Date;
    merchandize_total_tax: number;
    notes: SimpleLink;
    order_price_adjustments: PriceAdjustment[];
    order_total: number;
    payment_instruments: OrderPaymentInstrument[];
    product_items: ProductItem[];
    product_sub_total: number;
    product_total: number;
    shipments: Shipment[];
    shipping_items: ShippingItem[];
    shipping_total: number;
    shipping_total_tax: number;
    source_code: string;
    tax_total: number;
    taxation: string;
  };
  export type Basket = LineItemCtnr & {
    agent_basket: boolean;
    basket_id: string;
    inventory_reservation_expiry: Date;
  };
  export type Order = LineItemCtnr & {
    confirmation_status: string;
    created_by: string;
    customer_name: string;
    export_status: string;
    external_order_status: string;
    global_party_id: string;
    order_no: string;
    order_token: string;
    payment_status: string;
    shipping_status: string;
    site_id: string;
    status: string;
  };
}
