import BankInfoForm from '@/components/dashboard/BankInfoForm'
import AppInput from '@/components/ui/AppInput'
import AppModal from '@/components/ui/AppModal'
import AppSwitch from '@/components/ui/AppSwitch'
import AppTable from '@/components/ui/AppTable'
import AdminsLayout from '@/layout/AdminsLayout'
import { useDeleteBankMutation, useEditBankMutation, useGetBanksQuery } from '@/redux/features/bank/bankApi'
import { UserRole } from '@/types/common'
import { Switch } from 'antd'
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa6'
import { IoSearch } from 'react-icons/io5'
import { toast } from 'react-toastify'

type Props = {}

const ManageBank = (props: Props) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); 
const bankQuery = useGetBanksQuery({page,searchTerm})
const [editBank,{isLoading:isEditBankLoading}] = useEditBankMutation()
const [deleteBank,{isLoading:isDeleteBankLoading}] = useDeleteBankMutation()
  const columns = [
    {
      title: 'Bank Name',
      dataIndex: 'bankName',
      className: "min-w-[150px]",
      render: (bankName: string, record: any) => {
        return (
          <p className="line-clamp-1  text-base">{bankName}</p>
        )
      }
    }, 
    {
      title: 'Bank Account Name',
      dataIndex: 'accountName',
      className: "min-w-[150px]",
      render: (accountName: string, record: any) => {
        return (
          <p className="line-clamp-1  text-base">{accountName}</p>
        )
      }
    },
    {
        title:"Bank Account Number",
        dataIndex:"accountNumber",
        className:"min-w-[150px]",
        render: (accountNumber: string, record: any) => {
            return (
                <p className="line-clamp-1  text-base">{accountNumber}</p>
            )
        }
    },
    // status
    {
        title:"Status",
        dataIndex:"isActive",
        className:"min-w-[150px]",
        render: (isActive: boolean, record: any) => {
            return (
                <div className='flex items-center gap-2'>
                    <AppSwitch checked={isActive} onChange={(checked) => {
                        editBank({id:record.id,isActive:checked}).unwrap().then(() => {
                            toast.success("Bank status updated successfully",{toastId:"1"})
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
    // action of delate and edit
    {
        title:"Action",
        dataIndex:"id",
        className:"min-w-[150px]",
        render: (id:string,record:any) => {
            return  <div className='flex items-center gap-2'>
                <AppModal
                title='Edit book'
                button={<button className='bg-yellow-500 text-white px-2 py-1 rounded-md'>Edit</button>}
                >
                    <BankInfoForm id={id} defaultValues={record}/>
                </AppModal>
                <button onClick={()=>{
                    deleteBank(id).unwrap().then(() => {
                        toast.success("Bank deleted successfully",{toastId:"1"})
                    }).catch((error) => {
                        toast.error(error?.data?.message || "Something went wrong")
                    })
                }} className='bg-orange-500 text-white px-2 py-1 rounded-md'>Delete</button>
            </div>
        }
    }
  ];

  return (
    <AdminsLayout   
      roles={[
        UserRole.SuperAdmin,
        UserRole.Admin,
        UserRole.FinanceAdmin, 
      ]}
    >
        <div className='flex justify-between items-center'>
      <h1 className="heading pb-10">Manage Bank</h1>
      <AppModal
      title="Add Bank"
      button={<button className='bg-green-600 text-white px-2 py-1 rounded-md flex items-center gap-2'> <FaPlus/> Add Bank</button>}
      >
        <div>
           <BankInfoForm/>
        </div>
      </AppModal>

        </div>
 
      <div className="h-[65dvh] overflow-auto">
        <AppTable
          setPage={setPage}
          columns={columns}
          infoQuery={bankQuery}
        />
      </div>
    </AdminsLayout>
  )
}

export default ManageBank