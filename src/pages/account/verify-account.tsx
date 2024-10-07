import AppFormDatePicker from "@/components/ui/AppFormDatePicker";
import AppFormInput from "@/components/ui/AppFormInput";
import AppFormSelect from "@/components/ui/AppFormSelect";
import AppModal from "@/components/ui/AppModal";
import HomeLayout from "@/layout/HomeLayout";
import { useUploadImageMutation } from "@/redux/features/user/userApi";
import { useAppSelector } from "@/redux/hook";
import {
  IGenericErrorMessage,
  ResponseErrorType,
  ResponseSuccessType,
  TKyc,
} from "@/types/common";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CgFileAdd } from "react-icons/cg";
import { toast } from "react-toastify";
import { City, Country, State } from "country-state-city";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  useGetSingleUserKycQuery,
  useMakeKycRequestMutation,
  useUpdateKycRequestMutation,
} from "@/redux/features/kyc/kycApi";
import AttentionAlert from "@/components/shared/AttentionAlert";
import SellerLayout from "@/layout/SellerLayout";
import AppPhoneInput from "@/components/ui/AppPhoneInput";

const VerifyAccount = () => {
  const [kycPending, setKycPending] = useState(false);
  const [kycDenied, setKycDenied] = useState(false);
  const [denyMessage, setDenyMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [identityImage, setIdentityImage] = useState("");
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const user = useAppSelector((state) => state.user.user);
  const [addKycRequest, { isLoading }] = useMakeKycRequestMutation();
  const [updateKyc, { isLoading: updateLoading }] =
    useUpdateKycRequestMutation();
  const [uploadImage, { isLoading: imageLoading }] = useUploadImageMutation();
  const { data, refetch } = useGetSingleUserKycQuery("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<TKyc>();

  const onSubmit: SubmitHandler<TKyc> = async (data) => {
    if (!identityImage) {
      return toast.error("Please upload your identity image and try again", {
        toastId: 1,
      });
    }

    const submittedData = {
      id: user?.id,
      ...data,
      identityImage,
      identificationNumber: data.identificationNumber.toString(),
      ...(kycDenied && { status: "pending", messageByAdmin: "" }),
      telegramNumber: `${data?.telegramNumber}`,
    };

    if (!kycDenied) {
      // console.log(submittedData);
      await addKycRequest(submittedData)
        .unwrap()
        .then((res: ResponseErrorType | ResponseSuccessType) => {
          toast.success("KYC request send successfully!", { toastId: 1 });
          setModalOpen(true);
        })
        .catch((res: ResponseErrorType | ResponseSuccessType) => {
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

  const countryOptions = useMemo(
    () =>
      Country.getAllCountries().map((country) => ({
        value: country.isoCode,
        label: country.name,
      })),
    []
  );

  const selectedCountry = watch("country");

  const selectedState = watch("state");

  const stateOptions = useMemo(() => {
    const selectedCountryDetails = Country.getAllCountries().find(
      (single) => single.isoCode === selectedCountry
    );

    return selectedCountryDetails?.isoCode
      ? State.getStatesOfCountry(selectedCountryDetails.isoCode).map(
          (state) => ({
            value: state.isoCode,
            label: state.name,
          })
        )
      : [];
  }, [selectedCountry]);

  const cityOption = useMemo(() => {
    const selectedCountryDetails = Country.getAllCountries().find(
      (single) => single.isoCode === selectedCountry
    );

    const stateDetails = State.getStatesOfCountry(
      selectedCountryDetails?.isoCode
    ).find((single) => single.isoCode === selectedState);

    return selectedCountryDetails?.isoCode && stateDetails?.isoCode
      ? City.getCitiesOfState(
          selectedCountryDetails.isoCode,
          stateDetails?.isoCode
        ).map((city) => ({
          value: city.name,
          label: city.name,
        }))
      : [];
  }, [selectedCountry, selectedState]);

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
      .then((res: any) => {
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
      setValue("name", data?.data?.name || user?.name);
      setValue("phoneNumber", data?.data?.phoneNumber || user?.phoneNumber);
      setValue("whatsAppNumber", data?.data?.whatsAppNumber);
      setValue("telegramNumber", data?.data?.telegramNumber);
      setValue("address", data?.data?.address);
      setValue("birthDate", data?.data?.birthDate);
      setValue("country", data?.data?.country);
      setValue("state", data?.data?.state);
      setValue("city", data?.data?.city);
      setValue("userName", data?.data?.userName);
      setValue("identificationNumber", data?.data?.identificationNumber);
      setValue("meansOfIdentification", data?.data?.meansOfIdentification);
      setValue(
        "identificationExpiredDate",
        data?.data?.identificationExpiredDate
      );
      setIdentityImage(data?.data?.identityImage);
    }
  }, [data, kycPending, router, setValue, user]);

  return (
    <HomeLayout>
      <SellerLayout>
        <div className="container py-5 md:py-10 2xl:py-12">
          {/* this is top section div  */}
          <div className="space-y-1">
            <h2 className="title">Verify your account</h2>
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
                    <h3 className="font-semibold">Personal Information</h3>
                    <p className="text-textGrey text-sm">
                      Make adjustments to your personal <br /> information and
                      save them.
                    </p>
                  </div>
                  {/* this is right side text  */}
                  <div className="w-full md:w-[40%] space-y-3">
                    <AppFormInput
                      label="Full Name"
                      name="name"
                      type="text"
                      required
                      register={register}
                      defaultValue={user?.name}
                      readOnly={user?.isVerifiedByAdmin}
                    />

                    <AppFormInput
                      label="Email"
                      name="email"
                      type="email"
                      register={register}
                      defaultValue={user?.email}
                      readOnly={true}
                    />

                    <AppFormInput
                      label="Username"
                      name="userName"
                      type="text"
                      required
                      register={register}
                      error={errors?.userName}
                    />

                    <AppPhoneInput
                      name="phoneNumber"
                      control={control}
                      label="Phone Number"
                      placeholder="Phone Number"
                      error={errors?.phoneNumber}
                    />

                    <AppPhoneInput
                      name="whatsAppNumber"
                      control={control}
                      label="WhatsApp Number"
                      placeholder="WhatsApp Number"
                      error={errors?.whatsAppNumber}
                    />

                    <AppFormInput
                      label="Telegram Username"
                      name="telegramNumber"
                      type="text"
                      register={register}
                      error={errors?.telegramNumber}
                      required
                    />
                  </div>
                </div>
                <div className="border border-borderLight"></div>
                <div className="flex flex-col md:flex-row justify-between">
                  {/* this is left side text  */}
                  <div className="text-textBlueBlack space-y-1">
                    <h3 className="font-semibold">Residential Details</h3>
                    <p className="text-textGrey text-sm">
                      Add your current home address.
                    </p>
                  </div>
                  {/* this is right side text  */}
                  <div className="w-full md:w-[40%] space-y-3">
                    <AppFormSelect
                      control={control}
                      placeholder="Country of residence"
                      name="country"
                      //   required={true}
                      options={countryOptions}
                      defaultValue={
                        user?.state
                          ? { value: user?.state, label: user?.state }
                          : undefined
                      }
                      required
                    />

                    <AppFormSelect
                      control={control}
                      placeholder="Select State"
                      name="state"
                      required
                      defaultValue={
                        user?.state
                          ? { value: user?.state, label: user?.state }
                          : undefined
                      }
                      options={stateOptions}
                    />

                    <AppFormSelect
                      control={control}
                      placeholder="Select City"
                      name="city"
                      required
                      options={cityOption ? cityOption : []}
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
                  </div>
                </div>
                <div className="border border-borderLight"></div>
                <div className="flex flex-col md:flex-row justify-between">
                  {/* this is left side text  */}
                  <div className="text-textBlueBlack space-y-1">
                    <h3 className="font-semibold">Means of Identification</h3>
                    <p className="text-textGrey text-sm">
                      Kindly provide your correct means of ID.
                    </p>
                  </div>
                  {/* this is right side text  */}
                  <div className="w-full md:w-[40%] space-y-3">
                    <AppFormDatePicker
                      control={control}
                      name="birthDate"
                      label="Date Of Birth"
                      placeholder="Date of birth (DD/MM/YY)"
                    />
                    <AppFormSelect
                      control={control}
                      placeholder="Means of Identification"
                      name="meansOfIdentification"
                      required={true}
                      options={meansOfIdentificationOptions}
                    />
                    <AppFormInput
                      label="Enter Identification Number"
                      name="identificationNumber"
                      type={
                        watch("meansOfIdentification") === "PASSPORT"
                          ? "number"
                          : "text"
                      }
                      placeholder="Type your Identification Number here"
                      register={register}
                      required
                      error={errors?.identificationNumber}
                    />
                    {watch("meansOfIdentification") === "PASSPORT" && (
                      <>
                        <AppFormDatePicker
                          control={control}
                          name="identificationExpiredDate"
                          label="Passport Expire Date"
                          placeholder="Enter Expired Date"
                        />
                      </>
                    )}

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
                        className="cursor-pointer border border-borderColor rounded hover:bg-gray-100 border-dashed flex items-center gap-1 justify-between"
                      >
                        {loading || imageLoading ? (
                          <AiOutlineLoading3Quarters className="animate-spin text-primary text-xl text-center mx-auto my-3" />
                        ) : (
                          <>
                            {identityImage === ("" || undefined) ? (
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
                              <img
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
                <div className="border border-borderLight"></div>
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

export default VerifyAccount;
