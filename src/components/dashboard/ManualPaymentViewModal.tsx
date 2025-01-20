import { ManualCurrencyRequest } from '@/types/common'
import React, { useState } from 'react'
import AppInput from '../ui/AppInput'
import { MdFormatListNumbered } from 'react-icons/md'
import { TbReportMoney } from 'react-icons/tb'
import { FaDollarSign, FaMoneyBill } from 'react-icons/fa'
import Image from 'next/image'
import { useEditManualCurrencyRequestMutation } from '@/redux/features/manualCurrencyRequest/manualCurrencyRequestApi'
import { toast } from 'react-toastify'

type Props = {
    data:ManualCurrencyRequest
}

const ManualPaymentViewModal = ({data}: Props) => {
    const [receivedAmount, setReceivedAmount] = useState<number>(data.receivedAmount || data.requestedAmount || 0)
    const [updateManualCurrencyRequest,{isLoading}]=useEditManualCurrencyRequestMutation()    
    const handleUpDate=(status:"approved"|"denied")=>{
        updateManualCurrencyRequest({id:data.id,status,receivedAmount})
        .then((res)=>{ 
                toast.success(status === "approved" ? "Approved successfully" : "Rejected successfully")
            
        })
        .catch((err)=>{
            toast.error(err.data?.message ||"Something went wrong")
        })   

    }
  return    (
    <div>
        <div>
            <h1 className=' mb-2 font-bold'>Enter received amount</h1>
           <AppInput icon={<FaDollarSign/>} type='number' value={receivedAmount} onChange={(e)=>setReceivedAmount(Number(e.target.value))}></AppInput>
           <div className='py-3 text-center'>
            <h2 className='text-lg'>User Submitted Info</h2>
            
            {
                data.bankId?<div>
                        <div className='grid grid-cols-2 gap-2'>
                            <div className='flex items-center border border-borderColor rounded-md p-2 mt-2 flex-col gap-2'>
                                <h2>Bank Name</h2>
                                <p>{data.bankName}</p>

                            </div>
                            <div className='flex border border-borderColor rounded-md p-2 mt-2 items-center flex-col gap-2'>
                                <h2>Bank Account Name</h2>
                                <p>{data.accountName}</p>

                            </div>
                            <div className='flex border border-borderColor rounded-md p-2 mt-2 items-center flex-col gap-2 col-span-2'>
                                <h2>Bank Account Number</h2>
                                <p>{data.accountNumber}</p>
                            </div>
                            <div className='col-span-2 flex justify-center'>
                                <a href={data.image} target='_blank' className=''>
                                    <Image width={200} height={200} src={data.image || ''} alt='bank logo'></Image>
                                </a>

                            </div>
                         
                    </div>
                    <div className='text-center'>
                                <h2 className='text-lg font-bold'>

                                Admin Bank info
                                </h2>
                            </div>
                            <div className='grid grid-cols-2 gap-2'>
                            <div className='flex items-center border border-borderColor rounded-md p-2 mt-2 flex-col gap-2'>
                                <h2>Bank Name</h2>
                                <p>{data.bank?.bankName}</p>

                            </div>
                            <div className='flex border border-borderColor rounded-md p-2 mt-2 items-center flex-col gap-2'>
                                <h2>Bank Account Name</h2>
                                <p>{data.bank?.accountName}</p>

                            </div>
                            <div className='flex border border-borderColor rounded-md p-2 mt-2 items-center flex-col gap-2 col-span-2'>
                                <h2>Bank Account Number</h2>
                                <p>{data.bank?.accountNumber}</p>
                            </div>
                       
                         
                    </div>
                </div>:<div>
                    <div className='flex border border-borderColor rounded-md p-2 mt-2 items-center flex-col gap-2'>
                        
                        <h2>Transaction Hash</h2>
                        <p>{data.transactionHash}</p>

                    </div>
                </div>
            }


           </div>
            {
                data.status === "pending" && <div className='flex gap-2 mt-4'>
                    <button disabled={isLoading} onClick={()=>handleUpDate("approved")} className='bg-primary text-white px-2 py-1 rounded-md'>Approve</button>
                    <button disabled={isLoading} onClick={()=>handleUpDate("denied")} className='bg-red text-white px-2 py-1 rounded-md'>Reject</button>
                </div>
            }
        </div>
    </div>
  )
}

export default ManualPaymentViewModal