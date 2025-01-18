import AppInput from '@/components/ui/AppInput'
import AppTable from '@/components/ui/AppTable'
import AdminsLayout from '@/layout/AdminsLayout'
import { UserRole } from '@/types/common'
import React, { useState } from 'react'
import { IoSearch } from 'react-icons/io5'

type Props = {}

const ManageBank = (props: Props) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); 

  const columns = [
    {
      title: 'Plan Name',
      dataIndex: 'planType',
      className: "min-w-[150px]",
      render: (planType: string, record: any) => {
        return (
          <p className="line-clamp-1  text-base">{planType}</p>
        )
      }
    }, 
  ];

  return (
    <AdminsLayout   
      roles={[
        UserRole.SuperAdmin,
        UserRole.Admin,
        UserRole.FinanceAdmin, 
      ]}
    >
      <h1 className="heading pb-10">Manage Bank</h1>
 
      <div className="h-[65dvh] overflow-auto">
        <AppTable
          setPage={setPage}
          columns={columns}
          infoQuery={transactionsQuery}
        />
      </div>
    </AdminsLayout>
  )
}

export default ManageBank