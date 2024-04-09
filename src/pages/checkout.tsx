import ErrorCompo from "@/components/ui/AppErrorComponent";
import Loading from "@/components/ui/Loading";
import HomeLayout from "@/layout/HomeLayout";
import {
  useDeleteCartMutation,
  useGetMyCartsQuery,
} from "@/redux/features/cart/cartApi";
import { useGetCurrencyOfLoggedInUserQuery } from "@/redux/features/currency/currencyApi";
import { useAddOrderMutation } from "@/redux/features/order/orderApi";
import { findImageUrlByCategory } from "@/shared";
import { ICart } from "@/types/common";
import config from "@/utils/config";
import { Image } from "antd";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

type Props = {};

function Checkout({ }: Props) {
  const [successStatus, setSuccessStatus] = useState({
    totalItems: 0,
    isDone: false,
  });
  const [deleteCart, { isLoading: isDeleteLoading }] = useDeleteCartMutation();
  const [
    makeOrder,
    { isError: isOrderError, isLoading: isOrderLoading, isSuccess },
  ] = useAddOrderMutation();
  const {
    data,
    isLoading: isCurrencyLoading,
    isError: isCurrencyError,
  } = useGetCurrencyOfLoggedInUserQuery("");
  const {
    data: cartsInfo,
    isError,
    isLoading: isCartLoading,
    isFetching: isCartFetching,
  } = useGetMyCartsQuery("");
  if (isCartLoading || isCartFetching) {
    return (
      <HomeLayout>
        <Loading></Loading>
      </HomeLayout>
    );
  } else if (isError) {
    return (
      <HomeLayout>
        <ErrorCompo></ErrorCompo>
      </HomeLayout>
    );
  }

  const mainData = cartsInfo.data as ICart[];
  const totalPrice = mainData.reduce((pre, current) => {
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
  const handleClick = () => {
    const currency = data.data.amount;
    if (currency < mainPrice) {
      toast.error("Sorry you don't have enough money", { toastId: 1 });
      return;
    } else {
      setSuccessStatus({ isDone: true, totalItems: mainData.length });
      mainData.forEach((ele) => {
        makeOrder({ accountId: ele.accountId })
          .unwrap()
          .then((res) => { })
          .catch((err) => {
            toast.error(err.message);
          });
      });
    }
  };

  return (
    <HomeLayout>
      <div className="bg-white shadow-xl mx-auto max-w-4xl w-11/12 rounded-md my-10 p-6">
        {/* Title */}
        <div className="mb-10">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-bold">Shopping Cart</h4>
            <div className="text-gray-600">{mainData.length} items</div>
          </div>
        </div>

        {/* Cart items */}
        {/* Repeat this block for each item in the cart */}

        {mainData?.length ? (
          <>
            <div>
              <div>
                {mainData.map((single) => (
                  <div key={single.id} className="border-t border-b py-4">
                    <div className="flex items-center">
                      <div className="w-16">
                        {single?.account?.category ? (
                          <Image
                            src={findImageUrlByCategory(
                              single?.account?.category
                            )}
                            alt="Shirt"
                            width={50}
                            height={50}
                            className="object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="flex-1 px-4">
                        <div className="text-gray-600">
                          {single.account?.name}
                        </div>
                        <div>{single.account?.description.slice(0, 60)}</div>
                      </div>
                      <div className="ml-auto flex items-center gap-2">
                        <span>$ {single.account?.price}</span>
                        <button
                          disabled={
                            isDeleteLoading ||
                            isCartLoading ||
                            successStatus.isDone
                          }
                          onClick={() => {
                            deleteCart(single.id);
                          }}
                        >
                          <span className="text-xl cursor-pointer">
                            &times;
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {/* ... */}

                {/* Back to shop */}
                <div className="mt-10">
                  <Link href={"/marketplace"} className="text-gray-600">
                    Back to shop
                  </Link>
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gray-200 rounded-md p-6 mt-10 text-gray-800">
              <h5 className="text-lg font-bold">Summary</h5>
              <hr className="my-4" />
              <div className="flex justify-between">
                <div>ITEMS {mainData.length}</div>
                <div>$ {totalPrice}</div>
              </div>
              <div className="flex pt-2 uppercase justify-between">
                <div>Service Charge {config.accountSellServiceCharge}%</div>
                <div>$ {ServiceCharge}</div>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between">
                  <div>TOTAL PRICE</div>
                  <div>$ {mainPrice}</div>
                </div>
              </div>
              {isOrderLoading || successStatus.isDone ? (
                <div className="text-center text-white mt-6 bg-black w-full py-2 rounded">
                  Loading...
                </div>
              ) : (
                <button
                  disabled={
                    isCartFetching ||
                    isCurrencyLoading ||
                    isCurrencyError ||
                    isOrderLoading
                  }
                  onClick={handleClick}
                  className="bg-black text-white w-full py-2 mt-6"
                >
                  Pay Now
                </button>
              )}
            </div>
          </>
        ) : successStatus.isDone ? (
          <>
            <h2 className="text-center text-xl">
              Thanks for your purchase. Go to your profile to view your items.
            </h2>
            <div className="flex justify-center mt-4 mb-4">
              <Link
                href={"/dashboard/myOrders"}
                className="px-4 py-2 bg-orange-600 text-white rounded"
              >
                My orders
              </Link>
            </div>
          </>
        ) : (
          <div>
            <h2 className="text-center mb-10">No accounts added to carts</h2>
          </div>
        )}
      </div>
    </HomeLayout>
  );
}

export default Checkout;
