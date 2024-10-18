import Link from "next/link";
import { IUser } from "../../types/common";
import { City, Country, State } from "country-state-city";
import Image from "next/image";

type TEditUserProps = {
  record: IUser | any;
};

const ViewUser = ({ record }: TEditUserProps) => {
  const countryDetails = Country.getAllCountries().find(
    (single) => single.isoCode === record?.country
  );

  const stateDetails = State.getStatesOfCountry(record?.country).find(
    (single) => single.isoCode === record?.state
  );

  const kycData = [
    {
      label: "Name",
      value: record?.ownBy?.name,
    },
    {
      label: "Username",
      value: record?.userName,
    },
    {
      label: "Phone Number",
      value: record?.ownBy?.phoneNumber,
    },
    {
      label: "WhatsApp Number",
      value: record?.whatsAppNumber,
    },
    {
      label: "Telegram username",
      value: record?.telegramNumber,
    },
    {
      label: "Email",
      value: record?.ownBy?.email,
    },
    {
      label: "Country",
      value: countryDetails?.name,
    },
    {
      label: "State",
      value: stateDetails?.name,
    },
    {
      label: "City",
      value: record?.city,
    },
    {
      label: "Address",
      value: record?.address,
    },
    {
      label: "Date of Birth",
      value: record?.birthDate,
    },
    {
      label: "Means Of Identification",
      value: record?.meansOfIdentification,
    },
    {
      label: "Identification Number",
      value: record?.identificationNumber,
    },
  ];

  return (
    <div className="w-[560px] space-y-5 p-4 ">
      <div className="flex items-center justify-center py-3">
        <Image
          src={record?.ownBy?.profileImg || ""}
          alt={record?.ownBy?.name}
          className="w-[120px] 2xl:w-[150px] h-[120px] 2xl:h-[150px] rounded-full bg-gray-200"
          width={150}
          height={150}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
        {kycData?.map((data) => (
          <div key={data?.label}>
            <p className="text-darkishGrey">{data?.label}</p>
            <p className="text-textDark font-medium">{data?.value}</p>
          </div>
        ))}
        <Link href={record?.identityImage}>
          {(record?.identityImage as string).endsWith(".pdf") ? (
            <span className="text-red">
              This is a pdf file : {record?.identityImage}
            </span>
          ) : (
            <Image
              src={record?.identityImage}
              alt="identity image"
              className="w-full rounded min-h-24 max-h-44 object-cover"
              width={180}
              height={180}
            />
          )}
        </Link>
      </div>
    </div>
  );
};

export default ViewUser;
