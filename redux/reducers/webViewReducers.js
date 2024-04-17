import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from "../../src/axiosapi";
import { APIURL } from "../../src/utils/apiUrl";

const TOGGLE_WEBVIEW_SCREEN = 'TOGGLE_WEBVIEW_SCREEN';

const initialState = {
  isActive: false,
  loading: 'idle',
  error: null,
};

const webViewSlice = createSlice({
  name: 'webView',
  initialState,
  reducers: {
    login: (state, action) => {
      // Add your logic here if needed
    },
  },
  extraReducers: builder => {
    builder
      .addCase(sendReceiptToServer.pending, state => {
        state.loading = 'pending';
      })
      .addCase(sendReceiptToServer.fulfilled, (state, action) => {
        state.loading = 'idle';
        // Update state with response data if needed
      })
      .addCase(sendReceiptToServer.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.error.message;
      });
  },
});

export const sendReceiptToServer = createAsyncThunk(
  'payment/sendReceiptToServer',
  async (params, thunkAPI) => {
    const dataParams = JSON.stringify({params});
    console.log("Send", params)
    const response = await http.post('https://simplestudy.cloud/pwa_api/verify_apple_purchase', params);
    if (response.data.success === false) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response.data;
  },
);

export const { login } = webViewSlice.actions;

export default webViewSlice.reducer;
