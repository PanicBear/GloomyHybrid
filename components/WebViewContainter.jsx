import React from 'react';
import { NativeModules, Platform } from 'react-native';
import WebView from 'react-native-webview';

const WebViewContainrer = ({ webViewRef, handleEndLoading }) => {
  const uri = 'https://d1gbspr5q497yq.cloudfront.net/';
  return (
    <WebView
      ref={webViewRef}
      originWhitelist={['*']}
      source={{ uri }}
      mixedContentMode={'compatibility'} // webSettings.setMixedContentMode(WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE);
      onShouldStartLoadWithRequest={e => {
        if (e.url.startsWith('http://') || e.url.startsWith('https://') || e.url.startsWith('about:blank')) return true;
        if (Platform.OS === 'android') {
          NativeModules.WebViewSupportModule.parseIntentUri(e.url).then(res => { return res });
        }
        return false;
      }}
      startInLoadingState={true}
    />
  );
};
export default WebViewContainrer;