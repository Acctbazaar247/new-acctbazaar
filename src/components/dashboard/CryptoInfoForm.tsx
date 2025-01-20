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
            editCryptoBank({...data,id:props.id,isTrc:data.cryptoType === ECryptoType.USDT ? data.isTrc : null}).unwrap().then(() => {
                toast.success("Crypto Bank updated successfully",{toastId:"1"})
            }).catch((error) => {
                toast.error(error?.data?.message || "Something went wrong")
            })
        }else{
            addCryptoBank({...data,isTrc:data.cryptoType === ECryptoType.USDT ? data.isTrc : null}).unwrap().then(() => {
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
          <AppFormSelect
            control={control} 
            options={Object.values(ECryptoType).map((cryptoType) => ({
                label: cryptoType,
                value: cryptoType
            }))}
            label="Crypto Type"
            name="cryptoType"
            placeholder="Enter crypto bank name" 
            required={true} 
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
            {
                watch("cryptoType") === ECryptoType.USDT && (
                    <Controller
                    control={control}
                    name="isTrc"
                    render={({field:{onChange,value},fieldState:{error},formState:{errors}}) => (
                       <div className='flex gap-4'>
                        <button className={`border w-full border-gray-500 rounded-md px-2 py-3 ${value ? "bg-orange-600 border-transparent text-white" : ""}`} type='button' onClick={() => onChange(true)}>TRC 20</button>
                        <button className={`border w-full border-gray-500 rounded-md px-2 py-3 ${value ? "" : "bg-orange-600 text-white"}`} type='button' onClick={() => onChange(false)}>BEP 20</button>

                       </div>
                    )}
                    />
                )
            }
          </div>
            <button type='submit'  disabled={addCryptoBankLoading} className='bg-green-600  mt-5 text-white px-3 py-2  rounded-md flex items-center gap-2 disabled:opacity-55 transition-all'>  {props.id ? "Update Crypto Bank" : "Add Crypto Bank"}</button>
        </form>
    </div>
  )
}

export default CryptoInfoForm