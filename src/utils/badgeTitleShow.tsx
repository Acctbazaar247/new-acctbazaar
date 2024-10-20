import { EBadgeTitle } from "@/types/common";

export const badgeTitleShow = (badge: EBadgeTitle) => {
  switch (badge) {
    case EBadgeTitle.verifiedMerchant:
      return "Verified Merchant";
    case EBadgeTitle.verifiedBusiness:
      return "Verified Business";
    case EBadgeTitle.noBadgeTitle:
      return "";
  }
};
