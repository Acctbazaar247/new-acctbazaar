import AttentionAlert from "@/components/shared/AttentionAlert";
import AppFormDatePicker from "@/components/ui/AppFormDatePicker";
import AppFormInput from "@/components/ui/AppFormInput";
import AppFormSelect from "@/components/ui/AppFormSelect";
import AppModal from "@/components/ui/AppModal";
import AppPhoneInput from "@/components/ui/AppPhoneInput";
import HomeLayout from "@/layout/HomeLayout";
import SellerLayout from "@/layout/SellerLayout";
import {
  useGetSingleUserKycQuery,
  useMakeKycRequestMutation,
  useUpdateKycRequestMutation,
} from "@/redux/features/kyc/kycApi";
import { useUploadImageMutation } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hook";
import {
  IGenericErrorMessage,
  ResponseErrorType,
  ResponseSuccessType,
  TBusinessKyc,
  TKyc,
} from "@/types/common";
import { City, Country, State } from "country-state-city";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { CgFileAdd } from "react-icons/cg";
import { toast } from "react-toastify";

const VerifyBusinessAccount = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);

  const [addKycRequest, { isLoading }] = useMakeKycRequestMutation();
  const [uploadImage, { isLoading: imageLoading }] = useUploadImageMutation();
  const [updateKyc, { isLoading: updateLoading }] =
    useUpdateKycRequestMutation();
  const { data, refetch } = useGetSingleUserKycQuery("");

  const [kycPending, setKycPending] = useState(false);
  const [kycDenied, setKycDenied] = useState(false);
  const [denyMessage, setDenyMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [identityImage, setIdentityImage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<TBusinessKyc>();

  const onSubmit: SubmitHandler<TBusinessKyc> = async (data) => {
    if (!identityImage) {
      return toast.error("Please upload your identity image and try again", {
        toastId: 1,
      });
    }

    const submittedData = {
      id: user?.id,
      ...data,
      identityImage,
      ...(kycDenied && { status: "pending", messageByAdmin: "" }),
    };
    console.log(
      "🚀 ~ constonSubmit:SubmitHandler<TBusinessKyc>= ~ submittedData:",
      submittedData
    );

    // if (!kycDenied) {
    //   // console.log(submittedData);
    //   await addKycRequest(submittedData)
    //     .unwrap()
    //     .then((res: ResponseErrorType | ResponseSuccessType) => {
    //       toast.success("KYC request send successfully!", { toastId: 1 });
    //       setModalOpen(true);
    //     })
    //     .catch((res: ResponseErrorType | ResponseSuccessType) => {
    //       toast.error(res?.data?.message || "Something went wrong", {
    //         toastId: 1,
    //       });
    //     });
    // } else if (kycDenied) {
    //   await updateKyc(submittedData)
    //     .unwrap()
    //     .then((res: ResponseErrorType | ResponseSuccessType) => {
    //       toast.success("KYC request updated successfully!", { toastId: 1 });
    //       setModalOpen(true);
    //       setKycDenied(false);
    //     })
    //     .catch((res: ResponseErrorType | ResponseSuccessType) => {
    //       toast.error(res?.data?.message || "Something went wrong", {
    //         toastId: 1,
    //       });
    //     });
    // }
  };

  const countryOptions = useMemo(
    () =>
      Country.getAllCountries().map((country) => ({
        value: country.isoCode,
        label: country.name,
      })),
    []
  );

  const handleModal = () => {
    setModalOpen(false);
    router.push("/marketplace");
    refetch();
  };

  const handleFileUpload = async (value: any) => {
    setLoading(true);
    const formData = new FormData();
    const maxSizeInBytes = 2 * 1024 * 1024;

    if (value?.size && value?.size > maxSizeInBytes) {
      setLoading(false);
      return toast.error("Your file was more than 2 Megabyte!", { toastId: 1 });
    }

    formData.append("image", value);
    await uploadImage(formData)
      .unwrap()
      .then((res) => {
        if (!res.success) {
          toast.error(res?.message || "Something went wrong", { toastId: 1 });
          setLoading(false);
        }
        toast.success("File upload successfully!", { toastId: 1 });
        setIdentityImage(res?.data?.url);
        setLoading(false);
      })
      .catch((res: IGenericErrorMessage) => {
        toast.error(res?.message || "Something went wrong", { toastId: 1 });
        setLoading(false);
      });
  };

  const businessType = [
    { value: "Sole Proprietorship", label: "Sole Proprietorship" },
    { value: "Partnership", label: "Partnership" },
    { value: "Corporation", label: "Corporation" },
    { value: "LLC", label: "LLC" },
  ];

  const IndustryOptions = [
    { value: "Sole Proprietorship", label: "Sole Proprietorship" },
    { value: "Partnership", label: "Partnership" },
    { value: "Corporation", label: "Corporation" },
    { value: "LLC", label: "LLC" },
  ];

  const meansOfIdentificationOptions = [
    { value: "PASSPORT", label: "PASSPORT" },
    { value: "DRIVER_LICENSE", label: "Driver LICENSE" },
    { value: "NATIONAL_ID", label: "NATIONAL ID (NIN)" },
  ];

  useEffect(() => {
    if (data) {
      if (data?.data?.status === "pending") {
        setKycPending(true);
      }
      if (data?.data?.status === "denied") {
        setKycDenied(true);
      }
      if (data?.data?.status === "approved") {
        router?.push("/marketplace");
      }
      setDenyMessage(data?.data?.messageByAdmin);
      setValue("businessName", data?.data?.businessName);
      setValue("phoneNumber", data?.data?.phoneNumber || user?.phoneNumber);
      setValue("businessAddress", data?.data?.businessAddress);
      setIdentityImage(data?.data?.identityImage);
    }
  }, [data, kycPending, router, setValue, user]);

  return (
    <HomeLayout>
      <SellerLayout>
        <div className="container py-5 md:py-10 2xl:py-12">
          {/* this is top section div  */}
          <div className="space-y-1">
            <h2 className="title">Verify your business account</h2>
            <p className="text-textGrey text-xs md:text-sm">
              This helps us ensure you comply with regulations
            </p>
          </div>

          {/* this is main div  */}
          <div className="bg-background rounded min-h-[80dvh] mt-2 md:mt-4 lg:mt-5 2xl:mt-6">
            <div className="md:w-[95%] mx-auto md:py-6  md:px-10">
              <form
                className="w-full py-4 2xl:py-5 space-y-4 lg:space-y-5 2xl:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex flex-col md:flex-row justify-between">
                  {/* this is left side text  */}
                  <div className="text-textBlueBlack space-y-1">
                    <h3 className="font-semibold">Business Information</h3>
                    <p className="text-textGrey text-sm">
                      Make adjustments to your Business <br /> information and
                      save them.
                    </p>
                  </div>
                  {/* this is right side text  */}
                  <div className="w-full md:w-[40%] space-y-3">
                    <AppFormInput
                      label="Business Name"
                      name="businessName"
                      type="text"
                      required
                      register={register}
                      // defaultValue={user?.name}
                      // readOnly={user?.businessName}
                    />

                    <AppFormInput
                      label="Business Registration Number"
                      name="businessRegistration"
                      type="text"
                      required
                      register={register}
                      error={errors?.businessRegistration}
                    />

                    <AppFormSelect
                      control={control}
                      placeholder="Business Type"
                      name="businessType"
                      required={true}
                      options={businessType}
                    />

                    <AppFormSelect
                      control={control}
                      placeholder="Industry"
                      name="industry"
                      required={true}
                      options={IndustryOptions}
                    />

                    <AppFormInput
                      label="Business Address"
                      name="businessAddress"
                      type="text"
                      register={register}
                      error={errors?.businessAddress}
                      required
                    />

                    <AppFormInput
                      label="Business Website"
                      name="businessWebsite"
                      type="text"
                      register={register}
                      error={errors?.businessWebsite}
                      required
                    />
                  </div>
                </div>

                <hr className="border border-borderLight" />

                <div className="flex flex-col md:flex-row justify-between">
                  {/* this is left side text  */}
                  <div className="text-textBlueBlack space-y-1">
                    <h3 className="font-semibold">Contact Information</h3>
                    <p className="text-textGrey text-sm">
                      Add your current home address.
                    </p>
                  </div>
                  {/* this is right side text  */}
                  <div className="w-full md:w-[40%] space-y-3">
                    <AppFormInput
                      label="Primary Contact Person"
                      name="primaryContactPerson"
                      type="text"
                      required
                      placeholder="Type your person name here"
                      register={register}
                      error={errors?.primaryContactPerson}
                    />

                    <AppFormInput
                      label="Position/Title"
                      name="positionOrTitle"
                      type="text"
                      required
                      placeholder="Type your position here"
                      register={register}
                      error={errors?.positionOrTitle}
                    />

                    <AppFormInput
                      label="Email Address"
                      name="emailAddress"
                      type="text"
                      required
                      placeholder="Type your email here"
                      register={register}
                      error={errors?.emailAddress}
                    />

                    <AppPhoneInput
                      name="phoneNumber"
                      control={control}
                      label="Phone Number"
                      placeholder="Phone Number"
                      error={errors?.phoneNumber}
                    />
                  </div>
                </div>

                <hr className="border border-borderLight" />

                <div className="flex flex-col md:flex-row justify-between">
                  {/* this is left side text  */}
                  <div className="text-textBlueBlack space-y-1">
                    <h3 className="font-semibold">Ownership Information</h3>
                    <p className="text-textGrey text-sm">
                      Kindly provide your correct means of ID.
                    </p>
                  </div>
                  {/* this is right side text  */}
                  <div className="w-full md:w-[40%] space-y-3">
                    {/* <AppFormSelect
                      control={control}
                      placeholder="Means of Identification"
                      name="meansOfIdentification"
                      required={true}
                      options={meansOfIdentificationOptions}
                    /> */}

                    <AppFormInput
                      label="Beneficial Owners"
                      name="beneficialOwner"
                      type="text"
                      required
                      placeholder="Type your address here"
                      register={register}
                      error={errors?.beneficialOwner}
                    />

                    <AppFormInput
                      label="Ownership Percentage"
                      name="ownershipPercentage"
                      type="number"
                      required
                      placeholder="Type your address here"
                      register={register}
                      // error={errors?.ownershipPercentage}
                    />

                    <AppFormInput
                      label="User address"
                      name="proofOfAddress"
                      type="text"
                      required
                      placeholder="Type your address here"
                      register={register}
                      error={errors?.proofOfAddress}
                    />

                    <AppFormDatePicker
                      control={control}
                      name="dateOfBirth"
                      label="Date Of Birth"
                      placeholder="Date of birth (DD/MM/YY)"
                    />

                    <div className="">
                      <input
                        onChange={(e) =>
                          handleFileUpload(e.target.files && e.target.files[0])
                        }
                        type="file"
                        id="file"
                        className="hidden"
                        accept="image/*"
                      />
                      <label
                        htmlFor="file"
                        className="cursor-pointer border border-borderColor rounded hover:bg-zinc/20 border-dashed flex items-center gap-1 justify-between"
                      >
                        {loading || imageLoading ? (
                          <AiOutlineLoading3Quarters className="animate-spin text-primary text-xl text-center mx-auto my-3" />
                        ) : (
                          <>
                            {identityImage === "" ||
                            identityImage === undefined ? (
                              <div className="flex items-center justify-between p-3 w-full">
                                <h2 className="text-darkishGrey flex items-center gap-1 text-sm">
                                  <CgFileAdd />
                                  Upload Valid Identity Document
                                </h2>
                                <p className="text-primary text-xs font-medium">
                                  Select File
                                </p>
                              </div>
                            ) : (
                              <Image
                                width={600}
                                height={200}
                                src={identityImage}
                                alt="identity image"
                                className="w-full rounded min-h-40 max-h-44 object-cover"
                              />
                            )}
                          </>
                        )}
                      </label>
                      <h2 className="text-darkishGrey pt-1 text-xs">
                        JPEG, PNG, PDF. Max file size: 2mb
                      </h2>
                    </div>
                  </div>
                </div>

                <hr className="border border-borderLight" />

                <div className="flex flex-col md:flex-row justify-between">
                  {/* this is left side text  */}
                  <div className="text-textBlueBlack space-y-1">
                    <h3 className="font-semibold">Financial Information</h3>
                    <p className="text-textGrey text-sm">
                      Add your current home address.
                    </p>
                  </div>
                  {/* this is right side text  */}
                  <div className="w-full md:w-[40%] space-y-3">
                    <AppFormInput
                      label="Bank Account Number"
                      name="bankAccountNumber"
                      type="number"
                      required
                      placeholder="Type your bank Account Number here"
                      register={register}
                      error={errors?.bankAccountNumber}
                    />
                    <AppFormInput
                      label="Bank Name"
                      name="bankName"
                      type="number"
                      required
                      placeholder="Type your Bank Name here"
                      register={register}
                      error={errors?.bankName}
                    />
                    <AppFormInput
                      label="Tax Identification Number"
                      name="taxIdentificationNumber"
                      type="number"
                      required
                      placeholder="Type your Tax Identification Number here"
                      register={register}
                      error={errors?.taxIdentificationNumber}
                    />
                  </div>
                </div>

                <hr className="border border-borderLight" />

                <div className="flex flex-col md:flex-row justify-between">
                  {/* this is left side text  */}
                  <div className="text-textBlueBlack space-y-1">
                    <h3 className="font-semibold">Documents Upload</h3>
                    <p className="text-textGrey text-sm">
                      Add your current home address.
                    </p>
                  </div>
                  {/* this is right side text  */}
                  <div className="w-full md:w-[40%] space-y-3">
                    <div className="">
                      <input
                        onChange={(e) =>
                          handleFileUpload(e.target.files && e.target.files[0])
                        }
                        type="file"
                        id="file"
                        className="hidden"
                        accept="image/*"
                      />
                      <label
                        htmlFor="file"
                        className="cursor-pointer border border-borderColor rounded hover:bg-zinc/20 border-dashed flex items-center gap-1 justify-between"
                      >
                        {loading || imageLoading ? (
                          <AiOutlineLoading3Quarters className="animate-spin text-primary text-xl text-center mx-auto my-3" />
                        ) : (
                          <>
                            {identityImage === "" ||
                            identityImage === undefined ? (
                              <div className="flex items-center justify-between p-3 w-full">
                                <h2 className="text-darkishGrey flex items-center gap-1 text-sm">
                                  <CgFileAdd />
                                  Upload Valid Identity Document
                                </h2>
                                <p className="text-primary text-xs font-medium">
                                  Select File
                                </p>
                              </div>
                            ) : (
                              <Image
                                width={600}
                                height={200}
                                src={identityImage}
                                alt="identity image"
                                className="w-full rounded min-h-40 max-h-44 object-cover"
                              />
                            )}
                          </>
                        )}
                      </label>
                      <h2 className="text-darkishGrey pt-1 text-xs">
                        JPEG, PNG, PDF. Max file size: 2mb
                      </h2>
                    </div>
                    <div className="">
                      <input
                        onChange={(e) =>
                          handleFileUpload(e.target.files && e.target.files[0])
                        }
                        type="file"
                        id="file"
                        className="hidden"
                        accept="image/*"
                      />
                      <label
                        htmlFor="file"
                        className="cursor-pointer border border-borderColor rounded hover:bg-zinc/20 border-dashed flex items-center gap-1 justify-between"
                      >
                        {loading || imageLoading ? (
                          <AiOutlineLoading3Quarters className="animate-spin text-primary text-xl text-center mx-auto my-3" />
                        ) : (
                          <>
                            {identityImage === "" ||
                            identityImage === undefined ? (
                              <div className="flex items-center justify-between p-3 w-full">
                                <h2 className="text-darkishGrey flex items-center gap-1 text-sm">
                                  <CgFileAdd />
                                  Upload Valid Identity Document
                                </h2>
                                <p className="text-primary text-xs font-medium">
                                  Select File
                                </p>
                              </div>
                            ) : (
                              <Image
                                width={600}
                                height={200}
                                src={identityImage}
                                alt="identity image"
                                className="w-full rounded min-h-40 max-h-44 object-cover"
                              />
                            )}
                          </>
                        )}
                      </label>
                      <h2 className="text-darkishGrey pt-1 text-xs">
                        JPEG, PNG, PDF. Max file size: 2mb
                      </h2>
                    </div>
                    <div className="">
                      <input
                        onChange={(e) =>
                          handleFileUpload(e.target.files && e.target.files[0])
                        }
                        type="file"
                        id="file"
                        className="hidden"
                        accept="image/*"
                      />
                      <label
                        htmlFor="file"
                        className="cursor-pointer border border-borderColor rounded hover:bg-zinc/20 border-dashed flex items-center gap-1 justify-between"
                      >
                        {loading || imageLoading ? (
                          <AiOutlineLoading3Quarters className="animate-spin text-primary text-xl text-center mx-auto my-3" />
                        ) : (
                          <>
                            {identityImage === "" ||
                            identityImage === undefined ? (
                              <div className="flex items-center justify-between p-3 w-full">
                                <h2 className="text-darkishGrey flex items-center gap-1 text-sm">
                                  <CgFileAdd />
                                  Upload Valid Identity Document
                                </h2>
                                <p className="text-primary text-xs font-medium">
                                  Select File
                                </p>
                              </div>
                            ) : (
                              <Image
                                width={600}
                                height={200}
                                src={identityImage}
                                alt="identity image"
                                className="w-full rounded min-h-40 max-h-44 object-cover"
                              />
                            )}
                          </>
                        )}
                      </label>
                      <h2 className="text-darkishGrey pt-1 text-xs">
                        JPEG, PNG, PDF. Max file size: 2mb
                      </h2>
                    </div>
                    <div className="">
                      <input
                        onChange={(e) =>
                          handleFileUpload(e.target.files && e.target.files[0])
                        }
                        type="file"
                        id="file"
                        className="hidden"
                        accept="image/*"
                      />
                      <label
                        htmlFor="file"
                        className="cursor-pointer border border-borderColor rounded hover:bg-zinc/20 border-dashed flex items-center gap-1 justify-between"
                      >
                        {loading || imageLoading ? (
                          <AiOutlineLoading3Quarters className="animate-spin text-primary text-xl text-center mx-auto my-3" />
                        ) : (
                          <>
                            {identityImage === "" ||
                            identityImage === undefined ? (
                              <div className="flex items-center justify-between p-3 w-full">
                                <h2 className="text-darkishGrey flex items-center gap-1 text-sm">
                                  <CgFileAdd />
                                  Upload Valid Identity Document
                                </h2>
                                <p className="text-primary text-xs font-medium">
                                  Select File
                                </p>
                              </div>
                            ) : (
                              <Image
                                width={600}
                                height={200}
                                src={identityImage}
                                alt="identity image"
                                className="w-full rounded min-h-40 max-h-44 object-cover"
                              />
                            )}
                          </>
                        )}
                      </label>
                      <h2 className="text-darkishGrey pt-1 text-xs">
                        JPEG, PNG, PDF. Max file size: 2mb
                      </h2>
                    </div>
                  </div>
                </div>

                <hr className="border border-borderLight" />
                {!kycPending && (
                  <div className="flex items-center justify-end">
                    {/* {isLoading || loading || updateLoading ? (
                                            <button
                                                type="button"
                                                className="appBtn px-14 flex items-center justify-center"
                                            >
                                                <AiOutlineLoading3Quarters className="animate-spin text-white text-2xl" />
                                            </button>
                                        ) : (
                                            <button type="submit" className="appBtn">
                                                Save & Proceed
                                            </button>
                                        )} */}

                    <button
                      disabled={isLoading || loading || updateLoading}
                      type="submit"
                      className="appBtn"
                    >
                      Save & Proceed
                    </button>

                    <AppModal
                      modalOpen={modalOpen}
                      setModalOpen={setModalOpen}
                      closeable={false}
                      primaryButtonTitle="Done"
                      primaryButtonAction={handleModal}
                    >
                      <div className="md:w-[450px] text-center py-6 lg:py-8">
                        <Image
                          width={200}
                          height={160}
                          src="/assets/icons/verification-success.png"
                          alt=""
                          className="mx-auto size-28 mb-4"
                        />
                        <h2 className="subTitle">Verification Submitted</h2>
                        <p className="textG px-10">
                          Verification has been completed, your account will be
                          reviewed
                        </p>
                      </div>
                    </AppModal>
                  </div>
                )}

                {kycPending && <AttentionAlert />}

                {kycDenied && (
                  <AttentionAlert
                    kycDenied={kycDenied}
                    variant="danger"
                    title="Your Kyc Request are denied for some reason, Resubmit with valid information."
                    description={denyMessage}
                  />
                )}
              </form>
            </div>
          </div>
        </div>
      </SellerLayout>
    </HomeLayout>
  );
};

export default VerifyBusinessAccount;
