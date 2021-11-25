import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useRef } from 'react';
import { NativeModules, SafeAreaView, StyleSheet } from 'react-native';
import WebViewContainrer from './components/WebViewContainter';

const BACKGROUND_COLOR = "#051248";
const App = () => {
  const webViewRef = useRef();
  useEffect(() => {
    NativeModules.WebViewSupportModule.initWebView();
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <WebViewContainrer style={styles.webview} webViewRef={webViewRef} />
      <StatusBar style={'light'} backgroundColor={BACKGROUND_COLOR} />
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

