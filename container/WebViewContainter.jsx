import React from 'react';
import { NativeModules, Platform } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import WebView from 'react-native-webview';

const URI = 'https://d1gbspr5q497yq.cloudfront.net/community/new';

const WebViewContainrer = ({ webViewRef, handleEndLoading }) => {
  return (
    <WebView
      ref={webViewRef}
      originWhitelist={['*']}
      source={{ uri: URI }}
      mixedContentMode={'compatibility'} // webSettings.setMixedContentMode(WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE);
      onMessage={({ nativeEvent: { data } }) => {
        parseMessage(data, webViewRef);
      }}
      onShouldStartLoadWithRequest={e => {
        if (e.url.startsWith('http://') || e.url.startsWith('https://') || e.url.startsWith('about:blank')) return true;
        if (Platform.OS === 'android') {
          NativeModules.WebViewSupportModule.parseIntentUri(e.url).then(res => { return res });
        }
        return false;
      }}
      startInLoadingState={true} // 어플리케이션 테스트 후 로드 지연 안될경우, false로
    />
  );
};
export default WebViewContainrer;

function parseMessage(data, webViewRef) {
  const action = JSON.parse(data).action;
  console.log(action);
  switch (action) {
    case "launchCamera":
      launchCamera().then((response) => { webViewRef.current.postMessage({ data: response.assets.base64 }) });
      break;
  }
}