declare module 'commercecloud-ocapi-client' {
  export type Image = {
    alt: string;
    dis_base_link: string;
    link: string;
    title: string;
  };
  export type ProductType = {
    bundle: boolean;
    item: boolean;
    master: boolean;
    option: boolean;
    set: boolean;
    variant: boolean;
    variation_group: boolean;
  };
  export type ProductRef = {
    id: string;
    link: string;
  };
  export type VariationAttributeValue = {
    description: string;
    image: Image;
    image_swatch: Image;
    name: string;
    orderable: boolean;
    value: string;
  };
  export type VariationAttribute = {
    id: string;
    name: string;
    values: VariationAttributeValue[];
  };
  export type ProductSearchHit = {
    currency: string;
    hit_type: string;
    image: Image;
    link: string;
    orderable: boolean;
    price: number;
    price_max: number;
    prices: Record<string, number>;
    product_id: string;
    product_name: string;
    product_type: ProductType;
    represented_product: ProductRef;
    represented_products: ProductRef[];
    variation_attributes: VariationAttribute[];
  };
  export type ProductSearchRefinementValue = {
    description: string;
    hit_count: number;
    label: string;
    presentation_id: string;
    value: string;
    values: ProductSearchRefinementValue[];
  };
  export type ProductSearchRefinement = {
    attribute_id: string;
    label: string;
    values: ProductSearchRefinementValue[];
  };
  export type SuggestedCategory = {
    id: string;
    link: string;
    name: string;
    parent_category_name: string;
  };
  export type SuggestedContent = {
    id: string;
    link: string;
    name: string;
  };
  export type SuggestedProduct = {
    currency: string;
    image: Image;
    link: string;
    price: number;
    product_id: string;
    product_name: string;
  };
  export type SuggestedPhrase = {
    exact_match: boolean;
    phrase: string;
  };
  export type SuggestedTerm = {
    completed: boolean;
    corrected: boolean;
    exact_match: boolean;
    value: string;
  };
  export type SuggestedTerms = {
    original_term: string;
    terms: SuggestedTerm[];
  };
  export type Suggestion = {
    brands: string[];
    categories: SuggestedCategory[];
    content: SuggestedContent[];
    custom_suggestions: string[];
    products: SuggestedProduct[];
    suggested_phrases: SuggestedPhrase[];
    suggested_terms: SuggestedTerms[];
  };
  export type ProductSearchSortingOption = {
    id: string;
    label: string;
  };
}
