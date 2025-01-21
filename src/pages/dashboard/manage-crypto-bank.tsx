import CryptoInfoForm from '@/components/dashboard/CryptoInfoForm'
import AppModal from '@/components/ui/AppModal'
import AppSwitch from '@/components/ui/AppSwitch'
import AppTable from '@/components/ui/AppTable'
import AdminsLayout from '@/layout/AdminsLayout'
import { useDeleteCryptoBankMutation, useEditCryptoBankMutation, useGetCryptoBanksQuery } from '@/redux/features/cryptoBank/cryptoBankApi'
import { CryptoBank, ECryptoType, UserRole } from '@/types/common'
import { Switch } from 'antd'
import React, { useState } from 'react'
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'

type Props = {}

const ManageCryptoBank = (props: Props) => {
    const [page,setPage] = useState(1) 
    const cryptoBankQuery = useGetCryptoBanksQuery({page,})    
    const [editCryptoBank,{isLoading:editCryptoBankLoading}] = useEditCryptoBankMutation()
    const [deleteCryptoBank,{isLoading:deleteCryptoBankLoading}] = useDeleteCryptoBankMutation()
    const columns = [
        {
            title:"Crypto Bank Name",
            dataIndex:"name",
            className:"min-w-[150px]",
            render: (cryptoType:string) => {
                return <span className='capitalize'>{cryptoType}</span>
            }
        },
        {
            title:"walletAddress",
            dataIndex:"walletAddress",
            className:"min-w-[150px]",
            render: (walletAddress:string) => {
                return <span className='capitalize'>{walletAddress}</span>
            }
            }, 
            
        {
            title:"Status",
            dataIndex:"isActive",
            className:"min-w-[150px]",
            render: (isActive: boolean, record: any) => {
                return (
                    <div className='flex items-center gap-2'>
                        <AppSwitch checked={isActive} onChange={(checked) => {
                            editCryptoBank({id:record.id,isActive:checked}).unwrap().then(() => {
                                toast.success("Crypto Bank status updated successfully",{toastId:"1"})
                            }).catch((error) => {
                                toast.error(error?.data?.message || "Something went wrong")
                            })
                        
                        }
                            
                            } />
                        <span className='text-sm'>{isActive ? "Active" : "Inactive"}</span>
                    </div>
                )
            }
        },
        {
            title:"Action",
            dataIndex:"action",
            className:"min-w-[150px]",
            render: (key:string,record:CryptoBank) => {
                return  <div className='flex items-center gap-2'>
                    <AppModal   
                    title="Edit Crypto Bank"
                    button={<button className='bg-orange-600 text-white px-2 py-1 rounded-md flex items-center gap-2'> <FaEdit/> Edit</button>}
                    >
                        <div>
                            <CryptoInfoForm id={record.id} defaultValues={record}/>
                        </div>
                    </AppModal>
                    <button disabled={deleteCryptoBankLoading} onClick={()=>{
                        deleteCryptoBank(record.id).unwrap().then(() => {
                            toast.success("Crypto Bank deleted successfully",{toastId:"1"})
                        }).catch((error) => {
                            toast.error(error?.data?.message || "Something went wrong")
                        })
                    }} className='bg-red-600 text-white px-2 py-1 rounded-md flex items-center gap-2'> <FaTrash/> Delete</button>
                </div>
            }
        }
    ]

  return (
    <AdminsLayout   
      roles={[
        UserRole.SuperAdmin,
        UserRole.Admin,
        UserRole.FinanceAdmin, 
      ]}
    >
        <div className='flex justify-between items-center'>
      <h1 className="heading pb-10">Manage Crypto Bank</h1>
      <AppModal
      title="Add Crypto Bank"
      button={<button className='bg-green-600 text-white px-2 py-1 rounded-md flex items-center gap-2'> <FaPlus/> Add Crypto Bank</button>}
      >
        <div>
           {/* <BankInfoForm/> */}
           <CryptoInfoForm/>
        </div>
      </AppModal>

        </div>
 
      <div className="h-[65dvh] overflow-auto">
            <AppTable
          setPage={setPage}
          columns={columns}
          infoQuery={cryptoBankQuery}
        />
      </div>
    </AdminsLayout> 
  )
}

export default ManageCryptoBank