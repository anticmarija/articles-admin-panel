export interface ArticleType {
  id: number;
  acronym: string;
  titleDE: string;
  titleFR: string;
  titleIT: string;
  titleEN: string;
  group: GroupOrDefaultShippingStatusOrDefaultBrandOrDefaultDropshipper;
  defaultShippingStatus: GroupOrDefaultShippingStatusOrDefaultBrandOrDefaultDropshipper;
  sortOrder: number;
  isChoEnabled: boolean;
  allowedWithDropshipper: boolean;
  allowedWithoutDropshipper: boolean;
  canHaveStock: boolean;
  moreThanOneDropshipper: boolean;
  defaultBrand: GroupOrDefaultShippingStatusOrDefaultBrandOrDefaultDropshipper;
  canAddToOrder: boolean;
  addOnlyIfExistsInOrder: boolean;
  canResendArticlesInOrder: boolean;
  isActive: boolean;
  hasStatistic: boolean;
  defaultDeliveryTime: DefaultDeliveryTime;
  addToOrderPriority: number;
  isContentBoxManageable: boolean;
  isReadyForDeals: boolean;
  isReadyForBundles: boolean;
  isFrontendPage: boolean;
  isBundle: boolean;
  isStockManagementAllowed: boolean;
  canCreateExperienceVoucher: boolean;
  canCreateBoxVoucher: boolean;
  canCreateValueVoucher: boolean;
  canAddToOrderOnlyWithArticleType?: (CanAddToOrderOnlyWithArticleTypeEntity | null)[] | null;
  bundlePlusDifferenceArticle?: BundlePlusDifferenceArticleOrBundleMinusDifferenceArticle | null;
  bundleMinusDifferenceArticle?: BundlePlusDifferenceArticleOrBundleMinusDifferenceArticle | null;
  canHaveZeroPrice: boolean;
  defaultDropshipper?: GroupOrDefaultShippingStatusOrDefaultBrandOrDefaultDropshipper | null;
}

export interface GroupOrDefaultShippingStatusOrDefaultBrandOrDefaultDropshipper {
  id: number;
  name: string;
}

export interface DefaultDeliveryTime {
  id: number;
  titleDE: string;
}

export interface CanAddToOrderOnlyWithArticleTypeEntity {
  id: number;
  acronym: string;
}

export interface BundlePlusDifferenceArticleOrBundleMinusDifferenceArticle {
  titleWithArticleNumber: string;
  id: number;
}

export interface Test {
  acronym: number;
  name: string;
}
