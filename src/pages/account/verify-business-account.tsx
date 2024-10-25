import { KycImageUpload } from "@/components/kyc/KycImageUpload";
import AttentionAlert from "@/components/shared/AttentionAlert";
import AppButton from "@/components/ui/AppButton";
import AppFormDatePicker from "@/components/ui/AppFormDatePicker";
import AppFormInput from "@/components/ui/AppFormInput";
import AppFormSelect from "@/components/ui/AppFormSelect";
import AppModal from "@/components/ui/AppModal";
import AppPhoneInput from "@/components/ui/AppPhoneInput";
import Loading from "@/components/ui/Loading";
import HomeLayout from "@/layout/HomeLayout";
import SellerLayout from "@/layout/SellerLayout";
import {
  useGetSingleUserBusinessKycQuery,
  useMakeBusinessKycRequestMutation,
  useUpdateBusinessKycRequestMutation,
} from "@/redux/features/businesskyc/businesskycApi";
import { useAppSelector } from "@/redux/hook";
import {
  ResponseErrorType,
  ResponseSuccessType,
  TBusinessKyc,
} from "@/types/common";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { RxCrossCircled } from "react-icons/rx";
import { toast } from "react-toastify";

const VerifyBusinessAccount = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);

  const [addBusinessKycRequest, { isLoading }] =
    useMakeBusinessKycRequestMutation();

  const [updateKyc, { isLoading: updateLoading }] =
    useUpdateBusinessKycRequestMutation();
  const {
    data,
    refetch,
    isLoading: kycLoading,
  } = useGetSingleUserBusinessKycQuery("");

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
  } = useForm<TBusinessKyc>({
    defaultValues: {
      beneficialOwner: [
        {
          fullName: "",
          ownershipPercentage: "",
          address: "",
          dateOfBirth: "",
          identificationDocument: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "beneficialOwner",
  });

  const handleAppend = () => {
    append({
      fullName: "",
      ownershipPercentage: "",
      address: "",
      dateOfBirth: "",
      identificationDocument: "",
    });
  };

  const onSubmit: SubmitHandler<TBusinessKyc> = async (data) => {
    const submittedData = {
      id: user?.id,
      ...data,
      identityImage,
      status: "pending",
    };

    if (!kycDenied) {
      // console.log(submittedData);
      await addBusinessKycRequest(submittedData)
        .unwrap()
        .then((res) => {
          toast.success("KYC request send successfully!", { toastId: 1 });
          setModalOpen(true);
        })
        .catch((res) => {
          toast.error(res?.data?.message || "Something went wrong", {
            toastId: 1,
          });
        });
    } else if (kycDenied) {
      await updateKyc(submittedData)
        .unwrap()
        .then((res: ResponseErrorType | ResponseSuccessType) => {
          toast.success("KYC request updated successfully!", { toastId: 1 });
          setModalOpen(true);
          setKycDenied(false);
        })
        .catch((res: ResponseErrorType | ResponseSuccessType) => {
          toast.error(res?.data?.message || "Something went wrong", {
            toastId: 1,
          });
        });
    }
  };

  const handleModal = () => {
    setModalOpen(false);
    router.push("/marketplace");
    refetch();
  };

  const businessType = [
    { value: "soleProprietorship", label: "Sole Proprietorship" },
    { value: "partnership", label: "Partnership" },
    { value: "corporation", label: "Corporation" },
    { value: "llc", label: "LLC" },
    { value: "others", label: "Others" },
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
      setValue("businessRegistration", data?.data?.businessRegistration);
      setValue("industry", data?.data?.industry);
      setValue("businessWebsite", data?.data?.businessWebsite);
      setValue("businessType", data?.data?.businessType);
      setValue("phoneNumber", data?.data?.phoneNumber || user?.phoneNumber);
      setValue("businessAddress", data?.data?.businessAddress);
      setValue("primaryContactPerson", data?.data?.primaryContactPerson);
      setValue("positionOrTitle", data?.data?.positionOrTitle);
      setValue("emailAddress", data?.data?.emailAddress);
      setValue("bankAccountNumber", data?.data?.bankAccountNumber);
      setValue("bankName", data?.data?.bankName);
      setValue("taxIdentificationNumber", data?.data?.taxIdentificationNumber);
      setValue(
        "businessRegistrationDocument",
        data?.data?.businessRegistrationDocument
      );
      setValue("proofOfAddress", data?.data?.proofOfAddress);
      setValue("financialStatements", data?.data?.financialStatements);
      setValue(
        "CertificateOfIncorporation",
        data?.data?.CertificateOfIncorporation
      );
      setValue("beneficialOwner", data?.data?.beneficialOwner);
      setIdentityImage(data?.data?.identityImage);
    }
  }, [data, kycPending, router, setValue, user]);

  if (kycLoading) {
    return <Loading />;
  }

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
                      error={errors?.businessName}
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
                      required
                      options={businessType}
                    />

                    <AppFormInput
                      label="Industry"
                      name="industry"
                      type="text"
                      register={register}
                      required
                      error={errors?.businessAddress}
                    />

                    <AppFormInput
                      label="Business Address"
                      name="businessAddress"
                      type="text"
                      register={register}
                      error={errors?.businessAddress}
                      required
                    />

                    {/* <AppFormInput
                      label="Business Website"
                      name="businessWebsite"
                      type="text"
                      required
                      register={register}
                      error={errors?.businessWebsite}
                    /> */}
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
                      type="email"
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
                    {fields.map((owner, index) => (
                      <div key={owner.id} className="space-y-3">
                        <div className="flex justify-between items-center">
                          <p className="text-textBlueBlack font-semibold">
                            Beneficial Owner person: {index > 8 ? "" : "0"}
                            {index + 1}
                          </p>
                          <button
                            onClick={() => remove(index)}
                            className="text-textBlueBlack text-2xl cursor-pointer hover:text-primary"
                          >
                            <RxCrossCircled />
                          </button>
                        </div>

                        <AppFormInput
                          label={`Beneficial Owner`}
                          name={`beneficialOwner[${index}].fullName`}
                          type="text"
                          required
                          placeholder="Full Name"
                          defaultValue={owner.fullName}
                          register={register}
                          error={errors?.beneficialOwner?.[index]?.fullName}
                        />

                        <AppFormInput
                          label="Ownership Percentage"
                          name={`beneficialOwner[${index}].ownershipPercentage`}
                          type="text"
                          required
                          placeholder="Ownership Percentage"
                          defaultValue={owner.ownershipPercentage}
                          register={register}
                          error={
                            errors?.beneficialOwner?.[index]
                              ?.ownershipPercentage
                          }
                        />

                        <AppFormInput
                          label="Address"
                          name={`beneficialOwner[${index}].address`}
                          type="text"
                          required
                          placeholder="Address"
                          defaultValue={owner.address}
                          register={register}
                          error={errors?.beneficialOwner?.[index]?.address}
                        />

                        <AppFormDatePicker
                          control={control}
                          name={`beneficialOwner[${index}].dateOfBirth`}
                          defaultValue={owner.dateOfBirth}
                          placeholder="Date of Birth"
                        />

                        <KycImageUpload
                          control={control}
                          name={`beneficialOwner[${index}].identificationDocument`}
                          required
                          placeholder="Identification Document"
                        />
                      </div>
                    ))}
                    <div className="flex justify-center">
                      <AppButton
                        label="Add Beneficial Owner"
                        type="button"
                        onClick={handleAppend}
                        size="small"
                        variant="outline"
                      />
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
                      type="text"
                      required
                      placeholder="Type your bank Account Number here"
                      register={register}
                      error={errors?.bankAccountNumber}
                    />
                    <AppFormInput
                      label="Bank Name"
                      name="bankName"
                      type="text"
                      required
                      placeholder="Type your Bank Name here"
                      register={register}
                      error={errors?.bankName}
                    />
                    <AppFormInput
                      label="Tax Identification Number"
                      name="taxIdentificationNumber"
                      type="text"
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
                    <KycImageUpload
                      name="CertificateOfIncorporation"
                      control={control}
                      placeholder="Upload Certificate of Incorporation Document"
                      required
                    />

                    <KycImageUpload
                      name="businessRegistrationDocument"
                      control={control}
                      required
                      placeholder="Upload Business Registration Document"
                    />

                    <KycImageUpload
                      name="proofOfAddress"
                      control={control}
                      required
                      placeholder="Upload Proof of Address Document"
                    />

                    {/* <KycImageUpload
                      name="financialStatements"
                      control={control}
                      placeholder="Upload Valid Financial Statements Document"
                    /> */}
                  </div>
                </div>
                <hr className="border border-borderLight" />
                {!kycPending && (
                  <div className="flex items-center justify-end">
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
                    title="Your Business Kyc Request are denied for some reason, Resubmit with valid information."
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
