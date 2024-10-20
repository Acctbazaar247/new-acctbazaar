import ViewUser from "@/components/dashboard/ViewUser";
import AccountDeniedFrom from "@/components/Forms/AccountDeniedFrom";
import Form from "@/components/Forms/Form";
import FormSelectField, {
  SelectOptions,
} from "@/components/Forms/FormSelectField";
import TableLoading from "@/components/shared/TableLoading";
import AppInput from "@/components/ui/AppInput";
import AppModal from "@/components/ui/AppModal";
import AppPopover from "@/components/ui/AppPopover";
import AppTable from "@/components/ui/AppTable";
import useDebounce from "@/hooks/useDebounce";
import SuperAdminLayout from "@/layout/SuperAdminLayout";
import {
  useGetAllKycRequestQuery,
  useUpdateStatusBySuperAdminKycRequestMutation,
} from "@/redux/features/kyc/kycApi";
import { useEditUserMutation } from "@/redux/features/user/userApi";
import {
  EBadge,
  EBadgeTitle,
  KycStatus,
  ResponseSuccessType,
} from "@/types/common";
import { optionCreator } from "@/utils";
import { badgeTitleShow } from "@/utils/badgeTitleShow";
import { formatDate } from "@/utils/formateDate";
import { Country } from "country-state-city";
import React, { useMemo, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { toast } from "react-toastify";

const ManageKYC = () => {
  const defaultValue = { value: "", label: "" };
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const debouncedSearch = useDebounce(search, 500); // 500ms debounce delay
  const [status, setStatus] = useState<SelectOptions>(defaultValue);

  const [updateKyc] = useUpdateStatusBySuperAdminKycRequestMutation();
  const [updateUser] = useEditUserMutation();

  const handleStatusUpdate = async (
    status: string,
    id: string,
    denyMessage?: string
  ) => {
    const updateData = {
      id,
      status,
      messageByAdmin: denyMessage,
    };
    await updateKyc(updateData)
      .unwrap()
      .then((res: ResponseSuccessType) => {
        if (!res.success) {
          return toast.error(res?.data.message || "KYC updated unsuccessful!", {
            toastId: 1,
          });
        }
        toast.success("KYC updated successful!", { toastId: 1 });
      })
      .catch((res: any) => {
        return toast.error(res?.data.message || "Something went wrong!", {
          toastId: 1,
        });
      });
  };

  const handleBadgeUpdate = async (
    badge: EBadge,
    badgeTitle: EBadgeTitle,
    id: string
  ) => {
    const updateData = {
      id,
      badge,
      badgeTitle,
    };
    await updateUser(updateData)
      .unwrap()
      .then(() => {
        toast.success("KYC Batch updated successful!", { toastId: 1 });
      })
      .catch((res) => {
        return toast.error(res?.data.message || "Something went wrong!", {
          toastId: 1,
        });
      });
  };

  const statusOptions = [
    {
      status: KycStatus.PENDING,
    },
    {
      status: KycStatus.APPROVED,
    },
    {
      status: KycStatus.DENIED,
    },
  ];

  const badgeOptions = [
    {
      status: EBadge.blue,
    },
    {
      status: EBadge.gold,
    },
    {
      status: EBadge.noBadge,
    },
  ];

  const badgeTitleOptions = [
    {
      status: EBadgeTitle.noBadgeTitle,
    },
    {
      status: EBadgeTitle.verifiedMerchant,
    },
    {
      status: EBadgeTitle.verifiedBusiness,
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "ownBy",
      className: "min-w-[150px]",
      render: (ownBy: any) => {
        return (
          <div className="flex items-center gap-1 text-base">
            <img
              src={ownBy?.profileImg}
              alt=""
              className="rounded-full object-cover size-9"
            />
            <p className="line-clamp-1">{ownBy?.name}</p>
          </div>
        );
      },
    },
    {
      title: "Country",
      dataIndex: "country",
      className: "min-w-[105px]",
      render: (country: string) => {
        const selectedCountryDetails = Country.getAllCountries().find(
          (single) => single.isoCode === country
        );
        return (
          <p className="line-clamp-1 max-w-[30dvw] text-base">
            {selectedCountryDetails?.name}
          </p>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "ownBy",
      className: "min-w-[105px]",
      render: (ownBy: any) => {
        return <p className="line-clamp-1 text-base">{ownBy?.email}</p>;
      },
    },
    {
      title: "Phone Number",
      dataIndex: "ownBy",
      className: "min-w-[105px]",
      render: (ownBy: any) => {
        return <p className="line-clamp-1  text-base">{ownBy?.phoneNumber}</p>;
      },
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      className: "min-w-[115px]",
      render: (date: string) => {
        return <p className="line-clamp-1">{formatDate(date)}</p>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      className: "min-w-[85px]",
      render: (action: any, record: any) => {
        return (
          <div className="flex items-center gap-2">
            <div className="pt-1 flex items-center gap-1">
              <AppPopover
                arrow={false}
                button={
                  <div
                    className={`flex items-center gap-1 text-textDark text-sm  rounded-full px-4 py-0.5 ${
                      record?.status === KycStatus.APPROVED &&
                      "bg-green-500 text-white"
                    } ${
                      record?.status === KycStatus.DENIED && "bg-red text-white"
                    } ${
                      record?.status === KycStatus.PENDING &&
                      "bg-darkishGrey  cursor-pointer"
                    }`}
                  >
                    <h3>{record?.status}</h3>
                    {record?.status === "pending" && <IoIosArrowDown />}
                  </div>
                }
              >
                {record?.status === "pending" && (
                  <div className="flex flex-col items-end text-end">
                    {statusOptions.map((stat) =>
                      stat?.status === "denied" ? (
                        <AccountDeniedFrom
                          key={stat?.status}
                          isButton={false}
                          handleEdit={(info) => {
                            // editService({
                            //   id,
                            //   approvedForSale: EApprovedForSale.denied,
                            //   messageFromAdmin: info.message
                            // });
                            handleStatusUpdate(
                              stat?.status,
                              record?.id,
                              info?.message
                            );
                            // console.log(info);
                          }}
                        ></AccountDeniedFrom>
                      ) : (
                        <AppModal
                          key={stat.status}
                          button={
                            <button className="hover:bg-blue-50 w-full">
                              {stat.status}
                            </button>
                          }
                          cancelButtonTitle="No, Don’t"
                          primaryButtonTitle="Yes. Update"
                          primaryButtonAction={() =>
                            handleStatusUpdate(stat.status, record?.id)
                          }
                        >
                          <div className="max-w-80">
                            <p className="text-center text-darkishGrey pt-4 text-lg">
                              Are you sure Update status {record?.status} to
                              <span className="text-textDark font-medium">
                                {" "}
                                {stat.status}
                              </span>{" "}
                              from this KYC request list?
                            </p>
                          </div>
                        </AppModal>
                      )
                    )}
                  </div>
                )}
              </AppPopover>
            </div>
          </div>
        );
      },
    },
    {
      title: "Badge",
      dataIndex: "ownBy",
      className: "min-w-[85px]",
      render: (ownBy: any, record: any) => {
        console.log("🚀 ~ ManageKYC ~ record:", record);

        return (
          <div className="flex items-center gap-2">
            <div className="pt-1 flex items-center gap-1">
              <AppPopover
                arrow={false}
                button={
                  <div
                    className={`flex items-center cursor-pointer gap-1 text-textDark text-sm  rounded-full px-4 py-0.5 ${
                      ownBy?.badge === EBadge.blue && "bg-blue text-white"
                    } ${
                      ownBy?.badge === EBadge.gold &&
                      "bg-yellowShadow text-white"
                    } ${
                      ownBy?.badge === EBadge.noBadge &&
                      "bg-darkishGrey  cursor-pointer"
                    }
                    ${!ownBy?.badge && "bg-darkishGrey"}
                    `}
                  >
                    <h3>{ownBy?.badge ? ownBy?.badge : "No Badge"}</h3>
                    <IoIosArrowDown />
                  </div>
                }
              >
                <div className="flex flex-col items-end text-end">
                  {badgeOptions.map((stat) => (
                    <AppModal
                      key={stat.status}
                      button={
                        <button className="hover:bg-blue-50 w-full">
                          {stat.status}
                        </button>
                      }
                      cancelButtonTitle="No, Don’t"
                      primaryButtonTitle="Yes. Update"
                      primaryButtonAction={() =>
                        handleBadgeUpdate(
                          stat.status,
                          ownBy?.badgeTitle,
                          ownBy?.id
                        )
                      }
                    >
                      <div className="max-w-80">
                        <p className="text-center text-textDarkGrey pt-4 text-lg">
                          Are you sure Update status {record?.status} to
                          <span className="text-textDark font-medium">
                            {" "}
                            {stat.status}
                          </span>{" "}
                          from this KYC request list?
                        </p>
                      </div>
                    </AppModal>
                  ))}
                </div>
              </AppPopover>
            </div>
          </div>
        );
      },
    },
    {
      title: "Badge Title",
      dataIndex: "ownBy",
      className: "min-w-[85px]",
      render: (ownBy: any, record: any) => {
        return (
          <div className="flex items-center gap-2">
            <div className="pt-1 flex items-center gap-1">
              <AppPopover
                arrow={false}
                button={
                  <div
                    className={`flex items-center cursor-pointer gap-1 text-textDark text-sm  rounded-full px-4 py-0.5 ${
                      ownBy?.badgeTitle === EBadgeTitle.noBadgeTitle &&
                      " text-white bg-darkishGrey"
                    } ${!ownBy?.badgeTitle && "bg-darkishGrey"} ${
                      ownBy?.badgeTitle === EBadgeTitle.verifiedMerchant &&
                      " bg-blue text-white"
                    } ${
                      ownBy?.badgeTitle === EBadgeTitle.verifiedBusiness &&
                      " bg-yellowShadow   cursor-pointer"
                    }`}
                  >
                    <h3>
                      {ownBy?.badgeTitle
                        ? badgeTitleShow(ownBy?.badgeTitle as EBadgeTitle)
                        : "No Badge Title"}
                    </h3>
                    <IoIosArrowDown />
                  </div>
                }
              >
                <div className="flex flex-col items-end text-end">
                  {badgeTitleOptions.map((stat) => (
                    <AppModal
                      key={stat.status}
                      button={
                        <button className="hover:bg-blue-50 w-full">
                          {stat.status}
                        </button>
                      }
                      cancelButtonTitle="No, Don’t"
                      primaryButtonTitle="Yes. Update"
                      primaryButtonAction={() =>
                        handleBadgeUpdate(ownBy?.badge, stat.status, ownBy?.id)
                      }
                    >
                      <div className="max-w-80">
                        <p className="text-center text-textDarkGrey pt-4 text-lg">
                          Are you sure Update status {record?.status} to
                          <span className="text-textDark font-medium">
                            {" "}
                            {stat.status}
                          </span>{" "}
                          from this KYC request list?
                        </p>
                      </div>
                    </AppModal>
                  ))}
                </div>
              </AppPopover>
            </div>
          </div>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      className: "min-w-[85px]",
      render: (_text: any, record: any) => {
        return (
          <div className="flex items-center justify-evenly">
            <AppModal
              title="User Details"
              button={<button className="appOutlineBtnSm">View details</button>}
            >
              <ViewUser record={record} />
            </AppModal>
          </div>
        );
      },
    },
  ];

  const queryString = useMemo(() => {
    const info = {
      status: status.value.length ? status.value : undefined,
      page,
      limit: 50,
      email: debouncedSearch.length ? debouncedSearch : undefined,
    };
    const queryString = Object.keys(info).reduce((pre, key: string) => {
      const value = info[key as keyof typeof info];
      if (value) {
        return pre + `${Boolean(pre.length) ? "&" : ""}${key}=${value}`;
      }
      return pre;
    }, "");
    return queryString;
  }, [status, debouncedSearch, page]);

  const queryInfo = useGetAllKycRequestQuery(queryString);

  const statusOption = Object.values(KycStatus).map(optionCreator);

  const handleRoleChange = (el: string) => {
    setStatus({ value: el, label: el });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <SuperAdminLayout>
      <h2 className="title text-center mb-5">Manage KYC</h2>
      <div className="flex flex-col md:flex-row items-center gap-4 my-5 md:my-10 justify-between">
        <div className="flex gap-4">
          <div className="min-w-[180px] ">
            <Form submitHandler={() => {}}>
              <FormSelectField
                name="role"
                handleChange={handleRoleChange}
                placeholder="Filter By Status"
                options={statusOption}
                value={status.value}
              ></FormSelectField>
            </Form>
          </div>

          <AppInput
            type="text"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search by exact email"
            className="min-w-64 2xl:min-w-72 2xl:!py-2 !rounded"
          />
        </div>
        <button
          className="appBtn"
          onClick={() => {
            setStatus(defaultValue);
            setSearch("");
          }}
        >
          Reset
        </button>
      </div>

      <div className="h-[65dvh] overflow-auto">
        <AppTable
          infoQuery={queryInfo}
          columns={columns}
          setPage={setPage}
          loadingComponent={<TableLoading columnNumber={columns.length} />}
        />
      </div>
    </SuperAdminLayout>
  );
};

export default ManageKYC;
