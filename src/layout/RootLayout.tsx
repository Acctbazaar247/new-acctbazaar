import FixedContactButton from "@/components/FixedContactButton/FixedContactButton";
import { authKey } from "@/constants/storageKey";
import {
  loginUserWithToken,
  setLoading
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getFromLocalStorage } from "@/utils/local-storage";
import { ConfigProvider } from "antd";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = { children: React.ReactNode };

const RootLayout: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.user.theme);

  const lightTheme = {
    colorBgBase: "#fff"
  };

  const darkTheme = {
    colorBgBase: "#181C14",
    colorText: "#fff"
  };

  useEffect(() => {
    const token = getFromLocalStorage(authKey);
    if (token?.length && token !== "undefined") {
      dispatch(loginUserWithToken());
    } else {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ConfigProvider
      theme={{
        token: theme === "light" ? lightTheme : darkTheme,
        components: {
          Table: {
            headerBg: theme === "light" ? "#fff" : "#181C14"
          },
          Select: {
            optionSelectedColor: theme === "light" ? "#181C14" : "#181C14",
            colorTextPlaceholder: theme === "light" ? "#181C14" : "#fff",
            colorBorder: theme === "light" ? "#D5D8DB" : "#374151"
          },
          Checkbox: {
            colorBgContainer: theme === "light" ? "#fff" : "#fff", // Background color
            // colorPrimary: theme === "light" ? "#fff" : "#fff", // Checkmark color
            colorBorder: "#878787", // Border color
            // colorPrimaryHover: "#878787"
            colorInfoBorderHover: "red"
          },
          Button: {
            colorText: theme === "light" ? "#181C14" : "#fff",
            colorBorder: theme === "light" ? "#181C14" : "#fff"
          },
          Pagination: {
            colorIcon: theme === "light" ? "#181C14" : "#fff",
            colorText: theme === "light" ? "#181C14" : "#fff"
          },
          DatePicker: {
            colorText: theme === "light" ? "#181C14" : "#fff",
            colorBorder: theme === "light" ? "#D5D8DB" : "#374151",
            colorTextPlaceholder: theme === "light" ? "#181C14" : "#fff"
          },
          Modal: {
            colorIcon: theme === "light" ? "#181C14" : "#fff"
          }
        }
      }}
    >
      {children}
      <ToastContainer
        position="bottom-left"
        hideProgressBar={true}
        autoClose={3500}
        limit={1}
        toastStyle={{ background: "#ff5a35" }}
        pauseOnFocusLoss={false}
      />
      <FixedContactButton></FixedContactButton>
    </ConfigProvider>
  );
};
export default RootLayout;
