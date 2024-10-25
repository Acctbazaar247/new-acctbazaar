import Image from "next/image";
import { TBusinessKyc } from "../../types/common";

type TEditUserProps = {
  record: TBusinessKyc;
};

const ViewBusinessKyc = ({ record }: TEditUserProps) => {
  const businessKycData = [
    {
      label: "Business Name",
      value: record?.businessName,
    },
    {
      label: "Business Registration",
      value: record?.businessRegistration,
    },
    {
      label: "Business Type",
      value: record?.businessType,
    },
    {
      label: "Business Website",
      value: record?.businessWebsite,
    },
    {
      label: "Business Address",
      value: record?.businessAddress,
    },
    {
      label: "Industry",
      value: record?.industry,
    },
    {
      label: "Primary Contact Person",
      value: record?.primaryContactPerson,
    },
    {
      label: "Position Or Title",
      value: record?.positionOrTitle,
    },
    {
      label: "Email Address",
      value: record?.emailAddress,
    },

    {
      label: "Phone Number",
      value: record?.phoneNumber,
    },

    {
      label: "Bank Account Number",
      value: record?.bankAccountNumber,
    },
    {
      label: "Bank Name",
      value: record?.bankName,
    },
    {
      label: "Tax Identification Number",
      value: record?.taxIdentificationNumber,
    },
    {
      label: "Status",
      value: record?.status,
    },
  ];

  const imageDocs = [
    {
      label: "Business Registration Document",
      value: record?.businessRegistrationDocument,
    },
    {
      label: "Certificate Of Incorporation",
      value: record?.CertificateOfIncorporation,
    },
    {
      label: "Proof Of Address",
      value: record?.proofOfAddress,
    },
    {
      label: "Financial Statements",
      value: record?.financialStatements,
    },
  ];

  if (!businessKycData.length || !imageDocs.length) {
    return null;
  }

  return (
    <div className="md:w-[50vw] overflow-auto space-y-5 p-4 2xl:max-h-[60vh]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
        {businessKycData?.map((data) => (
          <div key={data?.label}>
            <p className="text-textDarkGrey">{data?.label}</p>
            <p className="text-textDark font-medium">{data?.value}</p>
          </div>
        ))}
      </div>

      <p className="text-textDarkGrey text-xl font-medium">Beneficial Owner</p>
      <ul className="gap-4 grid grid-cols-1 md:grid-cols-2">
        {record?.beneficialOwner?.map((owner) => (
          <div key={owner?.fullName}>
            <p className="text-textDark font-medium">
              Full Name: {owner?.fullName}
            </p>
            <p className="text-textDark font-medium">
              Address: {owner?.address}
            </p>
            <p className="text-textDark font-medium">
              Date of Birth: {owner?.dateOfBirth}
            </p>
            <p className="text-textDark font-medium">
              {owner?.ownershipPercentage}
            </p>
            <Image
              src={owner?.identificationDocument as string}
              alt="identity image"
              className="w-full rounded min-h-24 max-h-36 object-cover"
              width={180}
              height={180}
            />
          </div>
        ))}
      </ul>

      <div className="">
        <p className="text-textDarkGrey text-xl font-medium">Documents</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
          {imageDocs?.map((data) => (
            <div key={data?.label}>
              <p className="text-textDarkGrey">{data?.label}</p>

              <Image
                src={data?.value || ""}
                alt="identity image"
                className="w-full rounded min-h-24 max-h-36 object-cover"
                width={180}
                height={180}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewBusinessKyc;
