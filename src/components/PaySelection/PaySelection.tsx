import { faBank, faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

type Props = {
  onChange?: (option: string | null) => void;
  handleCryptoClick?: () => void;
  handleBankClick?: () => void;
  isDisabled?: boolean;
  description?: string;
};

const PaySelection = ({
  onChange,
  handleCryptoClick,
  isDisabled,
  description,
  handleBankClick,
}: Props) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  useEffect(() => {
    if (onChange) {
      onChange(selectedOption);
    }
  }, [selectedOption, onChange]);
  const router = useRouter();
  return (
    <div>
      <div className=" ">
        <div className=" mt-2">
          <h1 className="text-xl font-semibold mb-1">Choose Payment Option</h1>
          {description ? <p className="">{description}</p> : null}
          {/* Radio buttons for payment options */}
          <div className="flex gap-4 mt-4">
            <button
              type="button"
              disabled={isDisabled}
              onClick={() => {
                if (handleBankClick) {
                  handleBankClick();
                }
                setSelectedOption("bank");
                // router.push("https://nowpayments.io/payment/?iid=4613115863");
              }}
              className={`w-full py-4 px-2 border rounded transition-all disabled:opacity-90 ${
                selectedOption === "bank"
                  ? "border-orange-300 bg-orange-500 text-white"
                  : "text-orange-500 border-orange-300"
              }`}
            >
              <div>
                {/* <img src="" alt="" /> */}
                <FontAwesomeIcon
                  className="text-5xl"
                  icon={faBank}
                ></FontAwesomeIcon>
                <p className="mt-2 ">Bank / Card Payment</p>
              </div>
            </button>
            <button
              type="button"
              disabled={isDisabled}
              onClick={() => {
                if (handleCryptoClick) {
                  handleCryptoClick();
                }
                setSelectedOption("crypto");
                // router.push("https://nowpayments.io/payment/?iid=4613115863");
              }}
              className={`w-full py-4 px-2 border rounded transition-all ${
                selectedOption === "crypto"
                  ? "border-orange-300 bg-orange-500 text-white"
                  : "text-orange-500 border-orange-300"
              }`}
            >
              <div>
                {/* <img src="" alt="" /> */}
                <FontAwesomeIcon
                  className="text-5xl"
                  icon={faCoins}
                ></FontAwesomeIcon>
                <p className="mt-2 ">Crypto Payment</p>
              </div>
            </button>
          </div>

          {/* Content based on the selected option */}
          {/* {selectedOption === "bank" && (
            <div className="border p-4 rounded text-center bg-white">
              <p className="text-center text-xl font-bold">Coming soon!</p>
            </div>
          )} */}

          {/* {selectedOption === "crypto" && (
            <div className="border p-4 rounded bg-white">
              <p className="text-center text-xl mb-2">Crypto Payment Details</p>
              <strong>Bitcoin wallet -</strong>
              bc1qssf3erlnus8x268app9eqrn2yyumx9u7h0gtu2
              <br />
              <span className="my-4 inline-block">
                <strong> USDT (BEP 20) BNB smart chain -</strong>
                0x00Cff15A2204df44aA9E3685E53901Ee53a7f918
              </span>
              <br />
              <strong>USDT (TRC 20) -</strong>{" "}
              TNZ9zzNxow7H6GqADpnjNMcSxzrwbxmxYM
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default PaySelection;
