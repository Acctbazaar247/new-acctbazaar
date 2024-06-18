import ErrorCompo from "@/components/ui/AppErrorComponent";
import AddServiceForm from "@/components/Forms/AddServiceForm";
import EditServiceForm from "@/components/Forms/EditServiceForm";
import Loading from "@/components/ui/Loading";
import SellerLayout from "@/layout/SellerLayout";
import { useGetAccountByIdQuery } from "@/redux/features/account/accountApi";
import { IAccount, UserRole } from "@/types/common";
import { useRouter } from "next/router";
import React from "react";
import HomeLayout from "@/layout/HomeLayout";
import AdminsLayout from "@/layout/AdminsLayout";
import { useAppSelector } from "@/redux/hook";

type Props = {};

const EditSingleService = (props: Props) => {
  const {
    query: { serviceId }
  } = useRouter();
  const user = useAppSelector((state) => state.user.user);
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
      <div className="container">
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
  if (UserRole.Seller === user?.role) {
    return (
      <SellerLayout>
        <HomeLayout>{content}</HomeLayout>
      </SellerLayout>
    );
  }
  return (
    <AdminsLayout
      roles={[UserRole.PRAdmin, UserRole.SuperAdmin, UserRole.Seller]}
    >
      <>{content}</>
    </AdminsLayout>
  );
};

export default EditSingleService;
