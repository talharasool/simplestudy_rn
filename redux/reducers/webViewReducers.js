import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from "../../src/axiosapi";
import { APIURL } from "../../src/utils/apiUrl";
import axios from 'axios';
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
    const response = await http.post(APIURL.verifyPurchase, params);
    if (response.data === undefined) {
      return thunkAPI.rejectWithValue(response.data);
    }
     console.log("Mine",response.data )
    return response.data;
  },
);


export const verifySandboxPurchase = createAsyncThunk(
  'payment/verifySandboxPurchase',
  async (params, thunkAPI) => {
    const dataParams = JSON.stringify({params});
    //  console.log("Send", params)
    console.log('verifySandboxPurchase')
     const response = await axios.post('https://sandbox.itunes.apple.com/verifyReceipt', params);

  //   const response = axios.post('https://sandbox.itunes.apple.com/verifyReceipt', params)
  // .then(response => {
  //   // Handle successful response
  //   console.log('Response:', response.data);
  // })
  // .catch(error => {
  //   // Handle error
  //   console.error('Error:', error);
  // });

    console.log("\n\n")
    console.log("My response", response.data)
    console.log("\n\n")
    if (response.data === undefined) {
      return thunkAPI.rejectWithValue(response.data);
    }
    return response.data;
  },
);


export default webViewSlice.reducer;
