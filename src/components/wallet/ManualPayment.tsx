import React, { useEffect, useState } from 'react'
import { PiCurrencyDollarBold } from 'react-icons/pi'
import AppInput from '../ui/AppInput'
import Image from 'next/image'
import AppFormSelect from '../ui/AppFormSelect'
import { useGetCryptoBanksQuery } from '@/redux/features/cryptoBank/cryptoBankApi'
import { useGetBanksQuery } from '@/redux/features/bank/bankApi'
import { QRCode, Select, Spin } from 'antd'
import { Bank, CryptoBank, ECryptoType } from '@/types/common'
import { toast } from 'react-toastify'
import config from '@/utils/config'
import { FaBanSmoking, FaCalculator, FaNairaSign } from 'react-icons/fa6'
import { FaCheckCircle, FaDollarSign, FaExclamationCircle, FaPiggyBank, FaUserFriends } from 'react-icons/fa'
import AppImageUpload from '../ui/AppImageUpload'
import { useAddManualCurrencyRequestMutation } from '@/redux/features/manualCurrencyRequest/manualCurrencyRequestApi'

type Props = {
    setPaymentType: (paymentType: string | null) => void
    setModalOpen: (modalOpen: boolean) => void
}
type UserBankInfo = {
    bankName?: string,
    accountName?: string,
    accountNumber?: string
}
const ManualPayment = ({setPaymentType, setModalOpen}: Props) => {
    const [step,setStep] = useState(1)
    const [amount, setAmount] = useState(0); 
    const [selectedOption, setSelectedOption] = useState<"bank" | "crypto" | null>(null)
    const [cryptoInfo,setCryptoInfo] = useState<CryptoBank | null>(null)
    const [cryptoType,setCryptoType] = useState<ECryptoType | null>(null)
    const [bankInfo,setBankInfo] = useState<Bank | null>(null)
    const [userBankInfo,setUserBankInfo] = useState<UserBankInfo | null>(null)
    const [isBank, setIsBank] = useState(false)
    const [imageLoading, setImageLoading] = useState(false)
    const [image, setImage] = useState<string | null>(null)
    const [transactionHash, setTransactionHash] = useState<string | null>("")
    const [isTrc,setIsTrc] = useState<boolean | null>(null)
    const {data: cryptoBanks,isLoading: cryptoLoading} = useGetCryptoBanksQuery({limit: 1000,isActive: true},)
    const {data: bankBanks,isLoading: bankLoading} = useGetBanksQuery({limit: 1000,isActive: true})
    const [cryptoBankUniqOption,setCryptoBankUniqOption] = useState<string[]>([])
    const [submitManualPayment, {isLoading: submitManualPaymentLoading}] = useAddManualCurrencyRequestMutation()
    const handleContinue = () => {
        if(step === 1){
            if(selectedOption === "bank"){
                if(!bankInfo?.id){
                    toast.error("Please select a bank")
                    return
                }
                if(amount < config.fundMinMoney){
                    toast.error(`Minimum amount is ${config.fundMinMoney}`,{toastId:"min-amount"})
                    return
                }
                setStep(2)
            }else{
                if(!cryptoType){
                    toast.error("Please select a crypto type")
                    return
                }
                if(isTrc === null && cryptoType === ECryptoType.USDT){
                    toast.error("Please select a network")
                    return
                }
                // check amount
                if(amount < config.fundMinMoney){
                    toast.error(`Minimum amount is ${config.fundMinMoney}`,{toastId:"min-amount"})
                    return
                }
                setStep(2)
            }
        }
        else if(step === 2){
            
            if(selectedOption === "bank"){
                if(!bankInfo?.id){
                    toast.error("Please select a bank")
                    return
                }
                if(amount < config.fundMinMoney){
                    toast.error(`Minimum amount is ${config.fundMinMoney}`,{toastId:"min-amount"})
                    return
                }
                setStep(3)
            } else if(selectedOption === "crypto"){
                if(!cryptoInfo?.id){
                    toast.error("Please select a crypto type")
                    return
                }
                setStep(3)
            }
        }else if(step === 3){
            // check is bank
            if(selectedOption === "bank"){
                //  check if userBankInfo is full field
                if(!userBankInfo?.bankName || !userBankInfo?.accountName || !userBankInfo?.accountNumber){
                    toast.error("Please fill all the fields")
                    return
                }
                if(!image){
                    toast.error("Please upload your bank receipt")
                    return
                }
                if(imageLoading){
                    return
                } 
                submitManualPayment({
                    requestedAmount: amount,
                    bankId: bankInfo?.id,
                    bankName: bankInfo?.bankName,
                    accountName: userBankInfo?.accountName,
                    accountNumber: userBankInfo?.accountNumber,
                    image: image
                })
                .unwrap()
                .then((res)=>{
                    toast.success("Manual payment request submitted successfully")
                    setStep(4)
                })
                .catch((err)=>{
                    toast.error(err?.data?.message || "Something went wrong")
                })

            }else if(selectedOption === "crypto"){
                if(!transactionHash){
                    toast.error("Please enter your transaction hash")
                    return
                }
                if(!cryptoInfo?.id){
                    toast.error("Please select a crypto type")
                    return
                }
                submitManualPayment({
                    requestedAmount: amount,
                    cryptoBankId: cryptoInfo?.id, 
                    transactionHash: transactionHash
                })
                .unwrap()
                .then((res)=>{
                    toast.success("Manual payment request submitted successfully")
                    setStep(4)
                })
                .catch((err)=>{
                    toast.error(err?.data?.message || "Something went wrong")
                })
            }
        }
    }
   
    useEffect(()=>{
        if(cryptoBanks?.data){
            // find all unique type of crypto
            const allType = cryptoBanks?.data?.map((bank:CryptoBank) => bank.cryptoType)
            const uniqueType = allType.reduce((acc:string[],curr:string)=>{ 
                if(!acc.includes(curr)){
                    acc.push(curr)
                }
                return acc
            },[])
            setCryptoBankUniqOption(uniqueType)
        }
    },[cryptoBanks])
    const STEP_1=(<>
          <AppInput
          icon={<PiCurrencyDollarBold />}
          type="number"
          placeholder="Enter Amount"
          value={amount.toString()}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
        />
         <div
          onClick={(e) => {
            e.stopPropagation();
            setSelectedOption("bank");
          }}
          className={`gap-5 p-4 border border-borderColor rounded-lg transition-all w-full text-left ${
            selectedOption === "bank" ? "border-orange-400" : ""
          }`}
        >
          <div className="flex gap-5">
            <Image
              width={32}
              height={32}
              className="size-8"
              src={"/assets/icons/card-receive.png"}
              alt="bank payment"
            />
            <div className="space-y-1 w-full">
              <h3 className="text-textBlack font-bold">Bank / Card payment</h3>
              <p className="text-sm text-textGrey">
                Deposit funds directly using Bank transfer .
              </p>
            {
                selectedOption === "bank" && (
                    <div className="text-sm text-textGrey mt-2 w-full">
                        {
                        bankLoading ? <Spin className="h-10 w-full"/> :  <div className='w-full mt-2'>

                            <Select value={bankInfo?.id} onChange={e=>{setBankInfo(bankBanks?.data?.find((bank:Bank) => bank.id === e) || null)}} showSearch className='my-select w-full h-10 mt-1' placeholder='Select Bank'   options={bankBanks?.data?.map((bank:Bank) => ({
                        label: bank.bankName,
                        value: bank.id , 
                      }))}/>
                        </div>
                        }
                      </div>
                )
            }
            </div>
          </div>
           
        </div>
        <button
          onClick={() => {
            setSelectedOption("crypto");
            setIsBank(false);
          }}
          className={`flex gap-5 p-4 border border-borderColor rounded-lg transition-all w-full text-left ${
            selectedOption === "crypto" ? "border-orange-400" : ""
          }`}
        >
          <Image
            width={32}
            height={32}
            className="size-8"
            src={"/assets/icons/doller-recive.png"}
            alt="crypto payment"
          />
          <div className="space-y-1">
            <h3 className="text-textBlack font-bold">Crypto Deposit</h3>
            <p className="text-sm text-textGrey">
              Fund your wallet with popular cryptocurrencies like USDT, ETH,
              BNB, SOL and more.
            </p>
            <div>
                {
                    
                    cryptoLoading ? <Spin className="h-10 w-full"/> : <div className='w-full mt-2'>
                            <Select value={cryptoType} onChange={e=>{setCryptoType(e)}} showSearch className='my-select w-full h-10 mt-1' placeholder='Select Bank'   options={cryptoBankUniqOption.map((type) => ({
                        label: type,
                        value: type , 
                      }))}/>
                    </div>
                }
                {
                    cryptoType === ECryptoType.USDT && <div>
                 <div className='grid grid-cols-2 mt-2 gap-2'>
                 <div
                              onClick={() => setIsTrc(true)}
                              className={`border cursor-pointer rounded-md py-3 px-4 ${
                                
                                isTrc === true
                                  ? "border-primary"
                                  : "border-borderColor"
                              }`}
                            >
                              <h4 className="font-normal">Tron (TRC20)</h4>
                              <p className="textG text-xs">
                                Est. arrival ~ 2 mins
                              </p>
                            </div>
                            <div
                              onClick={() => setIsTrc(false)}
                              className={`border cursor-pointer rounded-md py-3 px-4 ${
                                isTrc === false
                                  ? "border-primary"
                                  : "border-borderColor"
                              }`}
                            >
                              <h4 className="font-normal">
                                BNB Smart Chain (BEP20)
                              </h4>
                              <p className="textG text-xs">
                                Est. arrival ~ 3 mins
                              </p>
                            </div>
                    </div>
                 </div>
                }
            </div>
          </div>
        </button>
    </>)
    const availableCrypto = cryptoBanks?.data?.reduce((acc:CryptoBank[],curr:CryptoBank)=>{
        if(curr.cryptoType === cryptoType){
            if(cryptoType === ECryptoType.USDT){
                if(isTrc === curr.isTrc){
                    acc.push(curr)
                }
            }else{
                acc.push(curr)
            }
        }
        return acc
    },[])
    const STEP_2=(<div>
        {
            selectedOption === "bank" ? <div>
                <div className='flex flex-col items-center justify-center w-full bg-yellowShadow  py-4 rounded'>
                <p className='text-2xl font-bold flex gap-2 items-center text-orange-500'> <FaNairaSign /> {amount*config.dollarRate}</p>
                <p className='text-sm text-textGrey'>You have to transfer <span className='text-orange-500'>{amount*config.dollarRate}</span> Naira to the selected bank</p>

                </div>
                <div className='space-y-2 mt-4' >
                    <h2 className='text-center text-xl font-bold'>Bank Details</h2>
                    <div className='grid grid-cols-2 gap-2'>
                        <div className='border border-borderColor text-center   p-2 rounded-lg'>
                            <h3 className='font-semibold '>Bank Name</h3>
                            <p>{bankInfo?.bankName}</p>
                        </div>
                        
                        <div className='border border-borderColor text-center p-2 rounded-lg'>
                            <h3 className='font-semibold text-center'>Account Name</h3>
                            <p>{bankInfo?.accountName}</p>
                        </div>
                        <div className='border border-borderColor col-span-2 p-2 text-center rounded-lg'>
                            <h3 className='font-semibold text-center'>Account Number</h3>
                            <p>{bankInfo?.accountNumber}</p>
                        </div>
                    </div>
                    <div className=' py-2'>
                        <p className='text-sm text-textGrey'> <span className='text-orange-500'>*</span> By clicking continue, you agree that you have sent the money to the selected bank and have your payment receipt.</p>
                    </div>
                </div>
            </div> : <div>
            
                <div>
                    {
                        availableCrypto?.length > 0 ? <div>
                                <h3 className='text font-bold text-center'>Select a {cryptoType} Crypto Wallet Address</h3> 
                            {
                                availableCrypto.map((crypto:CryptoBank)=>{
                                    return <div key={crypto.id} onClick={()=>{
                                        setCryptoInfo(crypto)
                                    }} className={` border p-2 rounded-lg mb-2 mt-2 cursor-pointer ${cryptoInfo?.id === crypto.id ? "border-orange-500" : "border-borderColor"} `}>
                                        <h3 >{crypto.walletAddress}</h3> 
                                    </div>
                                }) 
                            }
                        </div>: <div className='flex flex-col py-4 justify-center items-center h-full'>
                            <FaExclamationCircle className='text-orange-500 text-6xl' />
                             <p className='text-center text-sm text-textGrey mt-2'>No wallet address found</p>
                        </div>
                    }
                </div>
            </div>
        }
    </div>)
 
    const STEP_3=(
        <div>
            {
                selectedOption === "bank" ? <div >
                <div className='text-center'>
        
                <h3 className='text-lg  font-bold'>Enter your Bank Details</h3>
                <p className='text-sm mb-4 text-textGrey'>Please enter your bank details to complete the payment</p>
                </div>
                <div className='grid grid-cols-2 gap-2'>
                <div>
                    <AppInput
                      icon={<FaPiggyBank />}
                      type="text"
                      placeholder="Bank Name"
                      value={userBankInfo?.bankName || ""}
                      onChange={(e) => setUserBankInfo(prevState => ({...prevState, bankName: e.target.value}))}
                    />
                </div>
                <div>
                    <AppInput
                      icon={<FaUserFriends />}
                      type="text"
                      placeholder="Account Name"
                      value={userBankInfo?.accountName || ""}
                      onChange={(e) => setUserBankInfo(prevState => ({...prevState, accountName: e.target.value}))}
                    />
                </div>
                <div className='col-span-2'>
                    <AppInput
                      icon={<FaCalculator />}
                      type="text"
                      placeholder=" Account Number"
                      value={userBankInfo?.accountNumber || ""}
                      onChange={(e) => setUserBankInfo(prevState => ({...prevState, accountNumber: e.target.value}))}
                    />
                </div>
                <div className='col-span-2'>
                    <AppImageUpload placeholder='Upload Bank Receipt'  name="bank-receipt" onChange={setImage} setImageLoading={setImageLoading} />
                </div>
                </div> 
            </div>:<div>
            <div className='flex flex-col items-center justify-center w-full bg-yellowShadow  py-4 rounded'>
                <p className='text-2xl font-bold flex gap-2 mb-2 text-orange-500 items-center'> <FaDollarSign /> {amount}</p>
                <p className='text-sm text-textGrey'>You have to transfer <span className='text-orange-500'>{amount }</span> {cryptoType} to the selected crypto wallet</p> 
                </div>

                <div className='mt-5'>
                    <h2 className='text-center font-bold'>Wallet Address</h2>
                    <div className='flex justify-center items-center'>
                        <QRCode value={cryptoInfo?.walletAddress || ""} />
                    </div>
                    <p onClick={()=>{
                        navigator?.clipboard?.writeText(cryptoInfo?.walletAddress || "")
                        .then(() => toast.success("Copied to clipboard", {toastId: 'copy-wallet-address'}))
                    }} className='text-center cursor-pointer mt-2 py-2 bg-yellowShadow rounded  text-sm text-textBlack'>{cryptoInfo?.walletAddress}</p>

                </div>
                {/* add input for taking transaction hash */}
                <div className='mt-5'>
                    <h2 className='mb-1 font-bold'>Enter your Transaction Hash</h2>
                    <AppInput
                      icon={<FaCalculator />}
                      type="text"
                      placeholder="Transaction Hash"
                      value={transactionHash || ""}
                      onChange={(e) => setTransactionHash(e.target.value)}
                    />
                </div>
            </div>
            }
        </div>
    
)

    const STEP_4=(<div className='flex justify-center py-10 items-center flex-col gap-2 '>
        <div className='flex justify-center items-center flex-col gap-2 '>
            <FaCheckCircle className='text-orange-500 text-6xl' />

        </div>
        <h3 className='text-xl font-bold'>Payment Request Submitted</h3>
        <p className='text-sm text-textGrey w-[80%] text-center'>Your payment request has been submitted successfully. We will review your request and notify you via email once it is approved.</p>
    </div>)


  return (
    <div className='w-[500px] space-y-4 pt-3'>
        {
            step === 1 ? STEP_1 : step === 2 ? STEP_2 : step === 3 ? STEP_3 : STEP_4
        }
   
        <div className="flex mt-4 gap-3">
          {/* back button */}
          {
            step !== 4 && <button className="border  border-gray-600 text-textBlack px-4 py-2 rounded-lg" onClick={() => {
                if(step === 1){
                    setPaymentType(null)
                }else{
                    setStep(step-1)
                }
            }}>Back</button>
          }
          <button 
          disabled={imageLoading || submitManualPaymentLoading}
            className=" rounded-lg  px-7 py-2 bg-orange-500 text-white  hover:opacity-80 transition-all disabled:opacity-80"
            onClick={()=>{
                if(step === 4){
                    setModalOpen(false)
                    setPaymentType(null)
                }else{
                    handleContinue()
                }

            }}
          >
          {
            submitManualPaymentLoading ? <Spin /> : step === 3 ? "Submit" : step===4?"Close": "Continue"
          }
          </button>
        </div>
    </div>
  )
}

export default ManualPayment