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
}
