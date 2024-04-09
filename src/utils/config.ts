/* eslint-disable no-undef */

const config = {
  fundMinMoney: parseFloat(process.env.NEXT_PUBLIC_MIN_ADDFOUND as string),
  sellerPay: parseFloat(process.env.NEXT_PUBLIC_SELLER_PAY as string),
  serverUrl: process.env.NEXT_PUBLIC_SERVER_URL,
  withdrawalPercentage: parseFloat(
    process.env.NEXT_PUBLIC_WITHDRAWAL_PERCENTAGE as string
  ),
  accountSellServiceCharge: parseFloat(
    process.env.NEXT_PUBLIC_ACCOUNT_SELL_SERVICE_CHARGE as string
  ),
  withdrawalMinMoney: parseFloat(
    process.env.NEXT_PUBLIC_WITHDRAWAL_MIN_MONEY as string
  ),
  withdrawalMaxMoney: parseFloat(
    process.env.NEXT_PUBLIC_WITHDRAWAL_MAX_MONEY as string
  ),
  calculationMoneyRound: parseInt(
    process.env.NEXT_PUBLIC_CALCULATION_MONEY_ROUND as string
  ),
  accountSellPercentage: parseFloat(
    process.env.NEXT_PUBLIC_ACCOUNT_SELL_PERCENTAGE as string
  ),
  topupMax: parseFloat(process.env.NEXT_PUBLIC_TOPUP_MAX as string),
  dollarRate: parseFloat(process.env.NEXT_PUBLIC_DOLLAR_RATE as string),
};

export default config;
