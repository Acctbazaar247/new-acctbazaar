import { AccountCategory } from "@/types/common";

interface IProduct_Category {
  label: string;
  value: AccountCategory;
  imageUrl: string;
}
export const WebsitesCategories: IProduct_Category[] = [
  {
    label: "Website",
    value: AccountCategory.Website,
    imageUrl: "/assets/product/website.png"
  },
  {
    label: "Onlyfans",
    value: AccountCategory.OnlyFans,
    imageUrl: "/assets/product/onlyfans.png"
  },
  {
    label: "Crypto websites",
    value: AccountCategory.CryptoWebsite,
    imageUrl: "/assets/product/crypto-website.png"
  }
];
export const ToolsAndResources: IProduct_Category[] = [
  {
    label: "Tickets",
    value: AccountCategory.Tickets,
    imageUrl: "/assets/product/tickets.png"
  },
  {
    label: "Tutorials",
    value: AccountCategory.Tutorials,
    imageUrl: "/assets/product/tutorials.png"
  },
  {
    label: "Formats",
    value: AccountCategory.Formats,
    imageUrl: "/assets/product/formats.png"
  },
  {
    label: "Accounts",
    value: AccountCategory.Accounts,
    imageUrl: "/assets/product/accounts.png"
  },
  {
    label: "CreditCards",
    value: AccountCategory.CreditCards,
    imageUrl: "/assets/product/credit-cards.png"
  },
  {
    label: "Software",
    value: AccountCategory.Software,
    imageUrl: "/assets/product/software.png"
  },
  {
    label: "Logs",
    value: AccountCategory.Logs,
    imageUrl: "/assets/product/logs.png"
  },
  {
    label: "Tools",
    value: AccountCategory.Tools,
    imageUrl: "/assets/product/tools.png"
  },
  {
    label: "Delivery",
    value: AccountCategory.Delivery,
    imageUrl: "/assets/product/delivery.png"
  }
];
export const GiftCardCategories: IProduct_Category[] = [
  {
    label: "Amazon ",
    value: AccountCategory.AmazonGiftCard,
    imageUrl: "/assets/product/amazon-giftcard.png"
  },
  {
    label: "Amex ",
    value: AccountCategory.AmexGiftCard,
    imageUrl: "/assets/product/amex-giftcard.png"
  },
  {
    label: "Ebay ",
    value: AccountCategory.EbayGiftCard,
    imageUrl: "/assets/product/ebay-giftcard.png"
  },
  {
    label: "Google Play ",
    value: AccountCategory.GooglePlayGiftCard,
    imageUrl: "/assets/product/googlepay-giftcard.png"
  },
  {
    label: "Nike ",
    value: AccountCategory.NikeGiftCard,
    imageUrl: "/assets/product/nike-giftcard.png"
  },
  {
    label: "NordStrom  ",
    value: AccountCategory.NordStromGiftCard,
    imageUrl: "/assets/product/nordstorm-giftcard.png"
  },
  {
    label: "Playstation ",
    value: AccountCategory.PlaystationGiftCard,
    imageUrl: "/assets/product/playstation-giftcard.png"
  },
  {
    label: "Sephora ",
    value: AccountCategory.SephoraGiftCard,
    imageUrl: "/assets/product/sephora-giftcard.png"
  },
  {
    label: "Steam ",
    value: AccountCategory.SteamGiftCard,
    imageUrl: "/assets/product/steam-giftcard.png"
  }
];
export const SocialMediaCategories: IProduct_Category[] = [
  {
    label: "Facebook",
    value: AccountCategory.Facebook,
    imageUrl: "/assets/product/facebook.png"
  },
  {
    label: "Twitter",
    value: AccountCategory.Twitter,
    imageUrl: "/assets/product/twitter.png"
  },
  {
    label: "Instagram",
    value: AccountCategory.Instagram,
    imageUrl: "/assets/product/instagram.png"
  },
  {
    label: "LinkedIn",
    value: AccountCategory.LinkedIn,
    imageUrl: "/assets/product/linkedin.png"
  },
  {
    label: "Pinterest",
    value: AccountCategory.Pinterest,
    imageUrl: "/assets/product/pinterest.png"
  },
  {
    label: "Snapchat",
    value: AccountCategory.Snapchat,
    imageUrl: "/assets/product/snapchat.png"
  },
  {
    label: "TikTok",
    value: AccountCategory.TikTok,
    imageUrl: "/assets/product/tiktok.png"
  },
  {
    label: "Threads",
    value: AccountCategory.Threads,
    imageUrl: "/assets/product/threads.png"
  },
  {
    label: "Tinder",
    value: AccountCategory.Tinder,
    imageUrl: "/assets/product/tinder.png"
  },
  {
    label: "Bumble",
    value: AccountCategory.Bumble,
    imageUrl: "/assets/product/bumble.png"
  },
  {
    label: "Reddit",
    value: AccountCategory.Reddit,
    imageUrl: "/assets/product/reddit.png"
  },
  {
    label: "Discord",
    value: AccountCategory.Discord,
    imageUrl: "/assets/product/discord.png"
  },
  {
    label: "Pof",
    value: AccountCategory.Pof,
    imageUrl: "/assets/product/pof.png"
  },
  {
    label: "Hinge",
    value: AccountCategory.Hinge,
    imageUrl: "/assets/product/hinge.png"
  },
  {
    label: "Grindr",
    value: AccountCategory.Grindr,
    imageUrl: "/assets/product/grindr.png"
  },
  {
    label: "Viber",
    value: AccountCategory.Viber,
    imageUrl: "/assets/product/viber.png"
  },
  {
    label: "GMX",
    value: AccountCategory.GMX,
    imageUrl: "/assets/product/gMX.png"
  },
  {
    label: "Quora",
    value: AccountCategory.Quora,
    imageUrl: "/assets/product/quora.png"
  },
  {
    label: "Match",
    value: AccountCategory.Match,
    imageUrl: "/assets/product/match.png"
  },
  {
    label: "Ourtime",
    value: AccountCategory.Ourtime,
    imageUrl: "/assets/product/ourtime.jpg"
  },
  {
    label: "Hellotalk",
    value: AccountCategory.Hellotalk,
    imageUrl: "/assets/product/hellotalk.png"
  },
  {
    label: "Zoosk",
    value: AccountCategory.Zoosk,
    imageUrl: "/assets/product/zoosk.png"
  },
  {
    label: "Okcupid",
    value: AccountCategory.Okcupid,
    imageUrl: "/assets/product/okcupid.png"
  },
  {
    label: "SMSmode",
    value: AccountCategory.SMSmode,
    imageUrl: "/assets/product/sMSmode.png"
  }
];

export const GamingAccountCategories = [
  {
    label: "Playstation",
    value: AccountCategory.Playstation,
    imageUrl: "/assets/product/playstation.png"
  },
  {
    label: "Call of Duty",
    value: AccountCategory.CallOfDuty,
    imageUrl: "/assets/product/callofduty.png"
  },
  {
    label: "PUBG",
    value: AccountCategory.Pubg,
    imageUrl: "/assets/product/pubg.png"
  },
  {
    label: "Steam",
    value: AccountCategory.Steam,
    imageUrl: "/assets/product/steam.png"
  },
  {
    label: "GTA",
    value: AccountCategory.Gta,
    imageUrl: "/assets/product/gta.png"
  },
  {
    label: "Fortnite",
    value: AccountCategory.Fortnite,
    imageUrl: "/assets/product/fortnite.png"
  },
  {
    label: "Epic",
    value: AccountCategory.Epic,
    imageUrl: "/assets/product/epic.png"
  }
];

export const EmailMessagingCategories: IProduct_Category[] = [
  {
    label: "Gmail",
    value: AccountCategory.Gmail,
    imageUrl: "/assets/product/gmail.png"
  },
  {
    label: "Ymail",
    value: AccountCategory.Ymail,
    imageUrl: "/assets/product/yahoo.png"
  },
  {
    label: "Hotmail",
    value: AccountCategory.Hotmail,
    imageUrl: "/assets/product/hotmail.jpg"
  },
  {
    label: "MailRu",
    value: AccountCategory.MailRu,
    imageUrl: "/assets/product/mailru.png"
  },
  {
    label: "Outlook",
    value: AccountCategory.Outlook,
    imageUrl: "/assets/product/outlook.png"
  },
  {
    label: "Whatsapp",
    value: AccountCategory.Whatsapp,
    imageUrl: "/assets/product/whatsapp.png"
  },
  {
    label: "Google Voice",
    value: AccountCategory.GoogleVoice,
    imageUrl: "/assets/product/google-voice.png"
  },
  {
    label: "Telegram",
    value: AccountCategory.Telegram,
    imageUrl: "/assets/product/telegram.png"
  },
  {
    label: "WeChat",
    value: AccountCategory.WeChat,
    imageUrl: "/assets/product/wechat.png"
  },
  {
    label: "TextNow",
    value: AccountCategory.TextNow,
    imageUrl: "/assets/product/textnow.png"
  },
  {
    label: "TextPlus",
    value: AccountCategory.TextPlus,
    imageUrl: "/assets/product/textplus.png"
  },
  {
    label: "Signal",
    value: AccountCategory.Signal,
    imageUrl: "/assets/product/signal.png"
  }
];
export const VpnCategories: IProduct_Category[] = [
  {
    label: "Windscribe",
    value: AccountCategory.Windscribe,
    imageUrl: "/assets/product/windscribe.png"
  },
  {
    label: "Nord",
    value: AccountCategory.Nord,
    imageUrl: "/assets/product/nord.png"
  },
  {
    label: "911 Proxy",
    value: AccountCategory.Vpn911,
    imageUrl: "/assets/product/vpn_911.png"
  },
  {
    label: "Pia",
    value: AccountCategory.Pia,
    imageUrl: "/assets/product/pia.png"
  },
  {
    label: "Express",
    value: AccountCategory.Express,
    imageUrl: "/assets/product/express.png"
  },
  {
    label: "IP VANISH",
    value: AccountCategory.IpVanish,
    imageUrl: "/assets/product/ipvanish.png"
  },
  {
    label: "CyberGhost",
    value: AccountCategory.CyberGhost,
    imageUrl: "/assets/product/cyberghost.png"
  },
  {
    label: "Private",
    value: AccountCategory.Private,
    imageUrl: "/assets/product/private.png"
  },
  {
    label: "Total",
    value: AccountCategory.Total,
    imageUrl: "/assets/product/total.png"
  },
  {
    label: "Surfshark",
    value: AccountCategory.Surfshark,
    imageUrl: "/assets/product/surfshark.png"
  }
];

export const EcommerceCategories: IProduct_Category[] = [
  {
    label: "Aliexpress",
    value: AccountCategory.Aliexpress,
    imageUrl: "/assets/product/aliexpress.png"
  },
  {
    label: "Alibaba",
    value: AccountCategory.Alibaba,
    imageUrl: "/assets/product/alibaba.png"
  },
  {
    label: "Amazon",
    value: AccountCategory.Amazon,
    imageUrl: "/assets/product/amazon.png"
  },
  {
    label: "Shopify",
    value: AccountCategory.Shopify,
    imageUrl: "/assets/product/shopify.png"
  },
  {
    label: "Ebay",
    value: AccountCategory.Ebay,
    imageUrl: "/assets/product/ebay.png"
  }
];

export const AccountsSubscriptionsCategories: IProduct_Category[] = [
  {
    label: "Netflix",
    value: AccountCategory.Netflix,
    imageUrl: "/assets/product/netflix.png"
  },
  {
    label: "Apple",
    value: AccountCategory.Apple,
    imageUrl: "/assets/product/apple.png"
  },
  {
    label: "TrustWallet",
    value: AccountCategory.TrustWallet,
    imageUrl: "/assets/product/trust-wallet.png"
  },
  {
    label: "Prime Videos",
    value: AccountCategory.AmazonPrimeVideos,
    imageUrl: "/assets/product/prime.png"
  },
  {
    label: "Apple Music",
    value: AccountCategory.AppleMusic,
    imageUrl: "/assets/product/applemusic.png"
  },
  {
    label: "Apple TV",
    value: AccountCategory.AppleTv,
    imageUrl: "/assets/product/appletv.png"
  },
  {
    label: "Spotify",
    value: AccountCategory.Spotify,
    imageUrl: "/assets/product/spotify.png"
  },
  {
    label: "Audiomack",
    value: AccountCategory.Audiomack,
    imageUrl: "/assets/product/audio-mac.png"
  },
  {
    label: "YouTube",
    value: AccountCategory.YouTube,
    imageUrl: "/assets/product/youtube.png"
  },
  {
    label: "GitHub",
    value: AccountCategory.GitHub,
    imageUrl: "/assets/product/github.png"
  },
  {
    label: "Canva",
    value: AccountCategory.Canva,
    imageUrl: "/assets/product/canva.png"
  },
  {
    label: "ChatGPT",
    value: AccountCategory.ChatGPT,
    imageUrl: "/assets/product/chatgpt.png"
  },
  {
    label: "Office365",
    value: AccountCategory.Office365,
    imageUrl: "/assets/product/office365.png"
  }
];
export const ACCOUNT_CATEGORIES: IProduct_Category[] = [
  ...SocialMediaCategories,
  ...GamingAccountCategories,
  ...EmailMessagingCategories,
  ...VpnCategories,
  ...EcommerceCategories,
  ...AccountsSubscriptionsCategories,
  ...WebsitesCategories,
  ...ToolsAndResources,
  {
    label: "Other",
    value: AccountCategory.Other,
    imageUrl: "/assets/other.png"
  },
  // new added git card
  ...GiftCardCategories
];

export function findImageUrlByCategory(categoryName: AccountCategory): string {
  return (
    ACCOUNT_CATEGORIES.find((single) => single.value === categoryName)
      ?.imageUrl || ""
  );
}
