import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'models/user';

interface IUserState {
  currentUser: User | undefined;
}

const initialState: IUserState = {
  currentUser: undefined,
};

export const login = createAsyncThunk(
  'user/login',
  async ({ username, password }: { username: string; password: string }) => {},
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser(state, action: PayloadAction<User | undefined>) {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {})
      .addCase(login.fulfilled, (state) => {})
      .addCase(login.rejected, (state) => {});
  },
});

export const { setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
