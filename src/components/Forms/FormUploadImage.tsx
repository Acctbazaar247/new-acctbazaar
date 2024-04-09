import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import Image from "next/image";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};
interface props {
  handleChange: UploadProps["onChange"];
  loading: boolean;
  imgUrl?: string;
  showImg?: boolean;
  onRemove: () => void;
}

const FormUploadImage: React.FC<props> = ({
  handleChange,
  loading,
  imgUrl,
  showImg,
  onRemove,
}) => {
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const props: UploadProps = {
    name: "image",
    multiple: false,
    maxCount: 1,
    action: "https://acct-media-server.onrender.com/api/v1/uploadImg",
    onChange: handleChange,
    beforeUpload: beforeUpload,
    onRemove: () => {
      onRemove();
    },
    onDrop(e) {
      // console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const { Dragger } = Upload;

  return (
    <div className="overflow-hidden max-w-[280px]">
      <Dragger {...props}>
        <div className="cursor-pointer b  rounded hover:bg-gray-100  py-3 px-3 flex items-center justify-center text-center gap-2 flex-col">
          <Image
            width={30}
            height={30}
            className="rounded-full object-cover"
            src="/assets/icons/gallry.png"
            alt=""
          />
          <h2 className="text-[#7D7878] text-xs font-light">
            <span className="font-medium text-gray-700">Click to replace</span>{" "}
            or drag and drop <br />
            SVG, PNG, JPG or GIF (max 800 x 400px)
          </h2>
        </div>
      </Dragger>

      {/* <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={`${process.env.NEXT_PUBLIC_SERVER_URL}/uploadImg`}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      
      >
        {loading ? (
          <LoadingOutlined />
        ) : showImg ? (
          imgUrl ? (
            <img src={imgUrl} alt="" />
          ) : (
            uploadButton
          )
        ) : (
          uploadButton
        )}
      </Upload> */}
    </div>
  );
};

export default FormUploadImage;
