export const config = {
  defaultPlanLimit: parseInt(
    process.env.NEXT_PUBLIC_NEXT_PUBLIC_DEFAULT_PLAN_LIMIT as string
  ),
  basicPlanLimit: parseInt(process.env.NEXT_PUBLIC_BASIC_PLAN_LIMIT as string),
  basicPlanPrice: parseFloat(
    process.env.NEXT_PUBLIC_BASIC_PLAN_PRICE as string
  ),
  basicPlanDays: parseInt(process.env.NEXT_PUBLIC_PRO_PLAN_DAYS as string),

  proPlanPrice: parseFloat(process.env.NEXT_PUBLIC_PRO_PLAN_PRICE as string),
  proPlanLimit: parseInt(process.env.NEXT_PUBLIC_PRO_PLAN_LIMIT as string),
  proPlanDays: parseInt(process.env.NEXT_PUBLIC_PRO_PLAN_DAYS as string),

  proPlusPlanPrice: parseFloat(
    process.env.NEXT_PUBLIC_PRO_PLUS_PLAN_PRICE as string
  ),
  proPlusPlanLimit: parseInt(
    process.env.NEXT_PUBLIC_PRO_PLUS_PLAN_LIMIT as string
  ),
  proPlusPlanDays: parseInt(
    process.env.NEXT_PUBLIC_PRO_PLUS_PLAN_DAYS as string
  ),

  referralBonus: process.env.NEXT_PUBLIC_REFERRAL_BONUS,
  referralPurchaseAmount: process.env.NEXT_PUBLIC_REFERRAL_PURCHASE_AMOUNT,
};
