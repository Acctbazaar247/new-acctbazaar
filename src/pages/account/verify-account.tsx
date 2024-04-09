import FormSelectField from "@/components/Forms/FormSelectField";
import AppFormDatePicker from "@/components/ui/AppFormDatePicker";
import AppFormInput from "@/components/ui/AppFormInput";
import AppFormSelect from "@/components/ui/AppFormSelect";
import AppModal from "@/components/ui/AppModal";
import HomeLayout from "@/layout/HomeLayout";
import { useEditUserMutation } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hook";
import { IGenericErrorResponse, ResponseErrorType, ResponseSuccessType } from "@/types/common";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CgFileAdd } from "react-icons/cg";
import { toast } from "react-toastify";

interface FormData {
    name: string;
    email: string;
    address: string;
    txId: string;
    state: string;
    country: string;
    city: string;
    dateOfBirth: string;
    phoneNumber: string;
    accept?: any;
}

const VerifyAccount = () => {
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false);
    const user = useAppSelector((state) => state.user.user);
    const [editUser] = useEditUserMutation();

    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            name: user?.name,
            // username:user?.
            email: user?.email,
            phoneNumber: user?.phoneNumber,
            state: user?.state,
            country: user?.country,
            address: user?.address,
            city: user?.city,
            dateOfBirth: user?.dateOfBirth,
            txId: user?.txId
        }
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const submittedData = {
            id: user?.id, ...data
        }
        await editUser(submittedData).unwrap().then((res: ResponseErrorType | ResponseSuccessType) => {
            // console.log(res);
            if (!res.data?.success) {
                toast.error(res?.data?.message || "Something went wrong");
            }
            toast.success("Account are updated successfully!", { toastId: 1 });
            setModalOpen(true);
        }).catch((res: ResponseErrorType | ResponseSuccessType) => {
            if (!res.data?.success) {
                toast.error(res?.data?.message || "Something went wrong");
            }
        });
    };

    const countryOptions = [
        { value: "dubai", label: "Dubai" },
        { value: "quatar", label: "Quatar" },
        { value: "america", label: "America" },
    ]

    const handleModal = () => {
        setModalOpen(false);
        router.push("/account/dashboard");
    }

    return (
        <HomeLayout>
            <div className='container py-5 md:py-10 2xl:py-12'>
                {/* this is top section div  */}
                <div className='space-y-1'>
                    <h2 className="title">Verify your account</h2>
                    <p className="text-textGrey text-xs md:text-sm">This helps us ensure you comply with regulations</p>
                </div>

                {/* this is main div  */}
                <div className='bg-white rounded min-h-[80dvh] mt-2 md:mt-4 lg:mt-5 2xl:mt-6'>
                    <div className='md:w-[80%] md:py-6  md:px-10'>
                        <form
                            className="w-full py-4 2xl:py-5 space-y-4 lg:space-y-5 2xl:space-y-6"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div className='flex flex-col md:flex-row justify-between'>
                                {/* this is left side text  */}
                                <div className='text-textBlueBlack space-y-1'>
                                    <h3 className="font-semibold">Personal Information</h3>
                                    <p className="text-textGrey text-sm">Make adjustments to your personal <br /> information and save them.</p>
                                </div>
                                {/* this is right side text  */}
                                <div className='w-full md:w-[40%] space-y-3'>

                                    <AppFormInput
                                        label="Name"
                                        name="name"
                                        type="text"
                                        placeholder="Type your name here"
                                        register={register}
                                        error={errors?.name}
                                        defaultValue={user?.name}
                                        readOnly={true}
                                    />

                                    <AppFormInput
                                        label="Email"
                                        name="email"
                                        type="email"
                                        placeholder="Type your email here"
                                        register={register}
                                        error={errors?.name}
                                        defaultValue={user?.email}
                                        readOnly={true}
                                    />
                                    <AppFormInput
                                        label="Phone Number"
                                        name="phoneNumber"
                                        type="number"
                                        placeholder="Type your number here"
                                        register={register}
                                        error={errors?.name}
                                        defaultValue={user?.phoneNumber}
                                        readOnly={true}
                                    />
                                </div>
                            </div>
                            <div className='border border-[#F2F4F7]'></div>
                            <div className='flex flex-col md:flex-row justify-between'>
                                {/* this is left side text  */}
                                <div className='text-textBlueBlack space-y-1'>
                                    <h3 className="font-semibold">Residential Details</h3>
                                    <p className="text-textGrey text-sm">Add your current home address.</p>
                                </div>
                                {/* this is right side text  */}
                                <div className='w-full md:w-[40%] space-y-3'>

                                    <AppFormSelect
                                        control={control}
                                        placeholder="Select category"
                                        name="category"
                                        required={true}
                                        options={countryOptions}
                                    />

                                    <AppFormSelect
                                        control={control}
                                        placeholder="Select State"
                                        name="state"
                                        required={true}
                                        options={countryOptions}
                                    />
                                    <AppFormInput
                                        label="User address"
                                        name="address"
                                        type="text"
                                        required
                                        placeholder="Type your address here"
                                        register={register}
                                        error={errors?.address}
                                    />
                                    <AppFormSelect
                                        control={control}
                                        placeholder="Select City"
                                        name="city"
                                        required={true}
                                        options={countryOptions}
                                    />

                                </div>
                            </div>
                            <div className='border border-[#F2F4F7]'></div>
                            <div className='flex flex-col md:flex-row justify-between'>
                                {/* this is left side text  */}
                                <div className='text-textBlueBlack space-y-1'>
                                    <h3 className="font-semibold">Means of Identification</h3>
                                    <p className="text-textGrey text-sm">Kindly provide your correct means of ID.</p>
                                </div>
                                {/* this is right side text  */}
                                <div className='w-full md:w-[40%] space-y-3'>
                                    <AppFormDatePicker
                                        control={control}
                                        name="dateOfBirth"
                                        placeholder="Date of birth (DD/MM/YY)"
                                    />
                                    <AppFormSelect
                                        control={control}
                                        placeholder="Means of Identification"
                                        name="txId"
                                        required={true}
                                        options={countryOptions}
                                    />
                                    <AppFormInput
                                        label="Enter Identification Number"
                                        name="txId"
                                        type="text"
                                        placeholder="Type your Identification Number here"
                                        register={register}
                                        error={errors?.name}
                                    />
                                    <div className=''>
                                        <input type="file" id="file" className="hidden" />
                                        <label htmlFor="file" className='cursor-pointer border border-borderColor rounded hover:bg-gray-100 border-dashed py-3 px-3 flex items-center gap-1 justify-between'>
                                            <h2 className="text-[#7D7878] flex items-center gap-1 text-sm"><CgFileAdd />Upload Valid Identity Document</h2>
                                            <p className="text-primary text-xs font-medium">Select File</p>
                                        </label>
                                        <h2 className="text-[#7D7878] pt-1 text-xs">JPEG, PNG, PDF. Max file size: 2mb</h2>
                                    </div>
                                </div>
                            </div>
                            <div className='border border-[#F2F4F7]'></div>
                            <div className='flex items-center justify-end'>
                                <button type="submit" className="appBtn">Save & Proceed</button>
                                <AppModal
                                    modalOpen={modalOpen}
                                    setModalOpen={setModalOpen}
                                    closeable={false}
                                    primaryButtonTitle="Done"
                                    primaryButtonAction={handleModal}
                                >
                                    <div className='md:w-[450px] text-center py-6 lg:py-8'>
                                        <Image width={200} height={160} src="/assets/icons/verification-success.png" alt="" className="mx-auto size-28 mb-4" />
                                        <h2 className="subTitle">Verification Submitted</h2>
                                        <p className="textG px-10">Verification has been completed, your account will be reviewed</p>
                                    </div>
                                </AppModal>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
};

export default VerifyAccount;