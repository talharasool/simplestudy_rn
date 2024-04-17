import React, { useEffect, useRef } from 'react';
import { Alert, Platform, ScrollView } from 'react-native';
import RNWebView, { WebView, WebViewMessageEvent } from 'react-native-webview';
import { initConnection, requestPurchase, useIAP } from 'react-native-iap';


const WebViewScreen: React.FC = () => {
  const webViewRef = useRef<RNWebView | null>(null);

  const availablePlansArray: Array<string> = ['advancedyearlyplan','ultimatemonthlyplan','basicyearlyplan','ultimatemonthlyplan','advancedmonthlyplan','basicmonthlyplan'];

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
      const purchase = await requestPurchase({ sku: customer.productId });
      console.log(purchase)
      
    } catch (error) {
      console.log('Purchase error:', error);
      Alert.alert('Purchase Error', 'There was an error processing your purchase.');
    }
  };


  const handleWebViewMessageForSubscriptions = (event: WebViewMessageEvent) => {
    try {
      const { data } = event.nativeEvent;
      const customerData: CustomerData = JSON.parse(data);
      console.log(customerData)

      handlePurchase(customerData)

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