import CartAccountCard from "@/components/shared/CartAccountCard";
import HomeLayout from "@/layout/HomeLayout";
import PrivateLayout from "@/layout/PrivateLayout";
import { useGetMyCartsQuery } from "@/redux/features/cart/cartApi";
import { useGetCurrencyOfLoggedInUserQuery } from "@/redux/features/currency/currencyApi";
import { useAddOrderMutation } from "@/redux/features/order/orderApi";
import { ICart } from "@/types/common";
import config from "@/utils/config";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CiWallet } from "react-icons/ci";
import { PiCurrencyDollarBold } from "react-icons/pi";
import { toast } from "react-toastify";

export default function ShoppingCart() {
    const { data: cartsInfo, isLoading: isCartLoading } = useGetMyCartsQuery("");
    const myCarts = (cartsInfo?.data as ICart[]) || ([] as ICart[]);

    const [successStatus, setSuccessStatus] = useState({
        totalItems: 0,
        isDone: false,
    });
    const [
        makeOrder,
        { isError: isOrderError, isLoading: isOrderLoading, isSuccess },
    ] = useAddOrderMutation();
    const {
        data,
        isLoading: isCurrencyLoading,
        isError: isCurrencyError,
    } = useGetCurrencyOfLoggedInUserQuery("");

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

    const handleClick = () => {
        const currency = data?.data?.amount;
        if (currency < mainPrice) {
            toast.error("Sorry you don't have enough money", { toastId: 1 });
            return;
        } else {
            setSuccessStatus({ isDone: true, totalItems: mainData.length });
            toast.success("Order placed successful", { toastId: 1 });
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
            <PrivateLayout>
                <div className="container py-5 md:py-10 2xl:py-12">
                    {/* this is top section div  */}
                    <div>
                        <h2 className="title">Shopping cart</h2>
                    </div>

                    {/* this is main div  */}
                    <div className="flex flex-col md:flex-row gap-4 min-h-[80dvh] 2xl:gap-6 pt-2 md:pt-4 lg:pt-5 2xl:pt-6">
                        <div className="p-4 md:w-[60%] min-h-full bg-white max-h-[60dvh] overscroll-auto md:max-h-[80dvh]">
                            <h3 className="font-medium">All Items ({myCarts.length})</h3>
                            {myCarts.length > 0 ?
                                <>
                                    {myCarts?.map((account, index) => (
                                        <CartAccountCard account={account} key={index} isModal={isCartLoading || isOrderLoading || isCurrencyLoading} />
                                    ))}
                                </>
                                :
                                <div className='px-4 py-12 text-[#828D99] flex items-center justify-center flex-col gap-2'>
                                    <Image width={80} height={80} className="size-20 object-contain" src={'/assets/icons/empty-cart.png'} alt="country icon" />
                                    Shopping cart is empty
                                </div>
                            }
                        </div>
                        <div className="hidden md:block border border-[#E1DBDB]"></div>
                        <div className="w-full md:w-[37%] min-h-full overflow-y-auto bg-white p-2 md:p-4 2xl:p-6">
                            {myCarts.length > 0 &&
                                <>
                                    <h2 className="subTitle">Order Summary</h2>
                                    <div className='pt-4'>
                                        <h4>Summary</h4>
                                        <div className='py-3'>
                                            <div className='flex items-center justify-between'>
                                                <p className="textG">Subtotal:</p>
                                                <h2 className="text-textBlack font-bold flex items-center"><PiCurrencyDollarBold />{totalPrice}</h2>
                                            </div>
                                            <div className='flex items-center justify-between'>
                                                <p className="textG">Service charge (10%):</p>
                                                <h2 className="text-textBlack font-bold flex items-center"><PiCurrencyDollarBold />{ServiceCharge}</h2>
                                            </div>
                                        </div>
                                        <div className='flex items-center justify-between'>
                                            <p className="textB">Total:</p>
                                            <h2 className="text-textBlack font-bold flex items-center"><PiCurrencyDollarBold />{mainPrice}</h2>
                                        </div>
                                        <div className='flex items-center justify-between py-6'>
                                            <p className="textB">Payment Method:</p>
                                            <h2 className="text-textBlack font-bold flex gap-1 items-center"><CiWallet className="text-xl" />My Wallet</h2>
                                        </div>
                                        {isCartLoading || isOrderLoading || isCurrencyLoading ?
                                            <button className="appBtn px-10 flex items-center justify-center w-full"><AiOutlineLoading3Quarters className="animate-spin text-white text-xl" /></button>
                                            :
                                            (data?.data?.amount < mainPrice) ?
                                                <div className=''>
                                                    <button className="appBtn bg-primary/50 border-none hover:bg-primary/50 w-full flex items-center gap-2 justify-center "><span>Pay</span>  {mainPrice}</button>
                                                    <p className="text-textGreyBlack pt-2 text-sm">Your wallet have not enough money for pay.</p>
                                                </div>
                                                : <button onClick={handleClick} className="appBtn w-full flex items-center gap-2 justify-center "><span>Pay</span>  {mainPrice}</button>
                                        }
                                    </div>
                                </>
                            }

                        </div>
                    </div>
                </div>
            </PrivateLayout>
        </HomeLayout>
    );
};
