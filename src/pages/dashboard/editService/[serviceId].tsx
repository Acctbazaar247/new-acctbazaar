import ErrorCompo from "@/components/ui/AppErrorComponent";
import AddServiceForm from "@/components/Forms/AddServiceForm";
import EditServiceForm from "@/components/Forms/EditServiceForm";
import Loading from "@/components/ui/Loading";
import AdminLayout from "@/layout/AdminLayout";
import SellerLayout from "@/layout/SellerLayout";
import { useGetAccountByIdQuery } from "@/redux/features/account/accountApi";
import { IAccount } from "@/types/common";
import { useRouter } from "next/router";
import React from "react";

type Props = {};

const EditSingleService = (props: Props) => {
  const {
    query: { serviceId },
  } = useRouter();
  const { data, isLoading, isError, isFetching } =
    useGetAccountByIdQuery(serviceId);
  let content = null;

  if (isLoading || isFetching) {
    content = <Loading></Loading>;
  } else if (isError) {
    content = <ErrorCompo></ErrorCompo>;
  } else if (data.data) {
    const info = data.data as IAccount;
    content = (
      <div>
        <h2 className="text-center text-xl font-bold mb-5">Edit Account</h2>
        {/* <EditSingleServiceForm {...info}></EditSingleServiceForm> */}
        <EditServiceForm data={info}></EditServiceForm>
      </div>
    );
  } else {
    content = (
      <div>
        <ErrorCompo error="Data not found"></ErrorCompo>
      </div>
    );
  }
  return <AdminLayout>{content}</AdminLayout>;
};

export default EditSingleService;
