import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAppAgent {
  appAgent: string | null;
  error: string;
}

const initialState: IAppAgent = {
  appAgent: null,
  error: '',
};

export const appAgentSlice = createSlice({
  name: 'appAgent',
  initialState,
  reducers: {
    setAppAgentSuccess(state, action: PayloadAction<string>) {
      state.appAgent = action.payload;
      state.error = '';
    },
    setAppAgentError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export default appAgentSlice.reducer;
