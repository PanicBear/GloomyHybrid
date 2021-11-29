import React, { useEffect, useRef } from 'react';
import { NativeModules, PermissionsAndroid, Platform, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import WebViewContainrer from './components/WebViewContainter';

const BACKGROUND_COLOR = "#051248";
const App = () => {
  const webViewRef = useRef();
  useEffect(() => {
    PermissionsAndroid.requestMultiple(
      ['android.permission.CAMERA',
        'android.permission.READ_EXTERNAL_STORAGE',]
    ).then(console.log);
    NativeModules.WebViewSupportModule.initWebView();
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <WebViewContainrer style={styles.webview} webViewRef={webViewRef} />
      <StatusBar backgroundColor={BACKGROUND_COLOR} />
    </SafeAreaView>
  );
};
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  webview: {
    flex: 1,
  },
});

