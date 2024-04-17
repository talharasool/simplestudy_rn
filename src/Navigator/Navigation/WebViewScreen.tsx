import React, { useEffect, useRef } from 'react';
import { Alert, Platform, ScrollView } from 'react-native';
import RNWebView, { WebView, WebViewMessageEvent } from 'react-native-webview';
import { initConnection, requestPurchase, useIAP } from 'react-native-iap';
import { useDispatch } from 'react-redux';
import { sendReceiptToServer } from '../../../redux/reducers/webViewReducers';


const WebViewScreen: React.FC = () => {
  const webViewRef = useRef<RNWebView | null>(null);

  const availablePlansArray: Array<string> = ['advancedyearlyplan','ultimateyearlyplan','basicyearlyplan','ultimatemonthlyplan','advancedmonthlyplan','basicmonthlyplan'];

  const {
    connected,
    products,
    promotedProductsIOS,
    subscriptions,
    purchaseHistory,
    availablePurchases,
    currentPurchase,
    currentPurchaseError,
    initConnectionError,
    finishTransaction,
    getProducts,
    getSubscriptions,
    getAvailablePurchases,
    getPurchaseHistory,
  } = useIAP();


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


  const handlePurchase = async (customer : CustomerData) => {
    try {
      // Request purchase for the consumable item
      const purchase: any = await requestPurchase({ sku: customer.productId});
      // console.log(purchase)

      if (purchase){
        // const response = await dispatch(sendReceiptToServer(customer));
        const transtionID  = purchase.transactionId;
        const userId  = customer.customerId;
        const receipt = JSON.stringify(purchase);
      
        const params = {
          'receipt-data': receipt,
          'user-id': userId,
          'transaction-id': transtionID,
        };
        
        // const jsonString = JSON.stringify(params);
        // console.log('Json String',jsonString)

        return params;

       
      }
    } catch (error) {
      console.log('Purchase error:', error);
     // Alert.alert('Purchase Error', 'There was an error processing your purchase.');
    }
  };


  const handleWebViewMessageForSubscriptions = async (event: WebViewMessageEvent) => {
    try {
      const { data } = event.nativeEvent;
      const customerData: CustomerData = JSON.parse(data);
      console.log(customerData)

      const apiParams = await handlePurchase(customerData)
      const response = await dispatch(sendReceiptToServer(apiParams));

      if (response && response.success) {
        // The response is successful
        console.log('Response is successful:', response);
      } else {
        // Handle the case where the response is not successful
        console.log('Response is not successful:', response);
      }

      // console.log("Api Params:", apiParams)


    } catch (error) {
      console.error('Error parsing message:', error);
    }
  }

  //MARK: Original Link For Stagging ->   source={{uri: 'https://simplestudy.cloud/'}}

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
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
    </ScrollView>
  );
};

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