import { useGetMyCartsQuery } from "@/redux/features/cart/cartApi";
import { ICart } from "@/types/common";
import config from "@/utils/config";
import CartAccountCard from "./CartAccountCard";
import { PiCurrencyDollarBold } from "react-icons/pi";
import Link from "next/link";
import Image from "next/image";

export default function CartPopUpBody() {
  const { data: cartsInfo, isLoading: isCartLoading } = useGetMyCartsQuery("");
  const myCarts = (cartsInfo?.data as ICart[]) || ([] as ICart[]);

  const mainData = cartsInfo?.data as ICart[];
  const totalPrice = mainData?.reduce((pre, current) => {
    if (current.account?.price) {
      return current.account?.price + pre;
    }
    return 0;
  }, 0);

  const ServiceCharge = (
    (totalPrice / 100) *
    config.accountSellServiceCharge
  ).toFixed(2);

  const mainPrice = totalPrice + parseFloat(ServiceCharge);

  return (
    <div className="divide-y max-w-full md:min-w-80 md:max-w-80">
      {myCarts.length > 0 ? (
        <>
          <div className="overflow-y-auto max-h-[50dvh]">
            {myCarts?.map((account, index) => (
              <CartAccountCard account={account} key={index} />
            ))}
          </div>
          <div className="pt-1">
            <h4 className="text-end">Summary</h4>
            <div className="py-1">
              <div className="flex items-center justify-end gap-4">
                <p className="textG">Subtotal:</p>
                <h2 className="text-textBlack font-bold flex items-center">
                  <PiCurrencyDollarBold />
                  {totalPrice}
                </h2>
              </div>
              <div className="flex items-center justify-end gap-4">
                <p className="textG">Service charge (10%):</p>
                <h2 className="text-textBlack font-bold flex items-center">
                  <PiCurrencyDollarBold />
                  {ServiceCharge}
                </h2>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 pb-2">
              <p className="textB">Total:</p>
              <h2 className="text-textBlack font-bold flex items-center">
                <PiCurrencyDollarBold />
                {mainPrice}
              </h2>
            </div>
          </div>

          <Link href={"shopping-cart"}>
            <button className="appBtn w-full">
              Checkout {myCarts.length > 0 && `( ${myCarts.length} )`}
            </button>
          </Link>
        </>
      ) : (
        <div className="p-4 text-[#828D99] flex items-center justify-center flex-col gap-2">
          <Image
            width={80}
            height={80}
            className="size-20 object-contain"
            src={"/assets/icons/empty-cart.png"}
            alt="country icon"
          />
          Shopping cart is empty
        </div>
      )}
    </div>
  );
}
