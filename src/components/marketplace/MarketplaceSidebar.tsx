import { getImageUrlByCategory } from "@/utils/getImageUrl";
import MarketPlaceSidebarFilterElement from "./MarketPlaceSidebarFilterElement";
import PriceRange from "./PriceRange";
import { AccountCategory } from "@/types/common";
import {
  AccountsSubscriptionsCategories,
  EcommerceCategories,
  EmailMessagingCategories,
  GamingAccountCategories,
  GiftCardCategories,
  SocialMediaCategories,
  VpnCategories,
} from "@/shared";

const MarketplaceSidebar = ({ isHideTitle }: { isHideTitle?: boolean }) => {
  const sidebarMenu: any = [
    {
      imageUrl: "/assets/icons/like.png",
      label: "Social Media",
      children: SocialMediaCategories,
    },
    {
      imageUrl: "/assets/icons/email.png",
      label: "Emails & Messaging Service ",
      children: EmailMessagingCategories,
    },
    {
      imageUrl: "/assets/icons/gift.png",
      label: "Giftcards",
      children: GiftCardCategories,
    },
    {
      imageUrl: "/assets/icons/internet.png",
      label: "VPN & PROXYs",
      children: VpnCategories,
    },
    {
      imageUrl: "/assets/icons/ecart.png",
      label: "E-commerce Platforms",
      children: EcommerceCategories,
    },
    {
      imageUrl: "/assets/icons/game.png",
      label: "Gaming",
      children: GamingAccountCategories,
    },
    {
      imageUrl: "/assets/icons/tag-user.png",
      label: "Accounts & Subscriptions",
      children: AccountsSubscriptionsCategories,
    },
    {
      imageUrl: "/assets/icons/others.png",
      label: "Others",
      children: [
        {
          label: "Other",
          value: AccountCategory.Other,
          imageUrl: "/assets/other.png",
        },
      ],
    },
  ];

  return (
    <div>
      {!isHideTitle && (
        <h2 className="font-bold text-textBlack py-4 px-6">Filter</h2>
      )}

      {/* this is account category div  */}
      <div className={`${isHideTitle && "pt-3"}`}>
        <h3 className="border-b border-b-[#E4E4E4] px-4 md:px-5 pb-2 md:pb4- text-textBlack font-medium">
          Account Category
        </h3>
        <div className="pt-2 max-h-[45dvh] overflow-auto">
          {sidebarMenu.map((sidebar: any) => (
            <MarketPlaceSidebarFilterElement
              key={sidebar?.label}
              sidebar={sidebar}
            />
          ))}
        </div>
        {/* this is price range  */}
        <div className="mb-4 p-2 md:p-4 border-b border-b-[#E4E4E4]">
          <h4>Price range</h4>
          <PriceRange />
        </div>
      </div>
    </div>
  );
};

export default MarketplaceSidebar;
