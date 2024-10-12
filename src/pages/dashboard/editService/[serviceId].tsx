import EditServiceForm from "@/components/Forms/EditServiceForm";
import ErrorCompo from "@/components/ui/AppErrorComponent";
import Loading from "@/components/ui/Loading";
import AdminsLayout from "@/layout/AdminsLayout";
import HomeLayout from "@/layout/HomeLayout";
import SellerLayout from "@/layout/SellerLayout";
import { useGetAccountByIdQuery } from "@/redux/features/account/accountApi";
import { useAppSelector } from "@/redux/hook";
import { IAccount, UserRole } from "@/types/common";
import { useRouter } from "next/router";

const EditSingleService = () => {
  const {
    query: { serviceId },
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
      <div className="container h-screen overflow-y-scroll pb-10">
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
