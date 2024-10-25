import { EBadgeTitle } from "@/types/common";

export const badgeTitleShow = (badge: EBadgeTitle) => {
  switch (badge) {
    case EBadgeTitle.verifiedMerchant:
      return "Merchant";
    case EBadgeTitle.verifiedBusiness:
      return "Business";
    case EBadgeTitle.noBadgeTitle:
      return "";
  }
};
