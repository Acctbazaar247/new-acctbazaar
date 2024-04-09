import { setPrice } from '@/redux/features/marketplace/marketplaceSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import React from 'react';
import { PiCurrencyDollarBold } from 'react-icons/pi';

const PriceRange = () => {

    const priceGap = 1;
    const highestMaxPrice = 1000;
    const lowestMinPrice = 0;

    const dispatch = useAppDispatch();
    const { minPrice, maxPrice } = useAppSelector(state => state.marketplace);

    const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMinPrice = parseInt(e.target.value);
        if (newMinPrice <= maxPrice && maxPrice - newMinPrice >= priceGap && newMinPrice >= lowestMinPrice) {
            dispatch(setPrice({ minPrice: newMinPrice, maxPrice }));
        } else if (newMinPrice > maxPrice) {
            dispatch(setPrice({ minPrice: newMinPrice, maxPrice: newMinPrice }));
        }
    };

    const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMaxPrice = parseInt(e.target.value);
        if (newMaxPrice >= minPrice && newMaxPrice - minPrice >= priceGap && newMaxPrice <= highestMaxPrice) {
            dispatch(setPrice({ minPrice, maxPrice: newMaxPrice }));
        } else if (newMaxPrice < minPrice) {
            dispatch(setPrice({ minPrice: newMaxPrice, maxPrice: newMaxPrice }));
        }
    };

    const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMinPrice = parseInt(e.target.value);
        if (!isNaN(newMinPrice) && newMinPrice <= maxPrice && maxPrice - newMinPrice >= priceGap && newMinPrice >= lowestMinPrice) {
            dispatch(setPrice({ minPrice: newMinPrice, maxPrice }));
        }
    };

    const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMaxPrice = parseInt(e.target.value);
        if (!isNaN(newMaxPrice) && newMaxPrice >= minPrice && newMaxPrice - minPrice >= priceGap && newMaxPrice <= highestMaxPrice) {
            dispatch(setPrice({ minPrice, maxPrice: newMaxPrice }));
        }
    };

    return (
        <div className='pt-1'>
            <div className="h-2 md:h-2.5 bg-[#F8E2DD] rounded mt-2 relative">
                <div className="h-full bg-primary rounded absolute" style={{ left: `${(minPrice / highestMaxPrice) * 100}%`, right: `${100 - (maxPrice / highestMaxPrice) * 100}%` }} />
            </div>
            <div className="relative">
                <input
                    type="range"
                    className="w-full absolute -top-1.5 h-full pointer-events-none appearance-none bg-transparent"
                    min={lowestMinPrice}
                    max={highestMaxPrice}
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    step="1"
                />
                <input
                    type="range"
                    className="w-full absolute -top-1.5 h-full pointer-events-none appearance-none bg-transparent"
                    min={lowestMinPrice}
                    max={highestMaxPrice}
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    step="1"
                />
            </div>
            <div className="flex items-center gap-4 mt-6">
                <div className="flex-1 border border-borderColor rounded-lg px-2 md:px-3 lg:px-4 py-1 2xl:py-1.5 outline-none">
                    <label className='text-[#8B8B8B] text-xs'>Minimum</label>
                    <div className='flex items-center'>
                        <PiCurrencyDollarBold />
                        <input
                            type="number"
                            className="w-full border-none outline-none"
                            value={minPrice}
                            onChange={handleMinInputChange}
                        />
                    </div>
                </div>
                <div className="border border-borderColor w-3"></div>
                <div className="flex-1  border border-borderColor rounded-lg px-2 md:px-3 lg:px-4 py-1 2xl:py-1.5 outline-none">
                    <label className='text-[#8B8B8B] text-xs'>Maximum</label>
                    <div className='flex items-center'>
                        <PiCurrencyDollarBold />
                        <input
                            type="number"
                            className="w-full border-none outline-none"
                            value={maxPrice}
                            onChange={handleMaxInputChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PriceRange;