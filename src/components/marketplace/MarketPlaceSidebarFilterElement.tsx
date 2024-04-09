import Image from "next/image";
import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import { motion } from "framer-motion";
import { Checkbox } from "antd";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { toggleCategory } from "@/redux/features/categories/categorySlice";
import { toast } from "react-toastify";
import { AccountCategory } from "@/types/common";

type TMarketPlaceSidebarFilterElement = {
  sidebar: {
    imageUrl: string;
    label: string;
    children?: {
      label: string;
      value: AccountCategory;
      imageUrl: string;
    }[];
  };
};

const MarketPlaceSidebarFilterElement = ({
  sidebar,
}: TMarketPlaceSidebarFilterElement) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const selectedCategories = useAppSelector(
    (state) => state.categories.selectedCategories
  );

  const selectedCount = useAppSelector(
    (state) => state.categories.selectedCount
  );

  const handleCategoryToggle = (category: string) => {
    dispatch(toggleCategory(category));
  };

  const handleToggleClick = (category: string) => {
    handleCategoryToggle(category);
    // if (selectedCount < 4 || selectedCategories.includes(category)) {
    // } else {
    //     toast.warn("You can select up to four categories.");
    // }
  };

  return (
    <div className="px-5 py-1.5 2xl:py-2.5">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between cursor-pointer"
      >
        <h2 className="flex items-center gap-1 2xl:gap-1.5 text-sm md:text-base font-medium text-textBlack">
          <Image
            className="size-5"
            width={120}
            height={120}
            quality={100}
            src={sidebar?.imageUrl}
            alt="icon image"
          />{" "}
          {sidebar?.label}
        </h2>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="cursor-pointer"
        >
          <SlArrowDown />
        </motion.div>
      </div>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden px-1 py-2"
        >
          {sidebar?.children &&
            sidebar?.children.map((item) => (
              <div key={item?.label} className="flex items-center gap-1.5 py-1">
                <Checkbox
                  id={item?.value}
                  checked={selectedCategories.includes(item.value)}
                  onChange={() => handleToggleClick(item.value)}
                />
                <label
                  htmlFor={item?.label}
                  className="cursor-pointer text-textBlack text-sm md:text-base flex items-center gap-2"
                >
                  <Image
                    width={16}
                    height={16}
                    src={item?.imageUrl}
                    alt="logo"
                  />
                  {item?.label}
                </label>
              </div>
            ))}
        </motion.div>
      )}
    </div>
  );
};

export default MarketPlaceSidebarFilterElement;
