import { useAddCryptoBankMutation, useEditCryptoBankMutation } from '@/redux/features/cryptoBank/cryptoBankApi'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import AppFormInput from '../ui/AppFormInput'
import AppFormSelect from '../ui/AppFormSelect'
import { ECryptoType } from '@/types/common'

type Props = {
    id?:string
    defaultValues?:any
}

const CryptoInfoForm = (props: Props) => {
    const {register,handleSubmit,formState:{errors},control,watch,reset} = useForm({defaultValues:props.defaultValues});
    const [addCryptoBank,{isLoading:addCryptoBankLoading}] = useAddCryptoBankMutation() 
    const [editCryptoBank,{isLoading:editCryptoBankLoading}] = useEditCryptoBankMutation()
    const onSubmit = (data:any) => {    
        if(props.id){
            editCryptoBank({...data,id:props.id}).unwrap().then(() => {
                toast.success("Crypto Bank updated successfully",{toastId:"1"})
            }).catch((error) => {
                toast.error(error?.data?.message || "Something went wrong")
            })
        }else{
            addCryptoBank({...data}).unwrap().then(() => {
                toast.success("Crypto Bank added successfully",{toastId:"1"})
                reset()
            }).catch((error) => {
                toast.error(error?.data?.message || "Something went wrong")
            })
        }
    }
  return (
        <div className='lg:w-[700px] py-4'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-1 gap-5'>
          <AppFormInput
            error={errors?.name?.message}
            label="Crypto Bank Name"
            name="name"
            type='text'
            placeholder="Enter crypto bank name" 
            required={true} 
            register={register}
            /> 
            <AppFormInput
            error={errors?.walletAddress?.message}
            label="Wallet Address"
            name="walletAddress"
            placeholder="Enter wallet address"
            type="text" 
            required={true}
            register={register}
            />
             
          </div>
            <button type='submit'  disabled={addCryptoBankLoading} className='bg-green-600  mt-5 text-white px-3 py-2  rounded-md flex items-center gap-2 disabled:opacity-55 transition-all'>  {props.id ? "Update Crypto Bank" : "Add Crypto Bank"}</button>
        </form>
    </div>
  )
}

export default CryptoInfoForm