import React from 'react'
import Form from '../Forms/Form'
import AppFormInput from '../ui/AppFormInput'
import { useForm } from 'react-hook-form'
import { FaPlus } from 'react-icons/fa6'
import { useAddBankMutation, useEditBankMutation } from '@/redux/features/bank/bankApi'
import { toast } from 'react-toastify'

type Props = {
    defaultValues?: {
        bankName: string
        accountName: string
        accountNumber: string
    } 
    id?: string

}

const BankInfoForm = (props: Props) => {
    const {register,handleSubmit,reset,formState: {errors}} = useForm({
        defaultValues: props.defaultValues
    })
    const [addBank, {isLoading: addBankLoading}] = useAddBankMutation()  
    const [editBank, {isLoading: editBankLoading}] = useEditBankMutation()
    const onSubmit = (data: any) => {
        if(props.id){
            editBank({...data,id:props.id}).unwrap().then(() => {
                toast.success("Bank updated successfully",{toastId:"1"})
            }).catch((error) => {
                toast.error(error?.data?.message || "Something went wrong")
            })
        }else{
            addBank(data).unwrap().then(() => {
                toast.success("Bank added successfully",{toastId:"1"})
                reset()
            }).catch((error) => {
                toast.error(error?.data?.message || "Something went wrong")
            })
        }
    }

  return (
    <div className='lg:w-[700px] py-4'>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid grid-cols-2 gap-4'>
                <AppFormInput
                error={errors?.bankName?.message}
                label="Bank Name"
                name="bankName"
                placeholder="Enter bank name"
                type="text" 
                required={true}
                register={register}
                />
                <AppFormInput
                error={errors?.accountName?.message}
                label="Account Name"
                name="accountName"
                placeholder="Enter account name"
                type="text" 
                required={true}
                register={register}
                />
                <div className='col-span-2'>

                <AppFormInput
            
                error={errors?.accountNumber?.message}
                label="Account Number"
                name="accountNumber"
                placeholder="Enter account number"
                type="text" 
                required={true}
                register={register}
                />
                </div>
            </div>
            <button type='submit'  disabled={addBankLoading || editBankLoading} className='bg-green-600 mt-4 text-white px-2 py-1 rounded-md flex items-center gap-2 disabled:opacity-55 transition-all'>  {props.id ? "Update Bank" : "Add Bank"}</button>
        </form>
    </div>
  )
}

export default BankInfoForm