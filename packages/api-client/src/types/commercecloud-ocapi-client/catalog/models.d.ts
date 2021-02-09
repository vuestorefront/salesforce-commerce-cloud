/* eslint-disable no-use-before-define */

declare module 'commercecloud-ocapi-client' {
  export type Category = {
    c_alternativeUrl: string;
    c_catBannerID: string;
    c_customCSSFile: string;
    c_enableCompare: boolean;
    c_headerMenuBanner: string;
    c_headerMenuOrientation: string;
    c_showInMenu: boolean;
    c_sizeChartID: string;
    c_slotBannerHtml: string;
    c_slotBannerImage: string;
    categories: Category[];
    description: string;
    id: string;
    image: string;
    name: string;
    page_description: string;
    page_keywords: string;
    page_title: string;
    parent_category_id: string;
    thumbnail: string;
  }
  export type ImageGroup = {
    images: Image[];
    variation_attributes: VariationAttribute[];
    view_type: string;
  };
  export type BundledProduct = {
    id: string;
    product: Product;
    quantity: number;
  };
  export type ProductInventory = {
    id: string;
    ats: number;
    orderable: boolean;
    stock_level: number;
    in_stock_date: Date;
    preorderable: boolean;
    backorderable: boolean;
  };
  export type Master = {
    link: string;
    master_id: string;
    orderable: boolean;
    price: number;
    price_max: number;
    prices: { [key: string]: number };
  };
  export type OptionValue = {
    id: string;
    name: string;
    price: number;
    default: boolean;
  };
  export type Option = {
    id: string;
    name: string;
    image: string;
    description: string;
    values: [OptionValue];
  };
  export type ProductLink = {
    type: string;
    source_product_id: string;
    source_product_link: string;
    target_product_id: string;
    target_product_link: string;
  };
  export type ProductSimpleLink = {
    link: string;
    title: string;
  };
  export type ProductPromotion = {
    link: string;
    callout_msg: string;
    promotion_id: string;
    promotional_price: number;
  };
  export type RecommendationType = {
    value: number;
    display_value: string;
  };
  export type Recommendation = {
    recommended_item_id: string;
    recommended_item_link: string;
    name: string;
    callout_msg: string;
    image: Image;
    long_description: string;
    short_description: string;
    recommendation_type: RecommendationType;
  };
  export type Variant = {
    product_id: string;
    link: string;
    price: number;
    orderable: boolean;
    variation_values: { [key: string]: string };
  };
  export type VariationGroup = {
    product_id: string;
    link: string;
    price: number;
    orderable: boolean;
    variation_values: { [key: string]: string };
  };
  export type Product = {
    brand: string;
    bundled_products: BundledProduct[];
    currency: string;
    ean: string;
    fetch_date: number;
    id: string;
    image_groups: ImageGroup[];
    inventories: ProductInventory[];
    inventory: ProductInventory;
    long_description: string;
    manufacturer_name: string;
    manufacturer_sku: string;
    master: Master;
    min_order_quantity: number;
    name: string;
    options: Option[];
    page_description: string;
    page_keywords: string;
    page_title: string;
    price: number;
    price_max: number;
    prices: Record<string, number>;
    primary_category_id: string;
    product_links: ProductLink[];
    product_promotions: ProductPromotion[];
    recommendations: Recommendation[];
    set_products: Product[];
    short_description: string;
    step_quantity: number;
    type: ProductType;
    unit: string;
    upc: string;
    valid_from: Date;
    valid_to: Date;
    variants: Variant[];
    variation_attributes: VariationAttribute[];
    variation_groups: VariationGroup[];
    variation_values: Record<string, string>;
  };
}
