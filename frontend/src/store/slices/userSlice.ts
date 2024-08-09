import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserApi } from 'apis/userApi';
import { User } from 'models/user';

interface IUserState {
  currentUser?: User;
  accessToken?: string;
}

const initialState: IUserState = {};

export const login = createAsyncThunk(
  'user/login',
  async ({ username, password }: { username: string; password: string }) => {
    return (await UserApi.login(username, password)).data;
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<User | undefined>) {
      state.currentUser = action.payload;
    },
    logout(state) {
      state.currentUser = undefined;
      state.accessToken = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      const { token, user } = action.payload;
      state.currentUser = user;
      state.accessToken = token;
    });
  },
});

export const { setCurrentUser, logout } = userSlice.actions;
export default userSlice.reducer;
