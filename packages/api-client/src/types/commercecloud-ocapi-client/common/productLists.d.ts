export type ProductListRegistrant = {
  first_name: string;
  last_name: string;
  role: string;
};

export type PublicProductListItem = {
  id: string;
  priority: number;
  product: import('commercecloud-ocapi-client').Product;
  product_details_link: import('commercecloud-ocapi-client').ProductSimpleLink;
  type: string;
};
