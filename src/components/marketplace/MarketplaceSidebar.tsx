import {
  AccountsSubscriptionsCategories,
  EcommerceCategories,
  EmailMessagingCategories,
  GamingAccountCategories,
  GiftCardCategories,
  SocialMediaCategories,
  // ToolsAndResources,
  VpnCategories,
  WebsitesCategories,
} from "@/shared";
import { AccountCategory } from "@/types/common";
import MarketPlaceSidebarFilterElement from "./MarketPlaceSidebarFilterElement";
import PriceRange from "./PriceRange";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { clearSelectedCategories } from "@/redux/features/categories/categorySlice";
import AppButton from "@/components/ui/AppButton";

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
      imageUrl: "/assets/icons/vpn.png",
      label: "VPN & PROXYs",
      children: VpnCategories,
    },
    {
      imageUrl: "/assets/product/internet-websites.png",
      label: "Websites",
      children: WebsitesCategories,
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
    // {
    //   imageUrl: "/assets/icons/toolsandre.png",
    //   label: "Tools & Resources",
    //   children: ToolsAndResources
    // },
    {
      imageUrl: "/assets/icons/others.png",
      label: "Others",
      children: [
        {
          label: "Other",
          value: AccountCategory.Other,
          imageUrl: "/assets/icons/other.png",
        },
      ],
    },
  ];
  const selectedCategories = useAppSelector(
    (state) => state.categories.selectedCategories
  );
  const dispatch = useAppDispatch();

  return (
    <div className="h-[calc(100dvh-200px)] overflow-auto no-scrollbar">
      {!isHideTitle && (
        <h2 className="font-bold text-textBlack 2xl:text-lg pb-2 px-6">
          Filter
        </h2>
      )}

      {/* this is account category div  */}
      <div className={`${isHideTitle && "pt-3"}`}>
        <h3 className="border-b border-b-borderColor px-4 md:px-5 pb-2 md:pb-4 text-textBlack font-medium">
          Account Category
        </h3>

        <div className="pt-2 h-[40dvh] lg:h-[35dvh] 2xl:h-[calc(100dvh-500px)] no-scrollbar overflow-y-auto">
          {sidebarMenu.map((sidebar: any) => (
            <MarketPlaceSidebarFilterElement
              key={sidebar?.label}
              sidebar={sidebar}
            />
          ))}
        </div>

        {selectedCategories && selectedCategories.length > 0 && (
          <div className="flex justify-end px-4">
            <AppButton
              size="small"
              label="Reset Filter"
              className="w-fit"
              onClick={() => dispatch(clearSelectedCategories())}
            />
          </div>
        )}

        {/* this is price range  */}
        <div className="mb-2 pb-2 px-2 md:px-4 md:pb-4">
          <h4>Price range</h4>
          <PriceRange />
        </div>
      </div>
    </div>
  );
};

export default MarketplaceSidebar;
