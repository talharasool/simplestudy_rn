interface CustomerData {
    customerId: string;
    productId: string;
    type: string;
  }

  interface ParamsData {
    customerId: string;
    productId: string;
    type: string;
  }


  interface PurchaseData {
    appAccountToken: string;
    originalTransactionDateIOS: number;
    originalTransactionIdentifierIOS: number;
    productId: string;
    purchaseToken: string;
    quantityIOS: number;
    transactionDate: number;
    transactionId: string;
    transactionReasonIOS: string;
    transactionReceipt: string;
    verificationResultIOS: string;
  }