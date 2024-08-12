import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserApi } from 'apis/userApi';
import { Quiz } from 'models/quiz';
import { User } from 'models/user';

interface IQuizState {
  currentQuiz?: Quiz;
}

const initialState: IQuizState = {};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setCurrentQuiz(state, action: PayloadAction<Quiz | undefined>) {
      state.currentQuiz = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export const { setCurrentQuiz } = quizSlice.actions;
export default quizSlice.reducer;
