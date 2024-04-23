import config from "@/utils/config";
import React from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

type Props = {
  children: React.ReactNode;
};

const AppCaptcha = (props: Props) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={config.captcha as string}>
      {props.children}
    </GoogleReCaptchaProvider>
  );
};

export default AppCaptcha;
