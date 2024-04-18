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

  },

});

export const sendReceiptToServer = createAsyncThunk(
  'payment/sendReceiptToServer',
  async (params, thunkAPI) => {
    const dataParams = JSON.stringify({params});
    // console.log("Send", params)
    const response = await http.post('https://simplestudy.cloud/pwa_api/verify_apple_purchase', dataParams);
    if (response.data.success === false) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response.data;
  },
);

export default webViewSlice.reducer;
