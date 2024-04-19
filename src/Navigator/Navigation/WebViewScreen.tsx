import React, { useEffect, useRef, useState } from 'react';
import { Alert, Platform, ScrollView, StyleSheet, View } from 'react-native';
import RNWebView, {  WebView, WebViewMessageEvent } from 'react-native-webview';
import { getProducts, getReceiptIOS, initConnection, requestPurchase, useIAP, purchaseUpdatedListener, validateReceiptIos } from 'react-native-iap';
import { useDispatch } from 'react-redux';
import { sendReceiptToServer } from '../../../redux/reducers/webViewReducers';
import FullScreenActivityIndicator from '../../utils/FullScreenActivityIndicator';
import { APIURL } from '../../utils/apiUrl';

const WebViewScreen: React.FC = () => {
  const webViewRef = useRef<RNWebView | null>(null);

  const availablePlansArray: Array<string> = ['advancedyearlyplan', 'ultimateyearlyplan', 'basicyearlyplan', 'ultimatemonthlyplan', 'advancedmonthlyplan', 'basicmonthlyplan'];
  const {
    finishTransaction,
  } = useIAP();

  const [isLoading, setIsLoading] = useState(false);
  const [key, setKey] = useState(1);
  const [webURL, setWebURL] = useState('https://simplestudy.cloud/subscription');
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


  const processPurchaseAsync = async (purchase: any, userId: string): Promise<{ [key: string]: string }> => {
    return new Promise((resolve) => {
      const subscription = purchaseUpdatedListener((purchase) => {
        // console.log("Mine", purchase);
        // console.log("\n\n");
        const params : any = {
          'receipt-data': purchase.transactionReceipt,
          'user-id': userId,
          'transaction-id': purchase.transactionId,
        };
        resolve(params); // Resolve the Promise with params
      });
    });
  };


  const handlePurchase = async (customer: CustomerData) => {
    try {
      // Request purchase for the consumable item
      const purchase: any = await requestPurchase({ sku: customer.productId });
      const userId = customer.customerId;
      const params = await processPurchaseAsync(purchase, userId);
    //   const receiptBody =  await getReceiptIOS(purchase);
    //   const paramsBody : string = params["receipt-data"]
    //   console.log('Comparison')
    //   console.log(receiptBody === paramsBody)
    //   const receiptParamm = {
    //     'receipt-data': paramsBody,
    //     'password': '8eec399ad6284824bddb1a561284d402'
    //   };
    //  const validation = await validateReceiptIos({receiptBody : receiptParamm , isTest : true});
    //  console.log('validation',validation)
      // console.log(params["receipt-data"])

      await finishTransaction({purchase: purchase, isConsumable: false});
      // console.log("Return Params", params)
      return params
    } catch (error) {
      setIsLoading(false)
      console.log(error);
      const errorMessage = (error as Error).toString(); // Type assertion
      console.log('Purchase error:', errorMessage);
      if ((errorMessage) !== 'Error: User cancelled the purchase') {
        Alert.alert('Purchase Error',  `${errorMessage}`);
      }

    }
  };


  const handleApiResponse = async (apiParams: any) => {
    if (apiParams) {
      const response = await dispatch(sendReceiptToServer(apiParams));
      if (response.payload.success === true) {
        // The response is successful
        setIsLoading(false);
        // Alert.alert('Purchase Successful', 'Congratulations you have successfully purchased your plan');
        Alert.alert(
          'Purchase Successful',
          'Congratulations you have successfully purchased your plan',
          [
            {
              text: 'OK',
              onPress: () => {
                setTimeout(() => {
                  setWebURL('https://simplestudy.cloud/account/my_space');
                  console.log("On Press", webURL);
                  setKey((prevKey) => prevKey + 1);
                  // webViewRef.current?.reload()
                }, 500); // Delay reloading to ensure webURL is updated
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        // Handle the case where the response is not successful
        console.log('Response is not successful:', response.payload);
        setIsLoading(false);
        Alert.alert('Purchase Error', 'There was an error processing your purchase.');
      }
    }
  };
  
  // Call handleApiResponse wherever you need to handle the API response
 
  

  const _onNavigationStateChange = async (event: WebViewMessageEvent) => {
    console.log(event)
  }
  const handleWebViewMessageForSubscriptions = async (event: WebViewMessageEvent) => {
    try {
      setIsLoading(true)
      const { data } = event.nativeEvent;
      const customerData: CustomerData = JSON.parse(data);
      const apiParams = await handlePurchase(customerData)
      handleApiResponse(apiParams);
    } catch (error) {
      setIsLoading(false)
      console.error('Error parsing message:', error);
    }
  }

  //MARK: Original Link For Stagging ->   source={{uri: 'https://simplestudy.cloud/'}}

  return (
    <View style={{ flex: 1 , backgroundColor : '#FFFFFF'}}>
      <View style={StyleSheet.absoluteFill}>
        <WebView
          source={{ uri: webURL }}
          key={key}
          scalesPageToFit={false}
          javaScriptEnabledAndroid={true}
          setBuiltInZoomControls={false}
          setDisplayZoomControls={false}
          allowsZoom={false}
          automaticallyAdjustContentInsets={false}
          // ref={webViewRef}
          originWhitelist={["*"]}
          cacheEnabled={false}
          onNavigationStateChange={_onNavigationStateChange}
          onMessage={handleWebViewMessageForSubscriptions}
          pullToRefreshEnabled={true}
          style={Platform.OS === 'ios' ? { marginTop: 50 } : {}}
          // allowsBackForwardNavigationGestures
          userAgent="iPhone PWA"
        />
      </View>
      {isLoading && <FullScreenActivityIndicator />}
    </View>
  );
};


export default WebViewScreen;

