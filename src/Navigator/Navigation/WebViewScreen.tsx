import React, { useEffect, useRef, useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, View } from 'react-native';
import RNWebView, { WebView, WebViewMessageEvent } from 'react-native-webview';
import { IapAndroid, IapIos, getAvailablePurchases, getProducts, getReceiptIOS, initConnection, requestPurchase, useIAP } from 'react-native-iap';
import { useDispatch } from 'react-redux';
import { sendReceiptToServer } from '../../../redux/reducers/webViewReducers';
import { encode } from 'base-64';
import messaging from '@react-native-firebase/messaging';
import FullScreenActivityIndicator from '../../utils/FullScreenActivityIndicator';
import { encode as btoa } from 'base-64';
import RNFetchBlob from 'rn-fetch-blob';
import { TextEncoder } from 'text-encoding'

import { Buffer } from "buffer";
const WebViewScreen: React.FC = () => {
  const webViewRef = useRef<RNWebView | null>(null);

  const availablePlansArray: Array<string> = ['advancedyearlyplan', 'ultimateyearlyplan', 'basicyearlyplan', 'ultimatemonthlyplan', 'advancedmonthlyplan', 'basicmonthlyplan'];
  const {
    connected,
    subscriptions, //returns subscriptions for this app.
    getSubscriptions, //Gets available subsctiptions for this app.
    currentPurchase, //current purchase for the tranasction
    finishTransaction,
    purchaseHistory, //return the purchase history of the user on the device (sandbox user in dev)
    getPurchaseHistory, //gets users purchase history
  } = useIAP();


  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    initializeConnection();

  }, []);


  const initializeConnection = async () => {
    try {
      const result = await initConnection()
      console.log('connection is => ', result);
      //MARK: If you will not fetch it before purchase. In-App Purchase will not work properly.
      if (result) {
        const fetchProductList = await getProducts({ skus: availablePlansArray });
      }
    } catch (err) {
      console.log('error in cdm => ', err);
    }
  };

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }


  const handlePurchase = async (customer: CustomerData) => {
    try {
      // Request purchase for the consumable item
      const purchase: any = await requestPurchase({ sku: customer.productId });

      await finishTransaction({purchase: purchase, isConsumable: true});
      
      const receipt = currentPurchase;
      // console.log(receipt)

      // console.log(receipt?.transactionReceipt)
      const res: any = await IapIos.getReceiptIOS({ forceRefresh: false});

      console.log('getReceiptIOS',res)
      // console.log(purchase)
      if (purchase) {
        const transtionID = purchase.transactionId;
        const userId = customer.customerId;
        const jsonData = JSON.stringify(purchase);
        //  const receipt = encode(jsonData);
        //New 

        const params = {
          'receipt-data': res,
          'user-id': userId,
          'transaction-id': transtionID,
        }
         console.log(params)  
        return params;
      }
    } catch (error) {
      setIsLoading(false)
      console.log(error);
      const errorMessage = (error as Error).toString(); // Type assertion
      console.log('Purchase error:', errorMessage);
      if ((errorMessage) !== 'Error: User cancelled the purchase') {
        Alert.alert('Purchase Error', 'There was an error processing your purchase.');
      }

    }
  };


  const handleWebViewMessageForSubscriptions = async (event: WebViewMessageEvent) => {
    try {
      setIsLoading(true)
      const { data } = event.nativeEvent;
      const customerData: CustomerData = JSON.parse(data);
      const apiParams = await handlePurchase(customerData)

      if (apiParams) {
        const response = await dispatch(sendReceiptToServer(apiParams));
        if (response && response.success) {
          // The response is successful
          console.log('Response is successful:', response);
        } else {
          // Handle the case where the response is not successful
          console.log('Response is not successful:', response.payload);
          setIsLoading(false);
        }
      }





    } catch (error) {

      setIsLoading(false)
      console.error('Error parsing message:', error);
    }
  }

  //MARK: Original Link For Stagging ->   source={{uri: 'https://simplestudy.cloud/'}}

  return (
    <View style={{ flex: 1 }}>
      <View style={StyleSheet.absoluteFill}>
        <RNWebView
          source={{ uri: 'https://simplestudy.cloud/subscription' }}

          scalesPageToFit={false}
          javaScriptEnabledAndroid={true}
          setBuiltInZoomControls={false}
          setDisplayZoomControls={false}
          allowsZoom={false}
          automaticallyAdjustContentInsets={false}
          ref={webViewRef}
          onMessage={handleWebViewMessageForSubscriptions}
          pullToRefreshEnabled={true}
          style={Platform.OS === 'ios' ? { marginTop: 50 } : {}}
          allowsBackForwardNavigationGestures
          userAgent="iPhone PWA"
        />
      </View>
      {isLoading && <FullScreenActivityIndicator />}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default WebViewScreen;


//MARK: Extra Code For Inttial Integration Tests
//MARK: Will be removed for next major release
// import Share from 'react-native-share';
// import { View, TouchableOpacity, Text } from 'react-native';

// const handleWebViewMessage = (event: WebViewMessageEvent) => {
//   try {
//     const { data } = event.nativeEvent;
//     const { url } = JSON.parse(data);

//     console.log('Received URL:', url);

//     if (url === 'https://simplestudy.cloud/signup?referral_code=CqqBrTsto4') {
//       const shareOptions = {
//         title: 'SimpleStudy',
//         message:
//           'Signup to try SimpleStudy for your Exams! - Access Essays, Notes, Quizzes, and Exam Papers all for free!',
//         url,
//       };

//       Share.open(shareOptions)
//         .then((res: boolean) => console.log('Share success:', res))
//         .catch(() => {
//           console.log('User Didnt Share');
//         });
//     }
//   } catch (error) {
//     console.error('Error parsing message:', error);
//   }
// };