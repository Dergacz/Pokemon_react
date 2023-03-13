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
      console.log(action.payload);
      state.appAgent = action.payload;
    },
  },
});

export const {

} = appAgentSlice.actions;

export default appAgentSlice.reducer;
