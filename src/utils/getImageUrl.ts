import { ACCOUNT_CATEGORIES } from "@/shared";
import { AccountCategory } from "@/types/common";

interface IProduct_Category {
  label: string;
  value: AccountCategory;
  imageUrl: string;
}

export function getImageUrlByCategory(categoryName: AccountCategory): string {
  return (
    ACCOUNT_CATEGORIES.find((single) => single.value === categoryName)
      ?.imageUrl || ""
  );
}
