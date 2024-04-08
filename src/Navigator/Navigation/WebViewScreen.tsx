import React, {useRef} from 'react';
import {Platform, ScrollView} from 'react-native';
import RNWebView, {WebViewMessageEvent} from 'react-native-webview';
import Share from 'react-native-share';

const WebViewScreen: React.FC = () => {
  const webViewRef = useRef<RNWebView | null>(null);

  const handleWebViewMessage = (event: WebViewMessageEvent) => {
    try {
      const {data} = event.nativeEvent;
      const {url} = JSON.parse(data);

      console.log('Received URL:', url);

      if (url === 'https://simplestudy.cloud/signup?referral_code=CqqBrTsto4') {
        const shareOptions = {
          title: 'SimpleStudy',
          message:
            'Signup to try SimpleStudy for your Exams! - Access Essays, Notes, Quizzes, and Exam Papers all for free!',
          url,
        };

        Share.open(shareOptions)
          .then((res: boolean) => console.log('Share success:', res))
          .catch(() => {
            console.log('User Didnt Share');
          });
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={{flex: 1}}>
      <RNWebView
        source={{uri: 'https://simplestudy.cloud/'}}
        scalesPageToFit={false}
        javaScriptEnabledAndroid={true}
        setBuiltInZoomControls={false}
        setDisplayZoomControls={false}
        allowsZoom={false}
        automaticallyAdjustContentInsets={false}
        ref={webViewRef}
        onMessage={handleWebViewMessage}
        pullToRefreshEnabled={true}
        style={Platform.OS === 'ios' ? {marginTop: 50} : {}}
        allowsBackForwardNavigationGestures
      />
    </ScrollView>
  );
};

export default WebViewScreen;
