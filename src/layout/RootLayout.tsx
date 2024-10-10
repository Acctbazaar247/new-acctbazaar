import { authKey } from "@/constants/storageKey";
import {
  loginUserWithToken,
  setLoading,
} from "@/redux/features/auth/authSlice";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import React, { useEffect } from "react";
import { ConfigProvider, Spin } from "antd";
import { ToastContainer } from "react-toastify";

type Props = { children: React.ReactNode };

const RootLayout: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.user.theme);
  const isLoading = useAppSelector((state) => state.user.isLoading);

  const lightTheme = {
    colorBgBase: "#fff",
  };

  const darkTheme = {
    colorBgBase: "#181C14",
    colorText: "#fff",
    // controlItemBgHover: "#fff",
  };

  useEffect(() => {
    const token = getFromLocalStorage(authKey);
    if (token?.length && token !== "undefined") {
      // lsdafds

      dispatch(loginUserWithToken());
      //
    } else {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return (
    <ConfigProvider
      theme={{
        token: theme === "light" ? lightTheme : darkTheme,
        components: {
          Table: {
            headerBg: theme === "light" ? "#fff" : "#181C14",
          },
          Select: {
            optionSelectedColor: theme === "light" ? "#181C14" : "#181C14",
            colorTextPlaceholder: "#999",
            colorBorder: theme === "light" ? "#D5D8DB" : "#374151",
          },
          Checkbox: {
            colorBgContainer: theme === "light" ? "#fff" : "#fff", // Background color
            // colorPrimary: theme === "light" ? "#fff" : "#fff", // Checkmark color
            colorBorder: "#878787", // Border color
            // colorPrimaryHover: "#878787"
            colorInfoBorderHover: "red",
          },
          Button: {
            colorText: theme === "light" ? "#181C14" : "#fff",
            colorBorder: theme === "light" ? "#181C14" : "#fff",
            // colorPrimaryHover: "#878787",
            // colorPrimary: "#878787",
            // colorInfoBorderHover: "red",
            // colorTextDisabled: "#999",
            // colorBorderDisabled: "#878787",
            // colorPrimaryDisabled: "#878787",
            // colorTextHoverDisabled: "#999",
            // colorBorderHoverDisabled: "#878787",
            // colorPrimaryHoverDisabled: "#8787
          },
          Pagination: {
            colorIcon: theme === "light" ? "#181C14" : "#fff",
            colorText: theme === "light" ? "#181C14" : "#fff",
          },
        },
      }}
    >
      {children}
      {/* {isLoading ? <Spin fullscreen={true}></Spin> : null} */}
      <ToastContainer
        position="bottom-left"
        hideProgressBar={true}
        autoClose={3500}
        // theme={theme}
        limit={1}
        toastStyle={{ background: "#000" }}
        pauseOnFocusLoss={false}
      ></ToastContainer>
    </ConfigProvider>
  );
};
export default RootLayout;
