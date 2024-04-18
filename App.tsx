
import { setup } from 'react-native-iap';
import { Provider } from 'react-redux';
import store from './redux/store';
import { useEffect } from 'react';
import { notificationListener, requestUserPermission } from './src/utils/PushNotificationManager';
import WebViewScreen from './src/Navigator/Navigation/WebViewScreen';

setup({storekitMode: 'STOREKIT1_MODE'});
const App = () => {
  //below what you need to add

  useEffect(() => {
    requestUserPermission()
    notificationListener()
  }, []);


  return (
    <Provider store={store}>
      <WebViewScreen></WebViewScreen>
    </Provider>
  );
};
export default App;





// import React from 'react';
// import AppNavigator from './src/Navigator/AppNavigator'; // Import your AppNavigator

// const App = () => {



//   return <AppNavigator />;
// };



// export default App;

// import React, {useRef, useState} from 'react';
// import {View, Button, Platform, ScrollView, Text, Image} from 'react-native';
// import {launchCamera} from 'react-native-image-picker';
// import DocumentPicker from 'react-native-document-picker';
// import RNFS from 'react-native-fs';
// import RNWebView from 'react-native-webview';
// import {WebViewMessageEvent} from './node_modules/react-native-webview/index';
// import {Alert} from './node_modules/react-native/types/index';
// import Share from 'react-native-share';

// const App = () => {
//   const webViewRef = useRef<RNWebView | null>(null);
//   const [refresherEnabled, setEnableRefresher] = useState(true);
//   const [initialUrl, setInitialUrl] = useState('');
//   const [currentUrl, setCurrentUrl] = useState('');
//   const [fileType, setFileType] = useState('');
//   const [fileUri, setFileUri] = useState('');

//   const handleCameraLaunch = async (isCamera: boolean) => {
//     const options = {
//       mediaType: isCamera ? 'photo' : 'video',
//     };

//     try {
//       const response = await launchCamera(options);
//       setFileUri(response.uri);
//       setFileType(isCamera ? 'image' : 'video');
//       console.log('pickedFile', response);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const uploadFileOnPressHandler = async () => {
//     try {
//       const pickedFile = await DocumentPicker.pickSingle({
//         type: [
//           DocumentPicker.types.images,
//           DocumentPicker.types.video,
//           DocumentPicker.types.pdf,
//         ],
//       });

//       setFileUri(pickedFile.uri);
//       const fileType = pickedFile.type.split('/')[0];
//       setFileType(fileType);
//     } catch (err) {
//       if (DocumentPicker.isCancel(err)) {
//         console.log(err);
//       } else {
//         console.error('Error:', err);
//       }
//     }
//   };
//   // const uploadFileOnPressHandler = async () => {
//   //   try {
//   //     const pickedFile = await DocumentPicker.pickSingle({
//   //       type: [DocumentPicker.types.allFiles],
//   //     });
//   //     console.log('pickedFile', pickedFile);

//   //     await RNFS.readFile(pickedFile.uri, 'base64').then(data => {
//   //       console.log('base64', data);
//   //     });
//   //   } catch (err) {
//   //     if (DocumentPicker.isCancel(err)) {
//   //       console.log(err);
//   //     } else {
//   //       console.log(error);
//   //       throw err;
//   //     }
//   //   }
//   // };

//   let isNavigatingBackToInitialUrl = false;
//   const desiredUrl = 'https://simplestudy.cloud/account/my_space';
//   const onNavigationStateChange = navState => {
//     setEnableRefresher(navState.url === initialUrl);
//     setCurrentUrl(navState.url);

//     if (!isNavigatingBackToInitialUrl && navState.url === initialUrl) {
//       isNavigatingBackToInitialUrl = true;
//       webViewRef.current.goBack();
//       webViewRef.current.injectJavaScript(
//         `window.location.href = '${initialUrl}';`,
//       );
//       return;
//     }

//     if (navState.url === desiredUrl) {
//       console.log('Desired URL reached. Stopping the loop.');
//       isNavigatingBackToInitialUrl = false;
//       return;
//     }

//     // console.log('Navigation State Change:', navState);
//   };
//   const handleWebViewMessage = (event: WebViewMessageEvent) => {
//     const message = event.nativeEvent.data;
//     try {
//       const {url, description} = JSON.parse(message);
//       // Handle the received data (url, description) here
//       Alert.alert('Received URL', url);
//       Alert.alert('Received Description', description);
//     } catch (error) {
//       console.error('Error parsing message:', error);
//     }
//   };
//   const renderFileViewer = () => {
//     switch (fileType) {
//       case 'image':
//         return (
//           <Image source={{uri: fileUri}} style={{width: 300, height: 300}} />
//         );
//       case 'video':
//         return (
//           <Video source={{uri: fileUri}} style={{width: 300, height: 300}} />
//         );
//       case 'application':
//         return (
//           <PDFView
//             fadeInDuration={250.0}
//             style={{flex: 1}}
//             resource={fileUri}
//             resourceType="uri"
//           />
//         );
//       default:
//         return <Text>No file selected</Text>;
//     }
//   };
//   return (
//     // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//     //   <ScrollView contentContainerStyle={{flexGrow: 1}}>
//     //     <Button title="Take Photo" onPress={() => handleCameraLaunch(true)} />
//     //     <Button
//     //       title="Record Video"
//     //       onPress={() => handleCameraLaunch(false)}
//     //     />
//     //     <Button title="Pick File" onPress={uploadFileOnPressHandler} />
//     //     <View style={{marginTop: 20}}>{renderFileViewer()}</View>
//     //   </ScrollView>
//     // </View>
//     // <View style={{flex: 1}}>
//     //   <Button
//     //     title="Camera"
//     //     onPress={async () => {
//     //       handleCameraLaunch(true);
//     //     }}
//     //   />
//     //   <Button
//     //     title="Video"
//     //     onPress={async () => {
//     //       handleCameraLaunch(false);
//     //     }}
//     //   />
//     //   <Button
//     //     title="Gallary"
//     //     onPress={async () => {
//     //       uploadFileOnPressHandler();
//     //     }}
//     //   />
//     // </View>

//     <ScrollView style={{}} contentContainerStyle={{flex: 1}}>
//       <RNWebView
//         source={{uri: 'https://simplestudy.cloud/'}}
//         scalesPageToFit={false}
//         setBuiltInZoomControls={false}
//         setDisplayZoomControls={false}
//         allowsZoom={false} // Disable zooming on iOS
//         onNavigationStateChange={onNavigationStateChange}
//         automaticallyAdjustContentInsets={false}
//         // onLoad={onWebViewLoad}
//         onLoadStart={syntheticEvent => {
//           // console.log(`Blocked navigation to: ${syntheticEvent}`);
//           const {nativeEvent} = syntheticEvent;
//           console.log(`Blocked navigation to: ${nativeEvent.url}`);

//           if (
//             nativeEvent.url === 'https://simplestudy.cloud/account/referral'
//           ) {
//             const url =
//               'https://simplestudy.ie/signup?referral_code=DszCPZIUrb';
//             const description =
//               'Signup to try SimpleStudy for your Exams! - Access Essays, Notes, Quizzes, and Exam Papers all for free! ' +
//               url;

//             const shareOptions = {
//               title: 'SimpleStudy',
//               message: description,
//               url: url,
//             };

//             // Share.open(shareOptions)
//             //   .then(res => {
//             //     console.log(res);
//             //   })
//             //   .catch(err => {
//             //     err && console.log(err);
//             //   });
//           }

//           // if (!canNavigate) {
//           //   const { nativeEvent } = syntheticEvent;
//           //   console.log(`Blocked navigation to: ${nativeEvent.url}`);
//           // }
//         }}
//         // onScroll={handleScroll}
//         // onLoadEnd={onWebViewLoadEnd}
//         // onError={onWebViewLoadError}
//         // onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
//         ref={webViewRef}
//         onMessage={handleWebViewMessage}
//         injectedJavaScript={`
//         const url = 'https://simplestudy.ie/signup?referral_code=DszCPZIUrb';
//         const description = 'Signup to try SimpleStudy for your Exams! - Access Essays, Notes, Quizzes, and Exam Papers all for free! ' + url;
//         window.postMessage(JSON.stringify({ url, description }));
//       `}
//         pullToRefreshEnabled={true}
//         // renderLoading={CustomLoadingIndicator1}
//         style={Platform.OS === 'ios' ? {marginTop: 50} : {}}
//         allowsBackForwardNavigationGestures={true}
//       />
//     </ScrollView>
//   );
// };

// export default App;
