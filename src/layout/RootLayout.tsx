import { authKey } from "@/constants/storageKey";
import {
  loginUserWithToken,
  setLoading,
} from "@/redux/features/auth/authSlice";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";
import React, { useEffect } from "react";
import { Spin } from "antd";

type Props = { children: React.ReactNode };

const RootLayout: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.user.isLoading);

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
    <div>
      {children}
      {/* {isLoading ? <Spin fullscreen={true}></Spin> : null} */}
    </div>
  );
};
export default RootLayout;
