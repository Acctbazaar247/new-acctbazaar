import { authKey } from "@/constants/storageKey";
import { IUser } from "@/types/common";
import { getFromLocalStorage } from "@/utils/local-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import state from "sweetalert/typings/modules/state";

type IState = {
  isLoading: boolean;
  isError: boolean;
  user: IUser | null;
  accessToken: string | null;
  error: string | null;
};

interface ICredential {
  email: string;
  password: string;
}

const initialState: IState = {
  isLoading: true,
  isError: false,
  error: null,
  user: null,
  accessToken: null,
};

type ICreateUser = {
  paymentWithPaystack?: boolean;
} & Omit<IUser, "id" | "profileImg">;

export const createUser = createAsyncThunk(
  "user/createUser",
  async (info: ICreateUser) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      }
    );

    const data = await res.json();
    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (info: ICredential) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      }
    );
    const data = await res.json();
    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message);
    }
  }
);
export const loginUserWithToken = createAsyncThunk(
  "user/loginUserWithToken",
  async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: getFromLocalStorage(authKey) || "",
      },
    });
    const data = await res.json();
    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message);
    }
  }
);
export const verifyUserWithToken = createAsyncThunk(
  "user/verifyUserWithToken",
  async (token: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/verify-signup-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: getFromLocalStorage(authKey) || "",
        },
        body: JSON.stringify({ token: parseInt(token) }),
      }
    );
    const data = await res.json();
    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message);
    }
  }
);
export const resendEmail = createAsyncThunk(
  "user/resendEmail",
  async (email: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/resend/${email}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: getFromLocalStorage(authKey) || "",
        },
      }
    );
    const data = await res.json();
    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.isError = action.payload.isError;
      state.error = action.payload.error;
    },
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      if (!action.payload.user?.profileImg) {
        state.user = {
          ...action.payload.user,
          profileImg: "/assets/demo-user.png",
        };
      } else {
        state.user = action.payload.user;
      }
      // Storing user information in localStorage
      localStorage.setItem("accessToken", action.payload.accessToken);
    },
    userLoggedOut: (state) => {
      state.accessToken = null;
      state.user = null;
      state.error = null;
      state.isError = false;
      state.isLoading = false;
      // Clear user information from localStorage
      localStorage.removeItem("accessToken");
    },
    addWithdrawalPin: (state) => {
      if (state.user) {
        state.user.withdrawalPin = "it random pin";
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isLoading = false;

        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message!;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isLoading = false;

        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
        state.isError = true;
        state.error = action.error.message!;
      })
      .addCase(loginUserWithToken.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(loginUserWithToken.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isLoading = false;
        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(loginUserWithToken.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
      })
      .addCase(verifyUserWithToken.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(verifyUserWithToken.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isLoading = false;
        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(verifyUserWithToken.rejected, (state, action) => {
        state.user = null;
        state.isLoading = false;
      });
  },
});

export const {
  userLoggedIn,
  userLoggedOut,
  setLoading,
  setError,
  addWithdrawalPin,
} = authSlice.actions;
export default authSlice.reducer;
