import { SubmitHandler, useForm } from "react-hook-form";
import AppFormTextarea from "../ui/AppFormTextarea";
import AppFormSelect from "../ui/AppFormSelect";
import AppFormInput from "../ui/AppFormInput";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ACCOUNT_CATEGORIES } from "@/shared";
import { Avatar } from "antd";
import { AccountCategory } from "@/types/common";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setAccountCard } from "@/redux/features/account/accountSlice";
import AppModal from "../ui/AppModal";
import Image from "next/image";

interface FormData {
  category: AccountCategory;
  name: string;
  description: string;
  price: number;
}

type TAddSellAccount = {
  updateProgress: Dispatch<SetStateAction<number>>;
};

export default function AddSellAccount({ updateProgress }: TAddSellAccount) {
  const [modalOpen, setModalOpen] = useState(true);
  const [userGuide, setUserGuide] = useState(1);
  const user = useAppSelector((state) => state.user.user);
  const { accountCard } = useAppSelector((state) => state.account);
  useEffect(() => {
    if (!user?.isPaidForSeller) {
      setModalOpen(true);
    }
  }, [user?.isPaidForSeller]);

  const dispatch = useAppDispatch();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      category: accountCard?.category,
      name: accountCard.name,
      description: accountCard?.description,
      price: accountCard?.price,
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    updateProgress(3);
    dispatch(setAccountCard(data));
  };

  const categoryOptions = ACCOUNT_CATEGORIES.map((single) => ({
    value: single?.value,
    label: (
      <div className="flex gap-2 items-center">
        <Avatar src={single.imageUrl}></Avatar>
        <span>{single.label}</span>
      </div>
    ),
  }));

  const handleSkipModal = () => {
    setModalOpen(false);
    setUserGuide(1);
    updateProgress(2);
  };

  const handleUserGuide = (value: string) => {
    if (value === "next" && userGuide < 8) {
      setUserGuide(userGuide + 1);
    } else if (value === "prev" && userGuide > 1) {
      setUserGuide(userGuide - 1);
    } else if (userGuide === 8) {
      setModalOpen(false);
      setUserGuide(1);
      updateProgress(2);
    }
  };

  let content;
  if (userGuide === 1) {
    content = (
      <div className="text-center space-y-4 px-6">
        <div className="shadow-md px-6 py-4 rounded-md w-fit mx-auto">
          <Image
            src={"/assets/account/Input field.png"}
            width={400}
            height={60}
            className="w-72 h-14 object-contain"
            alt="user guide image"
          />
        </div>
        <p>
          When you add social media accounts like{" "}
          <span className="textB">Facebook</span>,{" "}
          <span className="textB">Instagram</span>,{" "}
          <span className="textB">Twitter</span>, or{" "}
          <span className="textB">Snapchat</span>, try putting the link of the
          account in the preview link option.
        </p>

        <p>
          This helps <span className="textB">acctBazaar.com</span> show a
          preview of your accounts so buyers can check them before buying, which
          can help you sell more. Remember, this is optional.
        </p>
      </div>
    );
  } else if (userGuide === 2) {
    content = (
      <div className="text-center space-y-4 px-6">
        <div className="w-fit mx-auto">
          <Image
            src={"/assets/account/container.png"}
            width={400}
            height={90}
            className="w-[380px] h-[96] object-contain"
            alt="user guide image"
          />
        </div>
        <p>
          If you&apos;re uploading <span className="textB">WhatsApp</span> or{" "}
          <span className="textB">Google Voice accounts</span>, make sure the
          account name is just the NUMBER and then add any other info. You can
          use your phone number as the account password so buyers can contact
          you for codes if needed.
        </p>
      </div>
    );
  } else if (userGuide === 3) {
    content = (
      <div className="text-center space-y-4 px-6">
        <div className="w-fit mx-auto">
          <Image
            src={"/assets/account/creadential.png"}
            width={400}
            height={90}
            className="w-[380px] h-[96] object-contain"
            alt="user guide image"
          />
        </div>
        <p>
          For social media accounts that need verification before access, fill
          in the email and password details in the 2FA information section when
          you upload them.
        </p>
      </div>
    );
  } else if (userGuide === 4) {
    content = (
      <div className="text-center space-y-4 px-6">
        <div className="w-fit mx-auto">
          <Image
            src={"/assets/account/form.png"}
            width={400}
            height={90}
            className="w-[380px] h-[96] object-contain"
            alt="user guide image"
          />
        </div>
        <p>
          When you name your account, especially if it&apos;s been around for 1
          to 5 years or more, make sure to put how long you&apos;ve had it in
          the Name section. Keep it short and simple, like 4 Years Facebook
          Account. You can give more details about the account in the
          description part.
        </p>
      </div>
    );
  } else if (userGuide === 5) {
    content = (
      <div className="text-center space-y-4 px-6">
        <div className="w-fit mx-auto">
          <Image
            src={"/assets/account/checkout.png"}
            width={400}
            height={90}
            className="w-[380px] h-[96] object-contain"
            alt="user guide image"
          />
        </div>
        <p>
          If you want to sell accounts that don&apos;t fit into any category,
          choose &quot;Others&quot; when you upload them.
        </p>
      </div>
    );
  } else if (userGuide === 6) {
    content = (
      <div className="text-center space-y-4 px-6">
        <div className="w-fit mx-auto">
          <Image
            src={"/assets/account/gmail.png"}
            width={400}
            height={90}
            className="w-[380px] h-[96] object-contain"
            alt="user guide image"
          />
        </div>
        <p>
          When you upload email accounts, use the email address as the username.
          You don&apos;t need to repeat the email in the extra information
          section.
        </p>
      </div>
    );
  } else if (userGuide === 7) {
    content = (
      <div className="text-center space-y-4 px-6">
        <div className="w-fit mx-auto">
          <Image
            src={"/assets/account/sucess.png"}
            width={400}
            height={90}
            className="w-[380px] h-[96] object-contain"
            alt="user guide image"
          />
        </div>
        <p>
          All accounts you upload have to be checked before they can be sold on
          AcctBazaar. So, make sure all the information you give is right.
        </p>
      </div>
    );
  } else if (userGuide === 8) {
    content = (
      <div className="text-center space-y-4 px-6">
        <div className="w-fit mx-auto">
          <Image
            src={"/assets/account/name.png"}
            width={400}
            height={90}
            className="w-[380px] h-[96] object-contain"
            alt="user guide image"
          />
        </div>
        <p>
          When uploading gift cards, you may use the gift card code as the
          username and the expiry date, if applicable, or a repetition of the
          code as the password. Additionally, please include the image if
          it&apos;s a physical card or input any other relevant information
          about the card if it&apos;s an e-code. Don&apos;t forget to specify
          the country of the card during the upload process.
        </p>
      </div>
    );
  }

  return (
    <>
      <AppModal
        closeable={false}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      >
        <div className="md:w-[500px]">
          {/* this is top section of the div  */}
          <div className=" flex items-center justify-between">
            <div className="">
              <h1 className="title">Upload Guide</h1>
              <p className="text-textGrey text-xs md:text-sm font-normal w-fit">
                This guide helps you upload accounts better
              </p>
            </div>
            <button
              className="font-medium text-textBlack underline text-base"
              onClick={handleSkipModal}
            >
              Skip
            </button>
          </div>
          {/* this is body section  */}
          <div className="py-6">{content}</div>
          {/* this is footer section  */}
          <div className="flex items-center justify-between">
            {userGuide > 1 && (
              <button
                onClick={() => handleUserGuide("prev")}
                className="appOutlineBtn"
              >
                Previous
              </button>
            )}
            <h4>{userGuide}/8</h4>
            <button onClick={() => handleUserGuide("next")} className="appBtn">
              {userGuide === 8 ? "Proceed" : "Next"}
            </button>
          </div>
        </div>
      </AppModal>

      <div className="bg-white rounded-2xl w-full min-h-[80vh] pt-4 md:p-6 2xl:p-8">
        <h2
          onClick={() => setModalOpen(true)}
          className="subTitle pt-2 2xl:pt-6 pb-6 2xl:pb-8 text-center"
        >
          Add Account
        </h2>

        <form
          className="md:w-1/2 mx-auto space-y-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h4 className="text-lg">Account Information</h4>
          <AppFormSelect
            control={control}
            placeholder="Select account category"
            name="category"
            label={"You can only select one account at a time"}
            required={true}
            options={categoryOptions}
          />
          <div className="">
            <AppFormInput
              label="Name"
              name="name"
              type="text"
              placeholder="Type your name here"
              register={register}
              required
              error={errors?.name}
            />
            <p className="textG font-normal">
              For e.g., 4 Years Facebook Account
            </p>
          </div>
          <AppFormTextarea
            label="Description"
            name="description"
            required
            register={register}
            error={errors?.description}
          />
          <AppFormInput
            label="Enter your price"
            name="price"
            type="number"
            required
            placeholder="Enter amount"
            register={register}
            error={errors?.name}
          />
          <div className="flex items-center justify-center">
            <button type="submit" className="appBtn px-10">
              Continue
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
