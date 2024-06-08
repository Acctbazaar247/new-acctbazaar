import useDebounce from "@/hooks/useDebounce";
import SuperAdminLayout from "@/layout/SuperAdminLayout";
import { EPlans } from "@/types/common";
import React, { useState, useMemo } from "react";
import AppTable from "@/components/ui/AppTable";
import { formatDate } from "@/utils/formateDate";
import { useUpdateOrderMutation } from "@/redux/features/order/orderApi";
import TableLoading from "@/components/shared/TableLoading";
import AppInput from "@/components/ui/AppInput";
import { useGetAllPlanQuery } from "@/redux/features/plan/planApi";
import { MdBlock } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import getDaysRemaining from "@/utils/getDaysRemaining";
import FormSelectField, { SelectOptions } from "@/components/Forms/FormSelectField";
import { optionCreator } from "@/utils";
import Form from "@/components/Forms/Form";

const ManagePlans = () => {
  const defaultValue = { value: "", label: "" };
  const [sellerEmail, setSellerEmail] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const debouncedSellerEmail = useDebounce(sellerEmail, 500);
  const [planStatus, setPlanStatus] =
    useState<SelectOptions>(defaultValue);

  const [updateOrder] = useUpdateOrderMutation();

  const queryString = useMemo(() => {
    const info = {
      page,
      limit: 50,
      ownById: debouncedSellerEmail.length ? debouncedSellerEmail : undefined,
      planType: planStatus.value.length
        ? planStatus.value
        : undefined
    };

    const queryString = Object.keys(info).reduce((pre, key: string) => {
      const value = info[key as keyof typeof info];
      if (value) {
        return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
      }
      return pre;
    }, "");
    return queryString;
  }, [debouncedSellerEmail, page, planStatus.value]);

  const queryInfo = useGetAllPlanQuery(queryString);

  const handleSellerEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSellerEmail(e.target.value);
  };


  const planOptions =
    Object.keys(EPlans).map((e) => {
      return {
        label: e.split("_").join(" ").toLowerCase(),
        value: EPlans[e as keyof typeof EPlans]
      }
    });

  const handlePlanChange = (el: string) => {
    setPlanStatus({ value: el, label: el });
  };

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
    {
      title: 'Plan limit',
      dataIndex: 'limit',
      className: "min-w-[105px]",
      render: (limit: any) => {
        return (
          <p className="line-clamp-1 max-w-[30dvw] text-base">{limit}</p>
        )
      }
    },
    {
      title: 'Plan Duration',
      dataIndex: 'days',
      className: "min-w-[105px]",
      render: (days: any) => {
        return (
          <p className="line-clamp-1 text-base">{days} days</p>
        )
      }
    },
    {
      title: 'Days Left',
      dataIndex: 'createdAt',
      className: "min-w-[105px]",
      render: (days: any) => {
        return (
          <p className="line-clamp-1 text-base">{getDaysRemaining(days)} days</p>
        )
      }
    },
    {
      title: "User Status",
      dataIndex: "isActive",
      className: "min-w-[115px]",
      render: (isActive: boolean) => {
        return (
          <div className={`flex items-center gap-1 text-sm ${isActive ? "text-success" : "text-textDark"}`}>
            {
              isActive ? <RiVerifiedBadgeFill /> : < MdBlock />
            }
            {isActive ? "Active" : "Blocked"}
          </div>
        );
      },
    },
    {
      title: 'Plan Owner',
      dataIndex: 'ownBy',
      className: "min-w-[105px]",
      render: (orderBy: any) => {
        return (
          <div className='flex items-center gap-1 text-base'>
            <img src={orderBy?.profileImg} alt="profile Image" className="rounded-full object-cover size-9" />
            <p className="line-clamp-1">{orderBy?.name}</p>
          </div>
        )
      }
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      className: "min-w-[115px] text-center",
      render: (date: string) => {
        return (
          <p className="line-clamp-1">{formatDate(date)}</p>
        )
      }
    },

  ];

  return (
    <SuperAdminLayout>
      <h2 className="title text-center mb-5">Manage plans</h2>

      <div className="flex flex-col md:flex-row items-center gap-4 my-5 md:my-10 justify-between">
        <div className='flex flex-wrap lg:flex-nowrap items-center gap-3 md:gap-5'>

          <Form submitHandler={() => { }}>
            <FormSelectField
              name="planStatus"
              className="min-w-40"
              handleChange={handlePlanChange}
              placeholder="Filter By Plan Types"
              options={planOptions}
              value={planStatus.value}
            ></FormSelectField>
          </Form>

          <AppInput
            onChange={handleSellerEmailChange}
            type="text"
            value={sellerEmail}
            placeholder="Search by Seller ID"
            className="min-w-60 2xl:!py-2"
          />
        </div>

        <button
          className="appBtn"
          onClick={() => {
            setSellerEmail("");
            setPlanStatus(defaultValue)
          }}
        >
          Reset
        </button>
      </div>

      <div className='h-[65dvh] overflow-auto'>
        <AppTable
          infoQuery={queryInfo}
          columns={columns}
          setPage={setPage}
          loadingComponent={
            <TableLoading columnNumber={columns.length} />
          }
        />
      </div>
    </SuperAdminLayout>
  );
};

export default ManagePlans;
