import { message } from "antd";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface IMeta {
  limit: number;
  page: number;
  total: number;
}

export type ResponseSuccessType = {
  length: number;
  data: any;
  meta?: IMeta;
  success: boolean;
  message: string;
};

export type ResponseErrorType = {
  status: number;
  data: IGenericErrorResponse;
};

export type IGenericErrorResponse = {
  url(url: any): unknown;
  success: boolean;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericErrorMessage = {
  path: string | number;
  message: string;
};

export interface IFaq {
  id: string;
  question: string;
  answer: string;
  createAt: string;
}
export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  phoneNumber?: string;
  address?: string;
  state: string;
  country: string;
  city: string;
  dateOfBirth: string;
  txId?: string;
  isVerified?: Boolean;
  isApprovedForSeller?: Boolean;
  isBlocked?: Boolean;
  shouldSendEmail?: Boolean;
  isVerifiedByAdmin: boolean;
  profileImg: string | null;
  isPaidForSeller?: boolean;
  withdrawalPin: string;
  updatedAt: string;
  Currency?: {
    amount: number;
  };
}

export interface IAllCategoryOfPcService {
  _count: {
    _all: number;
  };
  _min: {
    price: number;
    thumbnail: string;
  };
  category: string;
}

export enum UserRole {
  User = "user",
  Admin = "admin",
  Seller = "seller",
  SuperAdmin = "superAdmin",
}

export enum AccountCategory {
  // Social media accounts
  Facebook = "Facebook",
  Twitter = "Twitter",
  Instagram = "Instagram",
  LinkedIn = "LinkedIn",
  Pinterest = "Pinterest",
  Snapchat = "Snapchat",
  TikTok = "TikTok",
  Threads = "Threads",
  Tinder = "Tinder",
  Bumble = "Bumble",
  Reddit = "Reddit",
  Discord = "Discord",

  // Gaming accounts
  Playstation = "Playstation",
  CallOfDuty = "CallOfDuty",
  Pubg = "Pubg",
  Steam = "Steam",
  Gta = "Gta",
  Fortnite = "Fortnite",
  Epic = "Epic",

  // Email and messaging accounts
  Gmail = "Gmail",
  Ymail = "Ymail",
  Hotmail = "Hotmail",
  MailRu = "MailRu",
  Outlook = "Outlook",
  Whatsapp = "Whatsapp",
  GoogleVoice = "GoogleVoice",
  Telegram = "Telegram",
  WeChat = "WeChat",
  TextNow = "TextNow",
  TextPlus = "TextPlus",

  // VPN accounts
  Windscribe = "Windscribe",
  Nord = "Nord",
  Vpn911 = "Vpn911",
  Pia = "Pia",
  Express = "Express",
  IpVanish = "IpVanish",
  CyberGhost = "CyberGhost",
  Private = "Private",
  Total = "Total",

  // E-commerce
  Aliexpress = "Aliexpress",
  Alibaba = "Alibaba",
  Amazon = "Amazon",
  Shopify = "Shopify",
  Ebay = "Ebay",

  // Accounts & Subscriptions
  Netflix = "Netflix",
  Apple = "Apple",
  TrustWallet = "TrustWallet",
  Prime = "Prime",
  AmazonPrimeVideos = "AmazonPrimeVideos",
  AppleMusic = "AppleMusic",
  AppleTv = "AppleTv",
  Spotify = "Spotify",
  Audiomack = "Audiomack",
  YouTube = "YouTube",
  GitHub = "GitHub",
  Canva = "Canva",
  ChatGPT = "ChatGPT",
  Office365 = "Office365",

  // Gift card accounts
  AmazonGiftCard = "AmazonGiftCard",
  AmexGiftCard = "AmexGiftCard",
  EbayGiftCard = "EbayGiftCard",
  GooglePlayGiftCard = "GooglePlayGiftCard",
  NikeGiftCard = "NikeGiftCard",
  NordStromGiftCard = "NordStromGiftCard",
  PlaystationGiftCard = "PlaystationGiftCard",
  SephoraGiftCard = "SephoraGiftCard",
  SteamGiftCard = "SteamGiftCard",

  // Other types of accounts
  Other = "Other",
}

export enum BookingStatus {
  PENDING = "PENDING",
  ACCEPT = "ACCEPT",
  REJECT = "REJECT",
  COMPLETE = "COMPLETE",
  CANCELED = "CANCELED",
  // Add more status options as needed
}

export interface IOrder {
  id: string;
  accountId: string;
  account: IAccount;
  orderById: string;
  orderBy: IUser;
  createdAt: Date;
  updatedAt: Date;
  status: EOrderStatus | null;
  Message: IMessage[];
  SeenMessage: ISeenMessage[];
}

enum EOrderStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum EApprovedForSale {
  pending = "pending",
  approved = "approved",
  denied = "denied",
}

export enum AccountType {
  SocialMedia = "SocialMedia",
  Game = "Game",
  Email = "Email",
  Vpn = "Vpn",
  GiftCard = "GiftCard",
  Other = "Other",
}

export interface IAccount {
  id: string;
  name: string;
  username: string;
  password: string;
  description: string;
  preview?: string;
  additionalEmail?: string;
  additionalPassword?: string;
  additionalDescription?: string;
  price: number;
  accountType: AccountType;
  category: AccountCategory;
  createdAt: Date;
  shouldSendEmail: boolean;
  isApprovedForSeller: boolean;
  updatedAt: Date;
  approvedForSale: EApprovedForSale;
  isSold: Boolean;
  ownById: string;
  ownBy?: IUser;
  Orders: IOrder[];
}

export interface Booking {
  id: string;
  userId: string;
  pcServiceId: string;
  scheduleDate: Date;
  status: BookingStatus;
  messageByAdmin?: string | null;
  adjustedSchedule?: Date | null;
  address: string;
  createdAt: Date;
  updatedAt: Date;
  user?: IUser;
}

export enum EStatusOfWithdrawalRequest {
  pending = "pending",
  approved = "approved",
  denied = "denied",
}

export interface IWithdrawalRequest {
  id: string;
  message?: string;
  amount: number;
  ownById: string;
  status: EStatusOfWithdrawalRequest;
  fullName?: string;
  accountNumber?: string;
  bankName?: string;
  walletAddress?: string;
  isTrc?: boolean;
  ownBy?: IUser;
  createdAt: Date;
  updatedAt: Date;
}
// export interface Cart {
//   id: string;
//   userId: string;
//   pcServiceId: string;
//   createdAt: Date;
//   updatedAt: Date;
//   user?: IUser;
//   pcService: PcService;
// }

export interface IBlog {
  id: string;
  title: string;
  thumbnails: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
}

export interface IFeedback {
  id: string;
  title: string;
  comment: string;
  userId: string;
  user?: IUser;
  createAt: string;
}
export interface INavItems {
  to: string;
  matchUrl: string;
  name: string;
  icon: IconDefinition;
}

export interface IOverviewCategoryStatus {
  pcServiceId: string;
  name: string;
  count: number;
}
export interface IOverviewBookingStatus {
  _count: number;
  status: BookingStatus;
}
export interface IAdminOverViewStatus {
  bookingStatus: IOverviewBookingStatus[];
  categoryStatus: IOverviewCategoryStatus[];
  totalUser: number;
  totalFeedback: number;
  totalReviews: number;
  totalCarts: number;
  totalBlog: number;
  totalFaq: number;
  totalService: number;
}
export interface ICart {
  id: string;
  accountId: string;
  account?: IAccount;
  ownById: string;
  ownBy?: IUser;
  createdAt: Date;
  updatedAt: Date;
}
export type TAdminOverview = {
  totalAccount: number;
  totalSoldAccount: number;
  totalUser: number;
  totalEarning: number;
};
export type TSellerOverview = {
  totalAccount: number;
  totalSoldAccount: number;
  totalOrder: number;
  totalMoney: number;
};
export type TUserOverview = {
  totalAccountOnCart: number;
  totalOrder: number;
  totalMoney: number;
};

export interface IMessage {
  id: string;
  orderId: string;
  order?: IOrder;
  text?: string | null;
  image?: string | null;
  replyId?: string | null;
  sendById: string;
  sendBy?: IUser;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISeenMessage {
  id: string;
  orderId: string;
  order: IOrder;
  seenById: string;
  seenBy?: IUser;
  createdAt: Date;
  updatedAt: Date;
  lastSeen: Date;
}
export interface INotifications {
  id: string;
  title: string;
  message: string;
  link?: string | null;
  isSeen: boolean;
  ownById: string;
  ownBy?: IUser;
  createdAt: Date;
  updatedAt: Date;
}
