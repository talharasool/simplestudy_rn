import { IapIos, initConnection, requestPurchase, useIAP } from 'react-native-iap';
import { encode } from 'base-64';
import messaging from '@react-native-firebase/messaging';



export async function initializeConnection(availablePlansArray: string[]) {
  try {
    const result = await initConnection();
    console.log('connection is => ', result);
    if (result) {
      const fetchProductList = await useIAP().getProducts({ skus: availablePlansArray });
     
    }
  } catch (err) {
    console.log('error in cdm => ', err);
  }
}

export async function handlePurchase(customer: CustomerData) {
  try {
    const purchase: any = await requestPurchase({ sku: customer.productId });
    if (purchase) {
      const transtionID = purchase.transactionId;
      const userId = customer.customerId;
      const jsonData = JSON.stringify(purchase);
      const receipt = encode(jsonData);
      const params = {
        'receipt-data': receipt,
        'user-id': userId,
        'transaction-id': transtionID,
      };
      return params;
    }
  } catch (error) {
    console.log(error);
    const errorMessage = (error as Error).toString(); // Type assertion
    console.log('Purchase error:', errorMessage);
    throw new Error(errorMessage);
  }
}

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}
