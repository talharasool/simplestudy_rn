import { withIAPContext } from 'react-native-iap';
import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { setup } from 'react-native-iap';

import messaging from '@react-native-firebase/messaging';
messaging().setBackgroundMessageHandler(async remoteMessage => {
console.log("Message received");
});
setup({storekitMode: 'STOREKIT1_MODE'});

AppRegistry.registerComponent(appName, () => withIAPContext(App));



// import {AppRegistry} from 'react-native';

// // If a user wants to go to the navigator having bottom navigator, then use:
// // import App from './App';

// // If a user wants to use the WebView screen, then use:
// import App from './src/Navigator/Navigation/WebViewScreen';
// import {name as appName} from './app.json';
// import { withIAPContext } from 'react-native-iap';
// import {setup} from 'react-native-iap';
// import {Provider} from 'react-redux';
// import store from './redux/store';
// import { useEffect } from 'react';
// import { notificationListener, requestUserPermission } from './src/utils/PushNotificationManager';
// import messaging from '@react-native-firebase/messaging';



// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Remote Message', remoteMessage);
//   });
// setup({storekitMode: 'STOREKIT2_MODE'});
//   const myApp = () => {


// //below what you need to add



//     return (
//       <Provider store={store}>
//         <App/>
//       </Provider>
//     );
//   };



// AppRegistry.registerComponent(appName, () => withIAPContext(myApp));


